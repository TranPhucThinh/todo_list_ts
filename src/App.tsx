import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.scss";
import MyTasks from "./pages/myTasks";
import Login from "./pages/login";
import Register from "./pages/register";
import MenuLeft from "./components/MenuLeft";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <>
              <MenuLeft />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<MyTasks />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
