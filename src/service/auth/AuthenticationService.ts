import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import { BackEndService } from '@service/BackEndService';
import { Credentials } from '../../security/authentication/Credentials';

export interface AuthenticationService extends BackEndService {
    login(userId: string, password: string): Promise<Credentials>;
    refresh(userAuthentication: UserAuthentication): Promise<Credentials>;
}
