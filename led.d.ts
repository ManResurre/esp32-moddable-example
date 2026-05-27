declare module "led" {
	import Digital from "pins/digital";

	interface LEDOptions {
		pin?: number;
		mode?: number;
		invert?: boolean;
	}

	class LED extends Digital {
		constructor(options?: LEDOptions);
		on(): void;
		off(): void;
	}

	export {LED as default};
}
