import { UserAuthentication } from '../../model/service/auth/UserAuthentication';

export interface AuthService {
    login: (userId: string, password: string) => Promise<UserAuthentication>;
}
