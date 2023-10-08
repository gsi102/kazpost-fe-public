import React, { useLayoutEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { SettingsPage } from "@/components/SettingsPage";
import { Widget } from "@/components/Widget";

import "@/shared/styles/main.scss";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/settings"} element={<SettingsPage />} />
        <Route path={"/widget"} element={<Widget />} />
      </Routes>
    </div>
  );
}

export default App;
