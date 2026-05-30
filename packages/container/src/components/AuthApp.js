import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);

  // Browser History (not Memory history as in marketing)
  const browserHistory = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: browserHistory.location.pathname,
      onNavigate: (location) => {
        const nextPathname = location.pathname;

        //to prevent infinite loop in navigation; pathname is the current pathname
        const { pathname } = browserHistory.location
        if(pathname !== nextPathname){
          browserHistory.push(nextPathname);
        }
      },
      onSignIn,
    });

    browserHistory.listen(onParentNavigate)
  },[]);

  return <div ref={ref} />;
};

export default AuthApp;
