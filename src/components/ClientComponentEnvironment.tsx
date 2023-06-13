'use client';

import { Fragment } from 'react';
import { Providers as ReduxProvider } from '@redux/provider';
import ReactQueryProvider from '@utils/reactQuery/ReactQueryProvider';

import '@msw/index';

export default function ClientComponentEnvironment({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <ReactQueryProvider>
                <ReduxProvider>{children}</ReduxProvider>
            </ReactQueryProvider>
        </Fragment>
    );
}
