interface ColorSupport {
  level: number;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
}

declare const supportsColor: ColorSupport & {
  stdout: ColorSupport;
  stderr: ColorSupport;
};

export = supportsColor;
