import AccessDenied from './AccessDenied';
import { useSelector } from 'react-redux';

const PermissionPage = ({
  permission,
  children,
}) => {

 const user = useSelector(
  state => state.auth.user,
);

  // console.log('USER:', user);

  // console.log(
  //   'PERMISSIONS:',
  //   user?.permissions,
  // );

  // console.log(
  //   'CHECKING:',
  //   permission,
  // );

  // console.log(
  //   'HAS PERMISSION:',
  //   user?.permissions?.includes(
  //     permission,
  //   ),
  // );

  const permissions =
    user?.permissions || [];

  if (
    !permissions.includes(
      permission,
    )
  ) {
    return <AccessDenied />;
  }

  return children;
};

export default PermissionPage;