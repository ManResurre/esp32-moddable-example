import { html, when, ref } from "@microsoft/fast-element";
import type { ServoPanel } from "./servo-panel";

export const template = html<ServoPanel>`
	<fluent-card>
		<div class="card-title">Angle</div>
		<div class="angle-display">
			${x => x.angle}<span>&deg;</span>
		</div>
		<fluent-slider
			min="0" max="180" step="1"
			:value="${x => x.angle}"
			@input="${(x, c) => { x.angle = parseInt((c.event.target as HTMLInputElement).value, 10); }}">
		</fluent-slider>
	</fluent-card>

	<fluent-card>
		<div class="card-title">
			Accelerometer
			<fluent-badge appearance="neutral">
				${x => x.accelOn ? "ON" : "OFF"}
			</fluent-badge>
		</div>
		<div class="accel-area ${x => x.accelOn ? "on" : ""}"
			 @click="${x => x.toggleAccel()}">
			<div class="accel-icon">&#65039;</div>
			<div class="accel-error ${x => x.accelError ? "visible" : ""}">${x => x.accelError}</div>
			<div class="accel-hint">${x => x.accelOn ? "Tap to disable" : "Tap to enable tilt control"}</div>
		</div>
	</fluent-card>

	<fluent-card>
		<div class="card-title">Indicator</div>
		<canvas ${ref("cv")} width="300" height="80"
			style="width:100%;border-radius:8px;background:#0a0a1a">
		</canvas>
	</fluent-card>

	<div class="status-bar">
		<span class="${x => x.connected ? "connected" : "disconnected"}">
			${x => x.connected ? "Connected" : "Disconnected"}
		</span>
		<span>${x => x.lastSentLabel}</span>
	</div>
`;
