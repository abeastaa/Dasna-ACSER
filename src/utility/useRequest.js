import React from 'react'

export default function useRequest() {
  
    const jwtRequests = async (urlAddress, requestMethod = "get", body, headers, requestParams) => {
        return new axios({
            baseURL: "http://65.21.14.248:8089/",
            url: urlAddress,
            method: requestMethod,
            data: body,
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer",
                ...headers
            },
            params: requestParams,
            timeout: 1000 * 15
        })
    }
}
