import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { getAccessLevel } from '../../utils/roleCheck';
import React from 'react';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const URL = useLocation();
  const screen = URL.pathname.slice(1); // Get the screen name from the URL path
  const { auth } = useAuth(); // Assume `auth` includes user's role, like `auth.role`

  if (!auth) {
    // Redirect to login if no auth context
    return <Navigate to="/" replace />;
  }

  // Get the user's role from `auth`
  const userRole = auth.role;
  
  // Use `getAccessLevel` to check the user's access level for the specific screen
  const accessLevel = getAccessLevel(screen, userRole);
  console.log(screen, accessLevel);
  // Redirect if user has no access to this screen
  if (accessLevel == "NotAccessible") {
    return <Navigate to="/403" replace />; // Redirect to a 403 Forbidden page or any other appropriate page
  }

  // Clone the element and pass the accessLevel prop to it
  const elementWithAccessLevel = React.cloneElement(element, { accessLevel });

  // Render the protected element with access level
  return elementWithAccessLevel;
};

export default ProtectedRoute;