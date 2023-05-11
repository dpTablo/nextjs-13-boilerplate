'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@redux/hooks';

import { logout } from '@redux/auth/userAuthenticationSlice';
import AuthenticationProfile from '@components/auth/AuthenticationProfile';

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onClickLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <div>
            <div>대시보드 페이지</div>
            <div>
                <div>
                    <AuthenticationProfile />
                </div>
                <button onClick={onClickLogout}>로그인 페이지로 이동</button>
            </div>
        </div>
    );
}
