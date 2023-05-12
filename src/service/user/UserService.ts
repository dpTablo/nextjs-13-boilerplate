import { User } from '@model/service/user/User';

export interface UserService {
    getUser: (userId: string) => Promise<User>;
}
