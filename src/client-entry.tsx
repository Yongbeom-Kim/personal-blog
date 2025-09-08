import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { SsrStateProvider } from "./ssr/context/ssr-state";
import { retrieveSsrState } from "./ssr/utils/html-retrieve-state";

hydrateRoot(
  document.getElementById("root")!,
  <SsrStateProvider value={retrieveSsrState()}>
    <App location={window.location.pathname} />
  </SsrStateProvider>
);
