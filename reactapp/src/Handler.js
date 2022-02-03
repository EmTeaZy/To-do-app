import React from "react";
import App from "./App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";

export default function Handler() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<App />}></Route>
            <Route path="/about" element={<Layout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
