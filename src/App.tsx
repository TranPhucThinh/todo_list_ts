import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import "./App.scss";
import MenuLeft from "./components/MenuLeft";
import MenuRight from "./components/MenuRight";
import { TaskProvider } from "./contexts/taskContext";
import Important from "./pages/important";
import Login from "./pages/login";
import MyTasks from "./pages/myTasks";
import Register from "./pages/register";
import StickyWall from "./pages/stickyWall";

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <TaskProvider>
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
                <MenuRight />
              </div>
            }
          >
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/important" element={<Important />} />
            <Route path="/sticky-wall" element={<StickyWall />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
};

export default App;
