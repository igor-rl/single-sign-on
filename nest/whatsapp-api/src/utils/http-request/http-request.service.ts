import { Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<any> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config,
    );
    return response;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );
    return response;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config,
    );
    return response.data;
  }
}
