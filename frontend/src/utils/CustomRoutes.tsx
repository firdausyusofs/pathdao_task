import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import { AppContext } from "./Context";

export function AuthenticatedRoute({ children }: { children: JSX.Element }) {
    let context = useContext(AppContext);
  
    if (!context.user) {
      return <Navigate to="/" replace />
    }
  
    return children;
}

export function UnauthenticatedRoute({ children }: { children: JSX.Element }) {
    let context = useContext(AppContext);
  
    if (context.user) {
      return <Navigate to="/profile" replace />
    }
  
    return children;
}