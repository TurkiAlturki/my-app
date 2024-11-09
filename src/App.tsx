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
      <main className="flex flex-col fixed bottom-0 top-0 left-0 right-0 m-auto">
        <PageHeader />
        <section className="flex flex-row h-full p-4 overflow-hidden">
          <SideMenu />
          <Canvas />
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
