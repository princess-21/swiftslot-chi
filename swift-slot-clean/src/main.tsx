// import "./index.css";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // if you have Tailwind or global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
