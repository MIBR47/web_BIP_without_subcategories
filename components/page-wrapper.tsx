import { ReactNode } from 'react';

export default function PageWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}
//flex flex-col bg-zinc-100 flex-grow 
