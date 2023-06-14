import { AxiosInstance } from 'axios';

export interface AxiosProvider {
    getAxiosInstance(): AxiosInstance;
}
