'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function LoadingIndicator() {
  return (
    <ProgressBar height='3px' color='#0063A4' options={{ showSpinner: true }} />
  );
}
