import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Home from '../pages/home';
import Register from '../pages/register';
import Login from '../pages/login';

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
      <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default Routing;
