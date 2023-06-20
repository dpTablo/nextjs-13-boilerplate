import { AxiosResponse } from 'axios';

import { UserService } from '@service/user/UserService';
import { userFactory } from '@model/service/user/UserFactory';
import { User } from '@model/service/user/User';
import { AxiosProvider } from '../../http/axios/AxiosProvider';

export class DefaultUserService implements UserService {
    private axiosProvider!: AxiosProvider;

    setAxiosProvider(axiosProvider: AxiosProvider): void {
        this.axiosProvider = axiosProvider;
    }

    async getUser(userId: string): Promise<User> {
        const params = {
            userId,
        };

        const response = await this.axiosProvider.getAxiosInstance()<AxiosResponse>({
            method: 'get',
            url: `/user`,
            params: params,
            responseType: 'json',
        });

        return userFactory.createFromSerializeObject(response.data);
    }
}
