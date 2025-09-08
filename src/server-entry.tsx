import { renderToString } from 'react-dom/server'
import App from './App'
import { SsrStateProvider } from './ssr/context/ssr-state';
import type { SsrStateData } from './ssr/utils/types';

export function renderApp(location: string, initialSsrData: SsrStateData) {
  return renderToString(
    <SsrStateProvider value={initialSsrData}>
      <App location={location} />
    </SsrStateProvider>
  )
}
