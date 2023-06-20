import { AxiosInstance } from 'axios';

export interface BackEndService {
    setAxiosInstance(axiosInstance: AxiosInstance): void;
}
