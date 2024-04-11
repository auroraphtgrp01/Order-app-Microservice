import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';

export enum IMethodHTTP {
  GET = 'get',
  HEAD = 'head',
  PUT = 'put',
  PATCH = 'patch',
  POST = 'post',
  DELETE = 'delete',
}

export const axiosRequest = async (
  path: string,
  method: IMethodHTTP,
  data?: any
) => {
  const dataUser = localStorage.getItem('user_info') || null;
  const token = dataUser ? JSON.parse(dataUser).token.access_token : '';
  if (method === IMethodHTTP.GET) {
    return await axios[method](path, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:3000',
    });
  } else {
    return await axios[method](path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:3000',
    });
  }
};
