'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DefaultUserService } from '@service/user/DefaultUserService';
import { User } from '@model/service/user/User';
import { logout } from '@redux/auth/userAuthenticationSlice';

export default function ClientSideUserProfile() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const credentials = useAppSelector((state) => state.credentialsReducer.credentials);

    const userService = new DefaultUserService();

    const onClickLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const getUserQueryResult = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => {
            if (!credentials) {
                return null;
            }

            const user = await userService.getUser(credentials.userEmail);
            return user;
        },
    });

    if (getUserQueryResult.isLoading) return <h1>Loading...</h1>;

    if (getUserQueryResult.error) return <h1>An error has occurred: {getUserQueryResult.error.message}</h1>;

    const user = getUserQueryResult.data as User;

    return (
        <div className={'m-2 border border-red-500'}>
            <h1>인증정보(ClientSideUserProfile)</h1>
            <h2>Client Component 입니다.</h2>
            <ul>
                <li>
                    안녕하세요. {user.firstName}
                    {user.lastName}님.
                </li>
                <li>({user.userEmail})</li>
            </ul>
            <div>
                <button
                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                    onClick={onClickLogout}
                >
                    로그인 페이지로 이동
                </button>
            </div>
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}
