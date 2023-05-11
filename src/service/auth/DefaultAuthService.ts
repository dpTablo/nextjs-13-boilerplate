import axios from 'axios';
import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import { AuthService } from '@service/auth/AuthService';
import { userAuthenticationFactory } from '@model/service/auth/UserAuthenticationFactory';

export class DefaultAuthService implements AuthService {
    async login(userId: string, password: string): Promise<UserAuthentication> {
        const params = new URLSearchParams();
        params.append('userId', userId);
        params.append('password', password);

        const response = await axios({
            method: 'post',
            url: 'https://api.dptablo.com/v3/auth/login',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        });

        return userAuthenticationFactory.createFromSerializeObject(response.data);
    }
}
