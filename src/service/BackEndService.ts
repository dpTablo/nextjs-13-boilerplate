import { AxiosProvider } from '../http/axios/AxiosProvider';

export interface BackEndService {
    setAxiosProvider(axiosProvider: AxiosProvider): void;
}
