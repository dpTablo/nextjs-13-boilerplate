import { AxiosProvider } from '../http/axios/AxiosProvider';
import { UserService } from '@service/user/UserService';
import { DefaultUserService } from '@service/user/DefaultUserService';

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
        this._userService.setAxiosProvider(this.axiosProvider);
    }
}
