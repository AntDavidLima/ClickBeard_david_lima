import { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren) {
  return <div className="flex flex-col h-screen">{children}</div>;
}
