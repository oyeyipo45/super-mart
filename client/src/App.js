import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./landingPage/index";
import { loadUser } from "./redux/actions/authActions";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {

  //LOAD USER ON EVERY COMPONENT RENDER
  useEffect(() => {
    store.dispatch(loadUser());
    return () => {
      //  cleanup
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="grid-container">
        <Index />
      </div>
    </Provider>
  );
};

export default App;
