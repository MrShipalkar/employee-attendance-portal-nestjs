import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import ForcePasswordChangeRoute from './ForcePasswordChangeRoute';

import Dashboard from '../pages/dashboard/Dashboard';

import TeamAttendance from '../pages/manager/attendance/TeamAttendance';
import TeamLeaves from '../pages/manager/leaves/TeamLeaves';
// import ManagerMyAttendance from '../pages/manager/attendance/ManagerMyAttendance';
// import ManagerApplyLeave from '../pages/manager/leaves/ManagerApplyLeave';
// import ManagerMyLeaves from '../pages/manager/leaves/ManagerMyLeaves';
import ApplyLeave from '../pages/leaves/ApplyLeave';
import MyAttendance from '../pages/attendance/MyAttendance';
import MyLeaves from '../pages/leaves/MyLeaves';

const ManagerRoutes = () => {
  return (
    <>
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <Dashboard />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/attendance"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <TeamAttendance />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/leaves"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <TeamLeaves />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/my-attendance"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <MyAttendance />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/leaves/apply"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <ApplyLeave />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/my-leaves"
        element={
          <ProtectedRoute allowedRoles={['MANAGER']}>
            <ForcePasswordChangeRoute>
              <MyLeaves />
            </ForcePasswordChangeRoute>
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default ManagerRoutes;