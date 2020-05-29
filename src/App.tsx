import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AppProvider from "./contexts/AppContext";
import Routes from "./routes/";

export default (props: any) => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
