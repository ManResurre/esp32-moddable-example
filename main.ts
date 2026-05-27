import Servo from "pins/servo";
import Digital from "pins/digital";
import Button from "button";
import Timer from "timer";
import Net from "net";
import {Server} from "http";
import {Request} from "http";
import Resource from "Resource";
import OTA from "ota";

trace("Starting...\n");

const SERVO_PIN = 25;
const LED_PIN = 2;

const led = new Digital({pin: LED_PIN, mode: Digital.Output});
const myservo = new Servo({pin: SERVO_PIN, min: 500, max: 2400});
led.write(1);
trace("Servo init OK\n");

let currentAngle = 90;
let targetAngle = 90;
const LERP_SPEED = 0.12;

myservo.write(currentAngle);
Timer.repeat(() => {
	if (currentAngle !== targetAngle) {
		currentAngle += (targetAngle - currentAngle) * LERP_SPEED;
		if (Math.abs(currentAngle - targetAngle) < 0.5)
			currentAngle = targetAngle;
		myservo.write(Math.round(currentAngle));
	}
}, 20);

const ip = Net.get("IP");
trace(`Connected! IP: ${ip}\n`);

const indexHTML = new Resource("esp.html");

const server = new Server({port: 80});
server.callback = function (this: any, message: number, value?: any, etc?: any): any {
	switch (message) {
	case Server.status:
		if ("GET" === etc && "/" === value)
			this.path = "index";
		else if ("POST" === etc && "/api/angle" === value) {
			this.path = "angle";
			this.request = String;
		}
		else if ("GET" === etc && "/api/status" === value)
			this.path = "status";
		else
			this.path = null;
		break;
	case Server.headersComplete:
		return "angle" === this.path ? String : false;
	case Server.requestComplete:
		if ("angle" === this.path && value) {
			try {
				const body = value as string;
				const match = body.match(/angle=(\d+)/);
				if (match) {
					targetAngle = Math.max(0, Math.min(180, parseInt(match[1])));
					trace(`Target: ${targetAngle}\n`);
				}
			}
			catch (e) {
				trace(`Angle parse error: ${e}\n`);
			}
		}
		break;
	case Server.prepareResponse:
		if ("index" === this.path)
			return {status: 200, headers: ["Content-Type", "text/html; charset=utf-8"], body: indexHTML};
		if ("angle" === this.path || "status" === this.path)
			return {status: 200, headers: ["Content-Type", "application/json"], body: JSON.stringify({angle: currentAngle}) + "\n"};
		return {status: 404, body: "Not Found\n"};
	}
};

trace("HTTP server on port 80\n");

const OTA_HOST = "192.168.160.189";
const OTA_PORT = 8000;
const OTA_PATH = "/xs_esp32.bin";

let updating = false;

new Button({pin: 0, onPush(pressed) {
	if (pressed && !updating) startOTA();
}});

function startOTA() {
	updating = true;
	trace(`OTA: downloading http://${OTA_HOST}:${OTA_PORT}${OTA_PATH}\n`);
	const request = new Request({host: OTA_HOST, port: OTA_PORT, path: OTA_PATH});
	request.callback = function (message, value, etc) {
		const self: any = this;
		switch (message) {
		case Request.status:
			if (200 !== value)
				throw new Error("unexpected http status");
			break;
		case Request.header:
			if ("content-length" === value) {
				try {
					self.byteLength = parseInt(etc);
					self.ota = new OTA({byteLength: self.byteLength});
					self.received = 0;
				}
				catch (e) {
					throw new Error("unable to start OTA: " + e);
				}
			}
			break;
		case Request.responseFragment: {
			const bytes = this.read(ArrayBuffer);
			self.received += bytes.byteLength;
			self.ota.write(bytes);
			trace(`OTA: ${self.received} / ${self.byteLength}\n`);
			} break;
		case Request.responseComplete:
			self.ota.complete();
			trace("OTA complete! Press RST button to reboot\n");
			updating = false;
			break;
		default:
			if (message < 0) {
				if (self.ota) self.ota.cancel();
				trace("OTA error\n");
				updating = false;
			}
			break;
		}
	};
}
