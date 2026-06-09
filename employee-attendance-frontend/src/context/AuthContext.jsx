// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from 'react';

// import {
//   getProfile,
// } from '../api/authService';

// const AuthContext =
//   createContext();

// export const AuthProvider = ({
//   children,
// }) => {

//   const [user, setUser] =
//     useState(
//       JSON.parse(
//         localStorage.getItem(
//           'user',
//         ),
//       ),
//     );

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const refreshUser =
//     async () => {

//       const token =
//         localStorage.getItem(
//           'token',
//         );

//       if (!token) {
//         return;
//       }

//       try {
//         const profile =
//           await getProfile();

//         localStorage.setItem(
//           'user',
//           JSON.stringify(
//             profile,
//           ),
//         );

//         setUser(profile);

//       } catch (error) {
//         console.error(error);

//         localStorage.clear();

//         setUser(null);
//       }
//     };

//   const login = (
//     token,
//     userData,
//   ) => {

//     localStorage.setItem(
//       'token',
//       token,
//     );

//     localStorage.setItem(
//       'user',
//       JSON.stringify(
//         userData,
//       ),
//     );

//     setUser(userData);
//   };

//   const logout = () => {

//     localStorage.clear();

//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         refreshUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () =>
//   useContext(AuthContext);