import { DefaultUserService } from '@service/user/DefaultUserService';
import { dehydrate } from '@tanstack/query-core';
import getQueryClient from '@utils/reactQuery/getQueryClient';
import Hydrate from '@utils/reactQuery/hydrate.client';
import { UserProfile } from '@components/auth/UserProfile';

export interface UserProfileProps {
    userId: string | undefined;
}

export default async function ServerSideUserProfile(props: UserProfileProps) {
    const queryClient = getQueryClient();

    const userService = new DefaultUserService();

    await queryClient.prefetchQuery(['hydrate-getUser'], async () => {
        return userService.getUser(props.userId || '');
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <UserProfile></UserProfile>
        </Hydrate>
    );
}
