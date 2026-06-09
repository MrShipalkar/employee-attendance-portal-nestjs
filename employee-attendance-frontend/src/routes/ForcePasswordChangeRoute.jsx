import {
  Navigate,
} from 'react-router-dom';

const ForcePasswordChangeRoute = ({
  children,
}) => {
  const user =
    JSON.parse(
      localStorage.getItem(
        'user',
      ),
    );

  if (
    user?.forcePasswordChange
  ) {
    return (
      <Navigate
        to="/change-password"
        replace
      />
    );
  }

  return children;
};

export default ForcePasswordChangeRoute;