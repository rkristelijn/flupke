// @ts-nocheck
interface AxiosRequestConfig<D = unknown> {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: D;
  timeout?: number;
  responseType?: "json" | "text" | "arraybuffer" | "blob";
  signal?: AbortSignal;
  validateStatus?: (status: number) => boolean;
}
interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}
interface Interceptors {
  use(onFulfilled?: (value: unknown) => unknown, onRejected?: (error: unknown) => unknown): number;
  eject(id: number): void;
}
interface AxiosInstance {
  <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T>>;
  put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T>>;
  patch<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T>>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  create(config?: AxiosRequestConfig): AxiosInstance;
  defaults: AxiosRequestConfig;
  interceptors: { request: Interceptors; response: Interceptors };
  isAxiosError(error: unknown): boolean;
  all<T>(promises: Promise<T>[]): Promise<T[]>;
  spread<T, R>(fn: (...args: T[]) => R): (arr: T[]) => R;
}
declare const axios: AxiosInstance;
export = axios;
