// @ts-nocheck
interface Moment {
  isValid(): boolean;
  clone(): Moment;
  toDate(): Date;
  valueOf(): number;
  unix(): number;
  toISOString(): string;
  toJSON(): string;
  format(fmt?: string): string;
  fromNow(): string;
  add(amount: number, unit: string): Moment;
  subtract(amount: number, unit: string): Moment;
  startOf(unit: string): Moment;
  endOf(unit: string): Moment;
  diff(other: any, unit?: string): number;
  isBefore(other: any): boolean;
  isAfter(other: any): boolean;
  isSame(other: any, unit?: string): boolean;
  isBetween(a: any, b: any): boolean;
  year(v?: number): number | Moment;
  month(v?: number): number | Moment;
  date(v?: number): number | Moment;
  day(): number;
  hour(v?: number): number | Moment;
  minute(v?: number): number | Moment;
  second(v?: number): number | Moment;
}
interface MomentStatic {
  (input?: string | number | Date): Moment;
  utc(input?: any): Moment;
  duration(val: number, unit?: string): { asMilliseconds(): number };
  isMoment(obj: any): boolean;
  now(): number;
}
declare const moment: MomentStatic;
export = moment;
