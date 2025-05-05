import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen ${className}`}>
      {children}
    </div>
  );
}
