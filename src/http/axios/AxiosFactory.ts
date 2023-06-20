import axios, { AxiosInstance } from 'axios';

import { AxiosInstanceType } from './AxiosInstanceType';

export class AxiosFactory {
    getDefaultAxiosInstance(axiosInstanceType: AxiosInstanceType): AxiosInstance {
        const baseURL = process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL;
        const timeout = this.initTimeout(axiosInstanceType);

        return axios.create({
            baseURL: baseURL,
            timeout: timeout,
        });
    }

    private initTimeout(axiosInstanceType: AxiosInstanceType) {
        if (axiosInstanceType === AxiosInstanceType.DEFAULT) {
            return 1000 * 5;
        } else {
            return 1000 * 3;
        }
    }
}
