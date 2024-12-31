import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routers";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App: React.FC = () => (
  <div>
      <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
   
    <ToastContainer />
  </div>
);

export default App;