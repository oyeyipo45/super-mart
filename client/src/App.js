import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from "./redux/actions/authActions";
import { Provider } from "react-redux";
import store from "./redux/store";
import Index from './LandingPage/Index';

const App = () => {

  //LOAD USER ON EVERY COMPONENT RENDER IN APP
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
