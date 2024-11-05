import React from "react";
import PageHeader from "./PageHeader";
import SideMenu from "./SideMenu";
import Canvas from "./Canvas";
import { BrowserRouter } from "react-router-dom";
import { appSettingsSlice } from "./Redux/AppSettingsSlice";
import { SetReduxState } from "./Redux/Store";

function App() {

  return (
    <BrowserRouter>
      <main className="absolute flex h-full w-full flex-col">
        <PageHeader />
        <section className="flex h-full flex-row">
          <SideMenu />
          <Canvas />
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
