'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import { logout } from '@redux/auth/userAuthenticationSlice';

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const userAuthentication = useAppSelector((state) => state.userAuthenticationReducer.value);

    const onClickLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <div>
            <div>대시보드 페이지</div>
            <div>
                <div>
                    <h2>로그인 정보</h2>
                    <div>{userAuthentication?.userEmail}</div>
                    <div></div>
                </div>
                <button onClick={onClickLogout}>로그인 페이지로 이동</button>
            </div>
        </div>
    );
}
