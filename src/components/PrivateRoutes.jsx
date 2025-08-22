import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isAuth = useSelector(state => state.auth.token);

  return isAuth ? <Outlet /> : <Navigate to="/home" />;
}
