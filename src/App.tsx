import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import "./App.scss";
import MyTasks from "./pages/myTasks";
import Login from "./pages/login";
import Register from "./pages/register";
import MenuLeft from "./components/MenuLeft";
import Important from "./pages/important";
import StickyWall from "./pages/stickyWall";

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Navigate to="/my-tasks" />} />
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <div className="app_wrapper">
              <MenuLeft />
              <Outlet />
            </div>
          }
        >
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/important" element={<Important />} />
          <Route path="/sticky-wall" element={<StickyWall />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
