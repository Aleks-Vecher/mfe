import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const memoryHistory =
    defaultHistory ||
    createMemoryHistory({
      // fix the bug of necessary clicking login button twice
      initialEntries: [initialPath],
    });

  //automatically call onNavigate after memory history change by clicking any navigation link
  if (onNavigate) {
    memoryHistory.listen(onNavigate);
  }

  ReactDOM.render(<App history={memoryHistory} />, el);

  return {
    onParentNavigate(location) {
      //use condition to prevent infinite loop in navigation
      //nextPathname from browser history from container
      const nextPathname = location.pathname;
      const pathname = memoryHistory.location;
      if (pathname !== nextPathname) {
        memoryHistory.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container and we should export the mount function
export { mount };
