import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import ForcePasswordChangeRoute from './ForcePasswordChangeRoute';

import Dashboard from '../pages/dashboard/Dashboard';

// import MyAttendance from '../pages/employee/attendance/MyAttendance';
// import ApplyLeave from '../pages/employee/leaves/ApplyLeave';
// import MyLeaves from '../pages/employee/leaves/MyLeaves';
import ApplyLeave from '../pages/leaves/ApplyLeave';
import MyAttendance from '../pages/attendance/MyAttendance';
import MyLeaves from '../pages/leaves/MyLeaves';

const EmployeeRoutes = () => {
  return (
    <>
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <ForcePasswordChangeRoute>
              <Dashboard />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/attendance"
        element={
          <ProtectedRoute
            allowedRoles={[
              'EMPLOYEE',
              'MANAGER',
              'ADMIN',
            ]}
          >
            <ForcePasswordChangeRoute>
              <MyAttendance />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/leaves/apply"
        element={
          <ProtectedRoute
            allowedRoles={[
              'EMPLOYEE',
              'MANAGER',
              'ADMIN',
            ]}
          >
            <ForcePasswordChangeRoute>
              <ApplyLeave />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/leaves"
        element={
          <ProtectedRoute
            allowedRoles={[
              'EMPLOYEE',
              'MANAGER',
              'ADMIN',
            ]}
          >
            <ForcePasswordChangeRoute>
              <MyLeaves />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default EmployeeRoutes;