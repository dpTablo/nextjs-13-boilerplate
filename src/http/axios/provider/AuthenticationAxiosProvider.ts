import { AxiosProvider } from '../AxiosProvider';
import { AxiosInstance } from 'axios';
import { AxiosFactory } from '../AxiosFactory';
import { AxiosInstanceType } from '../AxiosInstanceType';

export class AuthenticationAxiosProvider implements AxiosProvider {
    private _axiosInstance: AxiosInstance;

    constructor() {
        const axiosFactory = new AxiosFactory();
        this._axiosInstance = axiosFactory.getDefaultAxiosInstance(AxiosInstanceType.AUTHENTICATION);
    }

    getAxiosInstance(): AxiosInstance {
        return this._axiosInstance;
    }
}
