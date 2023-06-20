import { LocalStorageCookieAuthenticationManager } from '../security/authentication/LocalStorageCookieAuthenticationManager';
import { JwtTokenInterceptingAxiosProvider } from '../http/axios/provider/JwtTokenInterceptingAxiosProvider';
import { BackEndApi } from '@service/BackEndApi';

const authenticationManager = new LocalStorageCookieAuthenticationManager();
const axiosProvider = new JwtTokenInterceptingAxiosProvider(authenticationManager);

export const clientBackEndApi = new BackEndApi(axiosProvider);
