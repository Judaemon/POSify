// import { createBrowserRouter, redirect } from "react-router-dom";
// import { useAuth } from "./Hooks/useAuth";
// import { AuthenticatedLayout } from "./Layouts/AuthenticatedLayout";
// import { ProtectedPage, PublicPage, protectedLoader } from "./app";
// import LoginForm from "./Components/Auth/LoginForm";
// import { SampleAPICall } from "./Components/SampleComponent";

import type { LoaderFunctionArgs } from 'react-router-dom';
import { Link, Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import { useAuth } from './Hooks/useAuth';
import { checkAuthentication } from './helpers/authHelper';
import { LoginForm } from './Components/Auth/LoginForm';
import GroupsPage from './Pages/Groups';
import { AuthenticatedLayout } from './Layouts/AuthenticatedLayout';

// export const router = createBrowserRouter([
//   {
//     id: 'root',
//     path: '/',
//     loader: async () => {
//       // const authenticatedUser = useAuth.getState().user;
//       // console.log('authenticatedUser', authenticatedUser);

//       // if (!authenticatedUser) {
//       //   console.log('Not authenticated in front-end');

//       //   const test = await useAuth.getState().fetchUser();
//       //   console.log('test', test);

//       //   if (!test) {
//       //     console.log('Not authenticated in back-end');
//       //     return redirect('/login');
//       //   }

//       //   return test;
//       // }

//       // return authenticatedUser;

//       return null;
//     },
//     Component: AuthenticatedLayout,
//     children: [
//       {
//         index: true,
//         Component: PublicPage,
//       },
//       // {
//       //   path: 'protected',
//       //   loader: protectedLoader,
//       //   Component: ProtectedPage,
//       // },
//     ],
//   },
//   // {
//   //   path: '/login',
//   //   loader: async () => {
//   //     const { isAuthenticated, fetchUser } = useAuth.getState();
//   //     console.log('isAuthenticated', isAuthenticated);

//   //     if (isAuthenticated) {
//   //       console.log('Authenticated in front-end');

//   //       const user = await fetchUser();
//   //       console.log('user', user);

//   //       if (user !== null) {
//   //         console.log('Authenticated in back-end');
//   //         return redirect('/');
//   //       }
//   //     }

//   //     console.log('Not authenticated in front-end back-end');
//   //     return null;
//   //   },
//   //   Component: LoginForm,
//   // },
// ]);

// export function PublicPage() {
//   return <h3>Public</h3>;
// }

const Layout = () => {
  return (
    <div>
      <h1 className="my-2">Layout</h1>

      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <div className="bg-black text-white">
        <Outlet />
      </div>
    </div>
  );
};

const AuthStatus = () => {
  const user = useAuth.getState().user;
  const isAuthenticated = useAuth.getState().isAuthenticated;

  if (!user) {
    return <p>Not authenticated in frontend</p>;
  }

  return (
    <div className="pl-4">
      <h1 className="my-2">Auth status</h1>

      <div className="my-2 bg-black text-white">
        <p>Authenticated: {isAuthenticated ? "True" : "False"}</p>
        <p>User: {user.name}</p>
      </div>
    </div>
  );
};

const PublicPage = () => {
  return (
    <div className="pl-4 m-4">
      <h3>Public</h3>
    </div>
  );
};

const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated =
    useAuth.getState().isAuthenticated || checkAuthentication();

  if (!isAuthenticated) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }

  return await useAuth.getState().fetchUser();
};

const ProtectedPage = () => {
  return (
    <div className="pl-4 m-4">
      <h3>Protected</h3>
    </div>
  );
};

const LoginPageLoader = () => {
  const isAuthenticated =
    useAuth.getState().isAuthenticated || checkAuthentication();

  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
};

const LoginPage = () => {
  return (
    <div className="">
      <h3>Login Page</h3>
      <div className="w-6/12 p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: protectedLoader,
    Component: AuthenticatedLayout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: 'protected',
        Component: ProtectedPage,
      },
      {
        path: 'groups',
        Component: GroupsPage,
      },
    ],
  },
  {
    path: '/login',
    loader: LoginPageLoader,
    Component: LoginPage,
  },
]);
