import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PrivateRouteProps } from '../types';

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.roleId)) {
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
