declare module "button" {
  type ButtonOptions = {
    pin?: number;
    mode?: number;
    invert?: boolean;
    onPush?: (pressed: number) => void;
    target?: object;
  };
  class Button {
    constructor(options?: ButtonOptions);
    close(): void;
    read(): number;
    get pressed(): boolean;
  }
  export default Button;
}
