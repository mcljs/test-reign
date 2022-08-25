import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../view/Home";

const AppRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
};
export default AppRouter;
