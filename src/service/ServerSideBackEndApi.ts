import { JwtTokenInterceptingAxiosProvider } from '../http/axios/provider/JwtTokenInterceptingAxiosProvider';
import { BackEndApi } from '@service/BackEndApi';
import { ServerCookieAuthenticationManager } from '../security/authentication/ServerCookieAuthenticationManager';

const authenticationManager = new ServerCookieAuthenticationManager();
const axiosProvider = new JwtTokenInterceptingAxiosProvider(authenticationManager);
export const serverSideBackEndApi = new BackEndApi(axiosProvider);
