import { Credentials } from './Credentials';

export interface AuthenticationManager {
    signIn(userId: string, password: string): Promise<Credentials | undefined>;
    signOut(): Promise<Credentials | undefined>;
    getCredentials(): Promise<Credentials | undefined>;
}
