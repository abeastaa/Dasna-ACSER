import React from 'react'
import axios from 'axios'

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem('accessToken'))
  return token
}

export default function useRequest() {
  const request = async (
    token,
    urlAddress,
    requestMethod = 'GET',
    body,
    headers,
    requestParams
  ) => {
    return new axios({
      baseURL: 'http://65.21.14.248:8088/',
      url: urlAddress,
      method: requestMethod,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? getToken() : null,
        ...headers,
      },
      params: requestParams,
      timeout: 1000 * 15,
    })
  }

  return {
    request,
  }
}
