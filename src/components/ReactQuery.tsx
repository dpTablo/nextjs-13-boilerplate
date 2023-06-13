'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
    children: React.ReactNode;
};
export function ReactQuery({ children }: Props) {
    const [queryClient] = useState(new QueryClient());

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={dehydratedState}>{children}</Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}
