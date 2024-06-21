import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { SampleAPICall } from './Components/SampleComponent';

import { useAuth } from './Hooks/useAuth';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import type { LoaderFunctionArgs } from 'react-router-dom';
import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from 'react-router-dom';
import { fakeAuthProvider } from './auth';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      const isAuthenticated  = useAuth.getState().isAuthenticated;
      
      if (!isAuthenticated) {
        return redirect('/login');
      }

      const user = useAuth.getState().fetchUser();
      console.log('user from root', user);
      
      return null
    },
    Component: AuthenticatedLayout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: 'protected',
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: '/logout',
    async action() {
      // We sign out in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect('/');
    },
  },
  {
    path: '/login',
    loader() {
      const isAuthenticated  = useAuth.getState().isAuthenticated;
      
      if (isAuthenticated) {
        return redirect('/');
      }

      return null;
    },
    Component: LoginForm,
  },
  {
    path: 'testing123',
    // loader: protectedLoader,
    Component: SampleAPICall,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  const user = useAuth((state) => state.user);

  // let { user } = useRouteLoaderData('root') as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user.name}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </fetcher.Form>
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  console.log('formData', formData);

  let username = formData.get('username') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: 'You must provide a username to log in',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: 'Invalid login attempt',
    };
  }

  let redirectTo = formData.get('redirectTo') as string | null;
  return redirect(redirectTo || '/');
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect('/');
  }
  return null;
}

// function LoginPage() {
//   let location = useLocation();
//   let params = new URLSearchParams(location.search);
//   let from = params.get('from') || '/';

//   let navigation = useNavigation();
//   let isLoggingIn = navigation.formData?.get('username') != null;

//   let actionData = useActionData() as { error: string } | undefined;

//   return (
//     <div>
//       <p>You must log in to view the page at {from}</p>

//       <Form method="post" replace>
//         <input type="hidden" name="redirectTo" value={from} />
//         <label>
//           Username: <input name="username" />
//         </label>{' '}
//         <button type="submit" disabled={isLoggingIn}>
//           {isLoggingIn ? 'Logging in...' : 'Login'}
//         </button>
//         {actionData && actionData.error ? (
//           <p style={{ color: 'red' }}>{actionData.error}</p>
//         ) : null}
//       </Form>
//     </div>
//   );
// }

function PublicPage() {
  return <h3>Public</h3>;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const isAuthenticated  = useAuth.getState().isAuthenticated;

  if (!isAuthenticated ) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

// export default App;
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import LoginForm from './Components/Auth/LoginForm';
import { AuthenticatedLayout } from './Layouts/AuthenticatedLayout';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
