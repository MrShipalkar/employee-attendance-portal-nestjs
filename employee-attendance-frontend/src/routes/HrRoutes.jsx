import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import ForcePasswordChangeRoute from './ForcePasswordChangeRoute';

import Dashboard from '../pages/dashboard/Dashboard';

import HrAttendance from '../pages/hr/attendance/HrAttendance';
import HrLeaveManagement from '../pages/hr/leaves/HrLeaveManagement';
import HrUsers from '../pages/hr/users/HrUsers';
// import HrApplyLeave from '../pages/hr/leaves/HrApplyLeave';
// import HrMyLeaves from '../pages/hr/leaves/HrMyLeaves';
import MyLeaves from '../pages/leaves/MyLeaves';
// import HrMyAttendance from '../pages/hr/attendance/HrMyAttendance';
import ApplyLeave from '../pages/leaves/ApplyLeave';
import MyAttendance from '../pages/attendance/MyAttendance';
import PayrollManagementPage from '../pages/hr/PayrollManagementPage';
import SalaryStructurePage from '../pages/hr/SalaryStructurePage';
import Profile from '../pages/profile/Profile';

const HrRoutes = () => (
  <>
    <Route
      path="/hr/dashboard"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <Dashboard />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/attendance"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <HrAttendance />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/leaves"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <HrLeaveManagement />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/users"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <HrUsers />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/leaves/apply"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <ApplyLeave />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/my-leaves"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <MyLeaves />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/my-attendance"
      element={
        <ProtectedRoute allowedRoles={['HR']}>
          <ForcePasswordChangeRoute>
            <MyAttendance />
          </ForcePasswordChangeRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/hr/payroll"
      element={
        <PayrollManagementPage />
      }
    />

    <Route
      path="/hr/salary-structures"
      element={<SalaryStructurePage />}
    />

    <Route
  path="/hr/profile"
  element={
    <ProtectedRoute allowedRoles={['HR']}>
      <ForcePasswordChangeRoute>
        <Profile />
      </ForcePasswordChangeRoute>
    </ProtectedRoute>
  }
/>
  </>

);

export default HrRoutes;