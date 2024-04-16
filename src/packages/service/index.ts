import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import error from "./error.response"
import handler from "./handler.request"

export const TIMEOUT = 10 * 60 * 1000

export type IClientOptions = AxiosRequestConfig;

class Http {
  protected readonly instance: AxiosInstance
  protected response!: AxiosResponse

  public constructor() {
    this.instance = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API + '/fl/game',
      timeout: TIMEOUT,
    })

    this.instance.interceptors.request.use(handler)
    this.instance.interceptors.response.use(...error)
  }

  private request<T>(options: IClientOptions) {
    const { ...res } = options
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request(res)
        .then((response) => {
          this.response = response
          resolve(response?.data.data ?? response)
        })
        .catch((axiosError) => {
          const { response } = axiosError ?? {}
          reject(response)
        })
    })
  }

  public get<T>(url: string, options?: Omit<IClientOptions, "url">) {
    return this.request<T>({
      ...options,
      method: "GET",
      url,
    })
  }

  public delete<T>(url: string, options?: Omit<IClientOptions, "url">) {
    return this.request<T>({ ...options, method: "DELETE", url })
  }

  public post<T>(
    url: string,
    data: unknown,
    options?: Omit<IClientOptions, "url">
  ) {
    return this.request<T>({
      ...options,
      data,
      method: "POST",
      url,
    })
  }

  public put<T>(
    url: string,
    data: unknown,
    options?: Omit<IClientOptions, "url">
  ) {
    return this.request<T>({
      ...options,
      data,
      method: "PUT",
      url,
    })
  }
}

export default new Http()
