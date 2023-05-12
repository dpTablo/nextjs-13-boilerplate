export const initMsw = async () => {
    const MESSAGE_WIDTH = 60;
    const FRONT_MARGIN = 2;
    function printConsoleMessage(message: string) {
        const spaceCount = MESSAGE_WIDTH - message.length - 2 - FRONT_MARGIN;
        message = ' '.repeat(FRONT_MARGIN) + message + ' '.repeat(spaceCount);
        message = '│' + message;
        message = message + '⎢';
        console.log(message);
    }

    function printConsoleStartBarAscii() {
        const message = '┌' + '─'.repeat(MESSAGE_WIDTH - 2) + '┐';
        console.log(message);
    }

    function printConsoleEndBarAscii() {
        const message = '┕' + '─'.repeat(MESSAGE_WIDTH - 2) + '┙';
        console.log(message);
    }

    printConsoleStartBarAscii();
    printConsoleMessage('  🖥 MSW API MOCKING RUNNING !');
    printConsoleMessage('');

    if (typeof window === 'undefined') {
        // (async () => {
        const { server } = await import('./server');
        server.listen();
        printConsoleMessage('[MSW] node server started.');
        // })();
    } else {
        // (async () => {
        const { worker } = await import('./worker');
        worker.start();
        printConsoleMessage('[MSW] service worker started.');
        // })();
    }

    printConsoleEndBarAscii();
};

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enable' && process.env.NODE_ENV === 'development') {
    /** MSW */
    (async () => {
        initMsw();
    })();
}
