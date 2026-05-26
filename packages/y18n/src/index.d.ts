interface Y18N {
  locale: string;
  __(str: string, ...args: any[]): string;
  setLocale(l: string): void;
  updateLocale(obj: Record<string, string>): void;
}
declare function y18n(opts?: { locale?: string }): Y18N;
export = y18n;
