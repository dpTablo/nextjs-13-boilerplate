'use client';

import '@msw/index';
import React, { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers } from '@redux/provider';

const queryClient = new QueryClient();

export default function ClientComponentEnvironment({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <Providers>{children}</Providers>
            </QueryClientProvider>
        </Fragment>
    );
}
