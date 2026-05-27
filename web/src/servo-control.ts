import { Accelerometer } from "./accelerometer";

export class ServoPanel extends HTMLElement {
	private sl!: HTMLInputElement;
	private ad!: HTMLElement;
	private aa!: HTMLElement;
	private ab!: HTMLElement;
	private ae!: HTMLElement;
	private al!: HTMLElement;
	private st!: HTMLElement;
	private ls!: HTMLElement;
	private cv!: HTMLCanvasElement;
	private cx!: CanvasRenderingContext2D;
	private accel!: Accelerometer;
	private an = 90;
	private ls2 = 0;

	connectedCallback(): void {
		this.sl = this.querySelector("#sl")!;
		this.ad = this.querySelector("#ad")!;
		this.aa = this.querySelector("#aa")!;
		this.ab = this.querySelector("#ab")!;
		this.ae = this.querySelector("#ae")!;
		this.al = this.querySelector("#al")!;
		this.st = this.querySelector("#st")!;
		this.ls = this.querySelector("#ls")!;
		this.cv = this.querySelector("#cv")!;
		this.cx = this.cv.getContext("2d")!;

		this.sl.addEventListener("input", () => this.setAngle(+this.sl.value));
		this.aa.addEventListener("click", () => this.toggleAccel());

		this.accel = new Accelerometer(
			(a) => this.setAngle(a),
			(msg) => this.showError(msg),
			(on) => this.setAccelStatus(on),
		);

		this.draw();
		setInterval(() => this.sendAngle(), 50);
	}

	private setAngle(a: number): void {
		this.an = Math.round(Math.max(0, Math.min(180, a)));
		this.sl.value = String(this.an);
		this.ad.innerHTML = `${this.an}<span>&deg;</span>`;
		this.draw();
	}

	private toggleAccel(): void {
		if (this.aa.classList.contains("on"))
			this.accel.disable();
		else
			this.accel.enable();
	}

	private showError(msg: string): void {
		this.ae.textContent = msg;
		this.ae.classList.toggle("s", msg.length > 0);
		const isOn = this.aa.classList.contains("on");
		this.ab.textContent = msg ? "ERR" : (isOn ? "ON" : "OFF");
		this.ab.className = "bd " + (msg ? "r" : (isOn ? "g" : "n"));
	}

	private setAccelStatus(on: boolean): void {
		this.aa.classList.toggle("on", on);
		this.al.textContent = on ? "Tap to disable" : "Tap to enable tilt control";
		this.ab.textContent = on ? "ON" : "OFF";
		this.ab.className = "bd " + (on ? "g" : "n");
	}

	private sendAngle(): void {
		if (this.an === this.ls2) return;
		this.ls2 = this.an;
		fetch("/api/angle", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `angle=${this.an}`,
		}).then((r) => {
			if (r.ok) {
				this.st.textContent = "Connected";
				this.st.className = "c";
				this.ls.textContent = `Sent: ${this.an}\u00b0`;
			}
		}).catch(() => {
			this.st.textContent = "Disconnected";
			this.st.className = "d";
			this.ls2 = -1;
		});
	}

	private draw(): void {
		const c = this.cv;
		const ctx = this.cx;
		const w = c.width;
		const h = c.height;
		ctx.clearRect(0, 0, w, h);

		const cx = 40, cy = h / 2, r = 16;
		const a = (this.an - 90) * Math.PI / 180;
		const ex = cx + Math.cos(a) * r;
		const ey = cy + Math.sin(a) * r;

		ctx.strokeStyle = "#333"; ctx.lineWidth = 2;
		ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

		ctx.strokeStyle = "#555"; ctx.lineWidth = 1;
		for (let d = 0; d <= 180; d += 30) {
			const rd = (d - 90) * Math.PI / 180;
			ctx.beginPath();
			ctx.moveTo(cx + Math.cos(rd) * (r - 4), cy + Math.sin(rd) * (r - 4));
			ctx.lineTo(cx + Math.cos(rd) * r, cy + Math.sin(rd) * r);
			ctx.stroke();
		}

		ctx.strokeStyle = "#0af"; ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

		ctx.fillStyle = "#0af";
		ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();

		ctx.fillStyle = "#0af";
		ctx.font = "12px system-ui"; ctx.textAlign = "center";
		ctx.fillText(`${this.an}\u00b0`, cx, h - 8);

		ctx.fillStyle = "#444"; ctx.font = "9px system-ui"; ctx.textAlign = "center";
		ctx.fillText("0\u00b0", cx - r - 14, cy + 4);
		ctx.fillText("180\u00b0", cx + r + 14, cy + 4);
	}
}

customElements.define("servo-panel", ServoPanel);
