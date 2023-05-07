export const initMsw = () => {
    if (typeof window === 'undefined') {
        (async () => {
            const { server } = await import('./server');
            server.listen();
        })();
    } else {
        (async () => {
            const { worker } = await import('./worker');
            worker.start();
        })();
    }
};

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enable' && process.env.NODE_ENV === 'development') {
    console.log('=============================================');
    console.log('========== MSW API MOCKING RUNNING ==========');
    console.log('=============================================');

    /** MSW */
    (async () => {
        initMsw();
    })();
}
