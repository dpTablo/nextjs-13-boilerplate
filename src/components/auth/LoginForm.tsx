'use client';

import tw from 'tailwind-styled-components';
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/navigation';

import { login } from '@redux/auth/userAuthenticationSlice';
import { DefaultAuthService } from '@service/auth/DefaultAuthService';
import { AuthService } from '@service/auth/AuthService';

const Label = tw.label`
    block 
    mb-2 
    text-sm 
    font-medium 
    text-gray-900 
    dark:text-white
`;

const Input = tw.input`
    block 
    w-full 
    p-2.5 
    sm:text-sm 
    text-gray-900 
    bg-gray-50 
    border 
    border-gray-300 
    rounded-lg 
    focus:ring-primary-600 
    focus:border-primary-600 
    dark:bg-gray-700 
    dark:border-gray-600 
    dark:placeholder-gray-400 
    dark:text-white 
    dark:focus:ring-blue-500 
    dark:focus:border-blue-500
`;

const ActionAnchor = tw.a`
    text-sm 
    font-medium 
    text-primary-600
    hover:underline 
    dark:text-primary-500
`;

const LoginButton = tw.button`
    w-full 
    text-sm 
    px-5 
    py-2.5 
    rounded-lg 
    text-center 
    bg-sky-600 
    hover:bg-sky-700
    text-white 
    focus:ring-4 
    focus:outline-none 
    focus:ring-primary-300 
    font-medium 
    dark:bg-primary-600 
    dark:hover:bg-primary-700 
    dark:focus:ring-primary-800
`;

const LoginFormTitle = tw.h1`
    text-xl 
    text-center 
    font-bold 
    leading-tight 
    tracking-tight 
    text-gray-900 
    md:text-2xl 
    dark:text-white
`;

export default function LoginForm() {
    const router = useRouter();
    const authService: AuthService = new DefaultAuthService();

    const userAuthentication = useAppSelector((state) => state.userAuthenticationReducer.value);
    const dispatch = useAppDispatch();

    const onSubmitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;
        const newUserAuthentication = await authService.login(email, password);

        dispatch(login(newUserAuthentication));
        router.push('/dashboard');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <UserIcon />
                    NEXT.js 13
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <LoginFormTitle>로그인</LoginFormTitle>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitLoginForm}>
                            <div>
                                <Label htmlFor="email">이메일</Label>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" />
                            </div>
                            <div>
                                <Label htmlFor="password">비밀번호</Label>
                                <Input type="password" name="password" id="password" placeholder="••••••••" />
                            </div>
                            <LoginButton type="submit">로그인</LoginButton>
                            <div className="flex justify-end gap-4">
                                <ActionAnchor href="#">비밀번호 찾기</ActionAnchor>
                                <ActionAnchor>계정 만들기</ActionAnchor>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
