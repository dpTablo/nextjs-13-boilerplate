import { User } from '@model/service/user/User';
import { AuthenticationRequiredService } from '@service/AuthenticationRequiredService';

export interface UserService extends AuthenticationRequiredService {
    getUser: (userId: string) => Promise<User>;
}
