import { Accelerometer } from "../accelerometer";
import { template } from "./servo-panel.template";
import { styles } from "./servo-panel.styles";

export class ServoPanel extends HTMLElement {
	private _angle = 90;
	private accelOn = false;

	private ad!: HTMLElement;
	private sl!: HTMLInputElement;
	private badge!: HTMLElement;
	private aa!: HTMLElement;
	private ae!: HTMLElement;
	private al!: HTMLElement;
	private st!: HTMLElement;
	private ls!: HTMLElement;
	private cv!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private accel!: Accelerometer;
	private lastSent = -1;

	get angle(): number {
		return this._angle;
	}

	set angle(v: number) {
		this._angle = Math.round(Math.max(0, Math.min(180, v)));
		this.sl.value = String(this._angle);
		this.ad.innerHTML = `${this._angle}<span>&deg;</span>`;
		this.drawCanvas();
	}

	connectedCallback(): void {
		this.attachShadow({ mode: "open" });
		this.shadowRoot!.innerHTML = `<style>${styles}</style>${template}`;

		this.ad = this.shadowRoot!.getElementById("ad")!;
		this.sl = this.shadowRoot!.getElementById("sl")! as HTMLInputElement;
		this.badge = this.shadowRoot!.getElementById("badge")!;
		this.aa = this.shadowRoot!.getElementById("aa")!;
		this.ae = this.shadowRoot!.getElementById("ae")!;
		this.al = this.shadowRoot!.getElementById("al")!;
		this.st = this.shadowRoot!.getElementById("st")!;
		this.ls = this.shadowRoot!.getElementById("ls")!;
		this.cv = this.shadowRoot!.getElementById("cv")! as HTMLCanvasElement;
		this.ctx = this.cv.getContext("2d")!;

		this.sl.addEventListener("input", () => {
			this.angle = +this.sl.value;
		});

		this.sl.addEventListener("change", () => {
			this.angle = +this.sl.value;
			this.commitAngle();
		});

		this.aa.addEventListener("click", () => this.toggleAccel());

		this.accel = new Accelerometer(
			(a) => { this.angle = a; },
			(msg) => { this.setError(msg); },
			(on) => { this.setAccelStatus(on); },
		);

		this.setupCanvas();
		this.drawCanvas();
		setInterval(() => this.sendAngle(), 50);
	}

	private setupCanvas(): void {
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

	private setError(msg: string): void {
		this.ae.textContent = msg;
		this.ae.classList.toggle("visible", msg.length > 0);
		this.badge.textContent = msg ? "ERR" : (this.accelOn ? "ON" : "OFF");
		this.badge.style.background = msg ? "#2a1111" : "#333";
	}

	private setAccelStatus(on: boolean): void {
		this.accelOn = on;
		this.aa.classList.toggle("on", on);
		this.al.textContent = on ? "Tap to disable" : "Tap to enable tilt control";
		this.badge.textContent = on ? "ON" : "OFF";
		this.badge.style.background = "#333";
	}

	private drawCanvas(): void {
		const dpr = devicePixelRatio || 1;
		const cw = this.cv.width;
		const ch = this.cv.height;
		const w = cw / dpr;
		const h = ch / dpr;
		this.ctx.clearRect(0, 0, cw, ch);
		this.ctx.save();
		this.ctx.scale(dpr, dpr);

		const cx = w / 2, cy = h / 2, r = 16;
		const a = -this._angle * Math.PI / 180;
		const ex = cx + Math.cos(a) * r;
		const ey = cy + Math.sin(a) * r;

		this.ctx.strokeStyle = "#333"; this.ctx.lineWidth = 2;
		this.ctx.beginPath(); this.ctx.arc(cx, cy, r, 0, Math.PI * 2); this.ctx.stroke();

		this.ctx.strokeStyle = "#555"; this.ctx.lineWidth = 1;
		for (let d = 0; d <= 180; d += 30) {
			const rd = -d * Math.PI / 180;
			this.ctx.beginPath();
			this.ctx.moveTo(cx + Math.cos(rd) * (r - 4), cy + Math.sin(rd) * (r - 4));
			this.ctx.lineTo(cx + Math.cos(rd) * r, cy + Math.sin(rd) * r);
			this.ctx.stroke();
		}

		this.ctx.strokeStyle = "#0af"; this.ctx.lineWidth = 3;
		this.ctx.beginPath(); this.ctx.moveTo(cx, cy); this.ctx.lineTo(ex, ey); this.ctx.stroke();

		this.ctx.fillStyle = "#0af";
		this.ctx.beginPath(); this.ctx.arc(ex, ey, 4, 0, Math.PI * 2); this.ctx.fill();

		this.ctx.fillStyle = "#0af";
		this.ctx.font = "12px system-ui"; this.ctx.textAlign = "center";
		this.ctx.fillText(`${this._angle}\u00b0`, cx, h - 8);

		this.ctx.fillStyle = "#444"; this.ctx.font = "9px system-ui"; this.ctx.textAlign = "center";
		this.ctx.fillText("180\u00b0", cx - r - 14, cy + 4);
		this.ctx.fillText("0\u00b0", cx + r + 14, cy + 4);

		this.ctx.restore();
	}

	private sendAngle(): void {
		if (this._angle === this.lastSent) return;
		this.doSend();
	}

	private doSend(): void {
		this.lastSent = this._angle;
		fetch("/api/angle", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `angle=${this._angle}`,
		}).then((r) => {
			if (r.ok) {
				this.st.textContent = "Connected";
				this.st.className = "connected";
				this.ls.textContent = `Sent: ${this._angle}\u00b0`;
			}
		}).catch(() => {
			this.st.textContent = "Disconnected";
			this.st.className = "disconnected";
			this.ls.textContent = "";
			this.lastSent = -1;
		});
	}

	private commitAngle(): void {
		this.sendAngle();
	}
}

customElements.define("servo-panel", ServoPanel);
