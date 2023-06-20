import { AxiosProvider } from '../AxiosProvider';
import { AxiosInstance } from 'axios';
import { AxiosFactory } from '../AxiosFactory';
import { AxiosInstanceType } from '../AxiosInstanceType';

export class DefaultAxiosProvider implements AxiosProvider {
    private _axiosInstance: AxiosInstance;

    constructor() {
        const axiosFactory = new AxiosFactory();
        this._axiosInstance = axiosFactory.getDefaultAxiosInstance(AxiosInstanceType.DEFAULT);
    }

    getAxiosInstance(): AxiosInstance {
        return this._axiosInstance;
    }
}
