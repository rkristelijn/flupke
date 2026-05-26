interface AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  responseType?: "json" | "text" | "arraybuffer" | "blob";
  signal?: AbortSignal;
  validateStatus?: (status: number) => boolean;
}
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}
interface AxiosInstance {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
  (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  create(config?: AxiosRequestConfig): AxiosInstance;
  defaults: AxiosRequestConfig;
  interceptors: { request: any; response: any };
  isAxiosError(error: any): boolean;
  all<T>(promises: Promise<T>[]): Promise<T[]>;
  spread<T, R>(fn: (...args: T[]) => R): (arr: T[]) => R;
}
declare const axios: AxiosInstance;
export = axios;
