import { BrowserRouter, StaticRouter } from "react-router-dom";

type IsomorphicRouterProps = {
  children: React.ReactNode;
  location?: string;
};

export const IsomorphicRouter = ({ children, location }: IsomorphicRouterProps) => {
  if (__SSR__) {
    if (!location) {
      throw new Error('location is required in SSR');
    }
    return <StaticRouter location={location}>{children}</StaticRouter>;
  }
  return <BrowserRouter>{children}</BrowserRouter>;
};