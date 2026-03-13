import "./App.css";
import { useState } from "react";

import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";

import DataProvider from "./context/DataProvider";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login isUserAuthenticated={isUserAuthenticated} />}
          />

          {/* Protected Routes */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/details/:id" element={<DetailView />} />
            <Route path="/update/:id" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;