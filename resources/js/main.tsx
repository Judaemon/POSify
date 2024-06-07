

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';

import './bootstrap';
import '../css/app.css';

import App from "./App";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const MainApp = () => (
  <React.Fragment>
    <h1>{appName}</h1>
    <App />
    sdasdasdas
  </React.Fragment>
);

export default MainApp;

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<MainApp />);
}
