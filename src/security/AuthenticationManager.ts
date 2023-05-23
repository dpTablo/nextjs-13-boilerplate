import { UserAuthentication } from '@model/service/auth/UserAuthentication';

export interface AuthenticationManager {
    login(userAuthentication: UserAuthentication): UserAuthentication;
    logout(userAuthentication: UserAuthentication): UserAuthentication;
}
