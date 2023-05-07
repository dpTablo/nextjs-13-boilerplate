import LoginForm from '@components/auth/LoginForm';
import ClientComponent from '@components/ClientComponent';

export default function TestPage() {
    return (
        <div>
            <ClientComponent>
                <LoginForm />
            </ClientComponent>
        </div>
    );
}
