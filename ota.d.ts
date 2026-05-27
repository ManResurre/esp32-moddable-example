declare module "ota" {
  class OTA {
    constructor(options?: { byteLength?: number });
    write(data: ArrayBuffer): void;
    cancel(): void;
    complete(): void;
  }
  export default OTA;
}
