import { AxiosRequestConfig } from "axios"


const handler = (config: AxiosRequestConfig) => {
  let token
  if (typeof window !== "undefined") {
    token = localStorage.getItem('TOKEN')
  }
  if (token)
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    }
  return config
}

export default handler
