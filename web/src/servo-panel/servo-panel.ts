import { FASTElement, customElement, observable } from "@microsoft/fast-element";
import { template } from "./servo-panel.template";
import { styles } from "./servo-panel.styles";
import { Accelerometer } from "../accelerometer";

@customElement({
	name: "servo-panel",
	template,
	styles,
	shadowOptions: { mode: "open" },
})
export class ServoPanel extends FASTElement {
	@observable angle = 90;
	@observable accelOn = false;
	@observable accelError = "";
	@observable connected = false;
	@observable lastSentLabel = "";

	private cv!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private accel!: Accelerometer;
	private lastSent = -1;

	connectedCallback(): void {
		super.connectedCallback();
		this.accel = new Accelerometer(
			(a) => { this.angle = a; },
			(msg) => { this.accelError = msg; },
			(on) => { this.accelOn = on; },
		);
		this.setupCanvas();
		this.drawCanvas();
		setInterval(() => this.sendAngle(), 50);
	}

	private setupCanvas(): void {
		if (!this.cv) return;
		const dpr = devicePixelRatio || 1;
		const rect = this.cv.getBoundingClientRect();
		const w = Math.round(rect.width) || this.cv.width;
		const h = Math.round(rect.height) || this.cv.height;
		this.cv.width = w * dpr;
		this.cv.height = h * dpr;
	}

	toggleAccel(): void {
		if (this.accelOn)
			this.accel.disable();
		else
			this.accel.enable();
	}

	angleChanged(): void {
		this.drawCanvas();
	}

	private drawCanvas(): void {
		if (!this.cv) return;
		const ctx = this.ensureCtx();
		if (!ctx) return;
		const dpr = devicePixelRatio || 1;
		const cw = this.cv.width;
		const ch = this.cv.height;
		const w = cw / dpr;
		const h = ch / dpr;
		ctx.clearRect(0, 0, cw, ch);
		ctx.save();
		ctx.scale(dpr, dpr);

		const cx = w / 2, cy = h / 2, r = 16;
		const a = -this.angle * Math.PI / 180;
		const ex = cx + Math.cos(a) * r;
		const ey = cy + Math.sin(a) * r;

		ctx.strokeStyle = "#333"; ctx.lineWidth = 2;
		ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

		ctx.strokeStyle = "#555"; ctx.lineWidth = 1;
		for (let d = 0; d <= 180; d += 30) {
			const rd = -d * Math.PI / 180;
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
		ctx.fillText(`${this.angle}\u00b0`, cx, h - 8);

		ctx.fillStyle = "#444"; ctx.font = "9px system-ui"; ctx.textAlign = "center";
		ctx.fillText("180\u00b0", cx - r - 14, cy + 4);
		ctx.fillText("0\u00b0", cx + r + 14, cy + 4);

		ctx.restore();
	}

	private ensureCtx(): CanvasRenderingContext2D | null {
		if (this.ctx) return this.ctx;
		const cv = this.cv || this.shadowRoot?.querySelector("canvas");
		if (!cv) return null;
		this.cv = cv as HTMLCanvasElement;
		this.ctx = this.cv.getContext("2d")!;
		return this.ctx;
	}

	private sendAngle(): void {
		if (this.angle === this.lastSent) return;
		this.lastSent = this.angle;
		fetch("/api/angle", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `angle=${this.angle}`,
		}).then((r) => {
			if (r.ok) {
				this.connected = true;
				this.lastSentLabel = `Sent: ${this.angle}\u00b0`;
			}
		}).catch(() => {
			this.connected = false;
			this.lastSentLabel = "";
			this.lastSent = -1;
		});
	}
}
