import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import DropImages from "./components/DropImages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DropImages />
  </React.StrictMode>
);
