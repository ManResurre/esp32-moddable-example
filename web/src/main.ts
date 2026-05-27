import { registerFAST } from "./fast-registry";
import "./servo-panel/servo-panel";

registerFAST();

export { ServoPanel } from "./servo-panel/servo-panel";
export { Accelerometer } from "./accelerometer";
