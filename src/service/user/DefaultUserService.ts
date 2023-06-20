import { AxiosInstance, AxiosResponse } from 'axios';

import { UserService } from '@service/user/UserService';
import { userFactory } from '@model/service/user/UserFactory';
import { User } from '@model/service/user/User';

export class DefaultUserService implements UserService {
    private axiosInstance!: AxiosInstance;

    setAxiosInstance(axiosInstance: AxiosInstance): void {
        this.axiosInstance = axiosInstance;
    }

    async getUser(userId: string): Promise<User> {
        const params = {
            userId,
        };

        const response = await this.axiosInstance<AxiosResponse>({
            method: 'get',
            url: `/user`,
            params: params,
            responseType: 'json',
        });

        return userFactory.createFromSerializeObject(response.data);
    }
}
