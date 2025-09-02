import { type ReactNode } from 'react';

export function P(props: { children: ReactNode }) {
  return <div className="mb-3">{props.children}</div>
}