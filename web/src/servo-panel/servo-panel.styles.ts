export const styles = `
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		width: 100%;
		max-width: 420px;
		font-family: system-ui, -apple-system, sans-serif;
		color: #eee;
	}

	.card {
		width: 100%;
		padding: 16px 20px;
		background: #1a1a2e;
		border-radius: 16px;
		box-sizing: border-box;
	}

	.card-title {
		font-size: 0.85rem;
		color: #888;
		margin-bottom: 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.angle-display {
		font-size: 2.8rem;
		font-weight: 300;
		text-align: center;
		color: #0af;
		margin: 4px 0;
		font-variant-numeric: tabular-nums;
	}

	.angle-display span {
		font-size: 1.1rem;
		color: #666;
	}

	input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #333;
		border-radius: 3px;
		outline: none;
		margin: 12px 0;
		cursor: pointer;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #0af;
		border: 3px solid #1a1a2e;
		box-sizing: border-box;
		box-shadow: 0 0 12px rgba(0, 170, 255, 0.4);
		cursor: pointer;
		margin-top: -7px;
	}

	input[type="range"]::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #0af;
		border: 3px solid #1a1a2e;
		box-sizing: border-box;
		box-shadow: 0 0 12px rgba(0, 170, 255, 0.4);
		cursor: pointer;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		height: 6px;
		border-radius: 3px;
	}

	input[type="range"]::-moz-range-track {
		background: #333;
		border-radius: 3px;
		height: 6px;
	}

	.accel-area {
		background: #16213e;
		border-radius: 12px;
		padding: 20px;
		text-align: center;
		cursor: pointer;
		user-select: none;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: background 0.3s, border-color 0.3s;
		border: 2px solid transparent;
		box-sizing: border-box;
	}

	.accel-area.on {
		background: #0a2a4a;
		border-color: #0af;
	}

	.accel-icon {
		font-size: 2.5rem;
		margin-bottom: 8px;
		opacity: 0.6;
	}

	.accel-error {
		font-size: 0.75rem;
		color: #f44;
		display: none;
		background: #2a1111;
		border-radius: 8px;
		padding: 6px 10px;
		margin-top: 6px;
		border: 1px solid #f44;
	}

	.accel-error.visible {
		display: block;
	}

	.accel-hint {
		font-size: 0.85rem;
		color: #888;
		margin-top: 4px;
	}

	.badge {
		margin-left: 8px;
		font-size: 0.75rem;
		padding: 2px 8px;
		border-radius: 4px;
		background: #333;
		text-transform: uppercase;
	}

	canvas {
		max-height: 80px;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 8px;
		padding-top: 12px;
		border-top: 1px solid #222;
		font-size: 0.8rem;
		color: #666;
	}

	.status-bar .connected {
		color: #0a0;
	}

	.status-bar .disconnected {
		color: #f44;
	}
`;
