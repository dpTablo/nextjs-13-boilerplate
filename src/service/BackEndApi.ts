import { UserService } from '@service/user/UserService';
import { AxiosProvider } from '../http/axios/AxiosProvider';
import { DefaultUserService } from '@service/user/DefaultUserService';
import { LocalStorageCookieAuthenticationManager } from '../security/authentication/LocalStorageCookieAuthenticationManager';
import { JwtTokenInterceptingAxiosProvider } from '../http/axios/provider/JwtTokenInterceptingAxiosProvider';

export class BackEndApi {
    private axiosProvider: AxiosProvider;

    private _userService!: UserService;

    constructor(axiosProvider: AxiosProvider) {
        this.axiosProvider = axiosProvider;
        this.init();
    }

    get userService(): UserService {
        return this._userService;
    }

    private init(): void {
        this._userService = new DefaultUserService();
        this._userService.setAxiosInstance(this.axiosProvider.getAxiosInstance());
    }
}

const authenticationManager = new LocalStorageCookieAuthenticationManager();
const axiosProvider = new JwtTokenInterceptingAxiosProvider(authenticationManager);

export const backEndApi = new BackEndApi(axiosProvider);
