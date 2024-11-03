import React from "react";
import PageHeader from "./PageHeader";
import SideMenu from "./SideMenu";
import Canvas from "./Canvas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <main className="flex flex-col w-full h-full absolute">
      <PageHeader />
      <section className="flex flex-row h-full">
        <SideMenu />
        <Canvas />
      </section>
    </main></BrowserRouter>
  );
}

export default App;

      