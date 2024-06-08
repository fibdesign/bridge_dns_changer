import axios from "axios";
import ErrorMessagesUtils from "@/utils/constansts/ErrorMessagesUtils";

const useErrorHandler = (error:any) : string => {
    if (error === null) return ErrorMessagesUtils.UNKNOWN
    if (axios.isAxiosError(error)) {
        //here we have a type guard check, error inside this if will be treated as AxiosError
        const response = error?.response
        const request = error?.request
        const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)

        if (error.code === 'ERR_NETWORK') {
            return ErrorMessagesUtils.ERR_NETWORK
        } else if (error.code === 'ERR_CANCELED') {
            return ErrorMessagesUtils.ERR_CANCELED
        }
        if (response) {
            //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
            const statusCode = response?.status
            if (statusCode === 404) {
                return ErrorMessagesUtils.NOT_FOUND
            } else if (statusCode === 401) {
                return ErrorMessagesUtils.NOT_AUTHORIZED
                //redirect user to login
            }else if (statusCode === 500) {
                return ErrorMessagesUtils.SERVER_DOWN
                //redirect user to login
            }
        } else if (request) {
            //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            return ErrorMessagesUtils.NO_RESPONSE
        }
    }
    //Something happened in setting up the request and triggered an Error
    return error.message
}
export default useErrorHandler