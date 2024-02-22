
import { AxiosResponse } from "axios"


const converter = (response: AxiosResponse) => response

const handler = (e: any) => {
  if (e.response) console.log(e)

  return Promise.reject(e)
}

export default [converter, handler]
