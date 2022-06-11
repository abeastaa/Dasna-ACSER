import React from 'react'
import axios from 'axios'

export default function useRequest() {
  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const request = (isJWT, urlAddress, requestMethod = 'GET', body, headers, requestParams) => {
    return new axios({
      baseURL: 'http://65.21.14.248:8088/',
      url: urlAddress,
      method: requestMethod,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: isJWT ? `Bearer ${getToken()}` : null,
        ...headers,
      },
      params: requestParams,
      timeout: 1000 * 15,
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return {
    request,
  }
}
