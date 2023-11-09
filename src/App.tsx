import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "./App.scss";
import MenuLeft from "./components/MenuLeft";
import MenuRight from "./components/MenuRight";
import ModalConfirm from "./components/ModalConfirm";
import { useTask } from "./contexts/taskContext";
import Important from "./pages/important";
import Login from "./pages/login";
import MyTasks from "./pages/myTasks";
import Register from "./pages/register";
import StickyWall from "./pages/stickyWall";

const App: React.FC = () => {
  const { state } = useTask();

  const notify = () => {
    toast.success("Deleted successfully !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {state.isOpenModalDelete && <ModalConfirm notify={notify} />}
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
    </BrowserRouter>
  );
};

export default App;
