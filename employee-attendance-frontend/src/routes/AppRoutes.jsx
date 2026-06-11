import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from '../pages/auth/Login';
import ChangePassword from '../pages/auth/ChangePassword';


import ProtectedRoute from './ProtectedRoute';

import AdminRoutes from './AdminRoutes';
import HrRoutes from './HrRoutes';
import ManagerRoutes from './ManagerRoutes';
import EmployeeRoutes from './EmployeeRoutes';

const AppRoutes = () => {
  return (
    <Routes>

  <Route
    path="/"
    element={<Navigate to="/login" />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  {AdminRoutes()}
  {HrRoutes()}
  {ManagerRoutes()}
  {EmployeeRoutes()}

  <Route
    path="/change-password"
    element={<ChangePassword />}
  />
{/* <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/> */}
</Routes>
  );
};

export default AppRoutes;