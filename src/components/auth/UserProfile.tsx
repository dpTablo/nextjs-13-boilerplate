'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import { logout } from '@redux/auth/userAuthenticationSlice';
import { User } from '@model/service/user/User';
import { DefaultUserService } from '@service/user/DefaultUserService';

export function UserProfile() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const userService = new DefaultUserService();

    const userAuthentication = useAppSelector((state) => state.userAuthenticationReducer.value);

    const getUserQueryResult = useQuery({
        queryKey: ['hydrate-getUser'],
        queryFn: () => {
            if (!userAuthentication) {
                return;
            }
            userService.getUser(userAuthentication.userEmail);
        },
    });

    const onClickLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    if (getUserQueryResult.isLoading) return <h1>Loading...</h1>;

    if (getUserQueryResult.error) return <h1>An error has occurred: {getUserQueryResult.error.message}</h1>;

    const user = getUserQueryResult.data;

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
        </div>
    );
}
