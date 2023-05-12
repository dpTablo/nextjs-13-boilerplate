import { DefaultUserService } from '@service/user/DefaultUserService';
import { User } from '@model/service/user/User';
import { userFactory } from '@model/service/user/UserFactory';

async function getUser(userId: string): Promise<User> {
    const userService = new DefaultUserService();
    return userService.getUser(userId);
}

export interface UserProfileProps {
    userId: string | undefined;
}

export default async function ServerSideUserProfile(props: UserProfileProps) {
    const user = props.userId ? await getUser(props.userId) : userFactory.createEmptyInstance();

    return (
        <div className={'m-2 border border-sky-500'}>
            <h1>인증정보(ServerSideUserProfile)</h1>
            <h2>Server Component 입니다.</h2>
            <ul>
                <li>
                    안녕하세요. {user.firstName}
                    {user.lastName}님.
                </li>
                <li>({user.userEmail})</li>
            </ul>
        </div>
    );
}
