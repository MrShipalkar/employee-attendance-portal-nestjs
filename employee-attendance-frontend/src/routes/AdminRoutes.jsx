import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import ForcePasswordChangeRoute from './ForcePasswordChangeRoute';

import Dashboard from '../pages/dashboard/Dashboard';

import Users from '../pages/admin/users/Users';
import AttendanceManagement from '../pages/admin/attendance/AttendanceManagement';
import LeaveManagement from '../pages/admin/leaves/LeaveManagement';
import Roles from '../pages/admin/roles/Roles';
import RolePermissions from '../pages/admin/permissions/RolePermissions';
import Profile from '../pages/profile/Profile';



const AdminRoutes = () => (
  <>
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <Dashboard />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <Users />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/attendance"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <AttendanceManagement />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/leaves"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <LeaveManagement />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/roles"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <Roles />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/roles/:roleId/permissions"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ForcePasswordChangeRoute>
            <RolePermissions />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute
          allowedRoles={[
            'ADMIN',
            'HR',
            'MANAGER',
            'EMPLOYEE',
          ]}
        >
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
  path="/admin/profile"
  element={
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <ForcePasswordChangeRoute>
        <Profile />
      </ForcePasswordChangeRoute>
    </ProtectedRoute>
  }
/>
  </>
);

export default AdminRoutes;