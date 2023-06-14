import { AxiosProvider } from './AxiosProvider';
import axios, { AxiosInstance } from 'axios';

/**
 * 기본적으로 사용되는 공통 Axios Provider
 */
export class DefaultAxiosProvider implements AxiosProvider {
    getAxiosInstance(): AxiosInstance {
        return axios.create({
            baseURL: process.env.SERVICE_BASE_URL,
            timeout: 1000 * 10,
            headers: {
                'Authorization':
            }
        });
    }
}
