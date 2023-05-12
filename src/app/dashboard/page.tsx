import ServerSideUserProfile from '@components/auth/ServerSideUserProfile';
import ClientSideUserProfile from '@components/auth/ClientSideUserProfile';
import ClientComponent from '@components/ClientComponent';

export default function DashboardPage() {
    //
    //

    return (
        <div>
            <div>대시보드 페이지</div>
            <div>
                <div>
                    {/* @ts-expect-error Async Server Component */}
                    <ServerSideUserProfile userId={'user1@gmail.com'} />
                </div>
                <div>
                    <ClientComponent>
                        <ClientSideUserProfile />
                    </ClientComponent>
                </div>
            </div>
        </div>
    );
}
