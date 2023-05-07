'use client';

import '@msw/index';
import React, { Fragment } from 'react';

export default function ClientComponent({ children }: { children: React.ReactNode }) {
    return <Fragment>{children}</Fragment>;
}
