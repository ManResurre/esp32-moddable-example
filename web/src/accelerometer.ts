export type AngleCallback = (angle: number) => void;
export type MessageCallback = (msg: string) => void;
export type ToggleCallback = (active: boolean) => void;

export class Accelerometer {
	private handler: ((e: DeviceOrientationEvent) => void) | null = null;
	private fired = false;
	private timer: ReturnType<typeof setTimeout> | null = null;

	constructor(
		private onAngle: AngleCallback,
		private onError: MessageCallback,
		private onToggle: ToggleCallback,
	) {}

	enable(): void {
		this.onError("");
		if (typeof DeviceOrientationEvent === "undefined") {
			this.onError("DeviceOrientation not supported");
			return;
		}
		if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
			(DeviceOrientationEvent as any).requestPermission()
				.then((r: string) => {
					if (r === "granted") this.start();
					else this.onError("Permission denied");
				})
				.catch((e: Error) => this.onError("Perm error: " + e.message));
		} else {
			this.start();
		}
	}

	disable(): void {
		this.onToggle(false);
		if (this.timer !== null) clearTimeout(this.timer);
		if (this.handler) window.removeEventListener("deviceorientation", this.handler);
		this.handler = null;
	}

	private start(): void {
		this.onToggle(true);
		this.fired = false;

		this.timer = setTimeout(() => {
			if (!this.fired)
				this.onError("Sensor not responding. Try HTTPS or Firefox.");
		}, 3000);

		this.handler = (e: DeviceOrientationEvent) => {
			if (!this.fired) { this.fired = true; if (this.timer !== null) clearTimeout(this.timer); }
			if (e.gamma === null || e.beta === null) {
				this.onError("Sensor data null. Try another browser.");
				this.disable();
				return;
			}
			const a = Math.round(90 + (e.gamma ?? 0));
			this.onAngle(Math.max(0, Math.min(180, a)));
		};
		window.addEventListener("deviceorientation", this.handler);
	}
}
