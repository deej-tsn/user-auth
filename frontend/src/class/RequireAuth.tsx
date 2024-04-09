// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { useLocation, Navigate} from "react-router-dom";
import { useAuth } from "../hooks/AuthService";
import { cloneElement, useEffect, useState } from "react";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const [hasPermission, setHasPermission] : any = useState(); // <-- initially undefined

  useEffect(() => {
    useAuth()
      .then(response => {
        if(response){
          setHasPermission(response);
        }else{
          setHasPermission(null);
        }
      });
  }, []);

  if (hasPermission === undefined) {
    return null; // or loading indicator, spinner, etc
  }

  return hasPermission
    ? cloneElement(children, {user : hasPermission})
    : <Navigate to="/login" replace state={{ from: location }} />;
  
}

