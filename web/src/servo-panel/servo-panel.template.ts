export const template = `
	<div class="card">
		<div class="card-title">Angle</div>
		<div class="angle-display">
			<span id="ad">90</span><span>&deg;</span>
		</div>
		<input type="range" id="sl" min="0" max="180" step="1" value="90">
	</div>

	<div class="card">
		<div class="card-title">
			Accelerometer
			<span class="badge" id="badge">OFF</span>
		</div>
		<div class="accel-area" id="aa">
			<div class="accel-icon">&#65039;</div>
			<div class="accel-error" id="ae"></div>
			<div class="accel-hint" id="al">Tap to enable tilt control</div>
		</div>
	</div>

	<div class="card">
		<div class="card-title">Indicator</div>
		<canvas id="cv" width="300" height="80"
			style="width:100%;border-radius:8px;background:#0a0a1a">
		</canvas>
	</div>

	<div class="status-bar">
		<span id="st" class="disconnected">Disconnected</span>
		<span id="ls"></span>
	</div>
`;
