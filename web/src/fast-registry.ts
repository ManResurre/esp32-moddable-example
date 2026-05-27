import {
	provideFASTDesignSystem,
	fastSlider,
	fastButton,
	fastCard,
	fastBadge,
} from "@microsoft/fast-components";

export function registerFAST() {
	provideFASTDesignSystem()
		.register(
			fastSlider(),
			fastButton(),
			fastCard(),
			fastBadge(),
		);
}
