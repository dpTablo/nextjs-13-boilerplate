import { UserService } from '@service/user/UserService';
import { User } from '@model/service/user/User';
import axios from 'axios';
import { userFactory } from '@model/service/user/UserFactory';

export class DefaultUserService implements UserService {
    async getUser(userId: string): Promise<User> {
        const params = {
            userId,
        };

        const response = await axios({
            method: 'get',
            url: `https://api.dptablo.com/v3/user`,
            params: params,
            responseType: 'json',
        });

        return userFactory.createFromSerializeObject(response.data);
    }
}
