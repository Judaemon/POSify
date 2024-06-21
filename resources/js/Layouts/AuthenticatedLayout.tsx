import { Sample, SampleUsers } from '@/Components/SampleComponent';
import { useAuth, useAuthSelector } from '@/Hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';

export const AuthenticatedLayout: React.FC = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      <hr  className='my-4' />
      <main>
        <Outlet />
        
        <div>
          <SampleUsers />
        </div>

        {user && (
          <div className='mt-48'>
            <h1>Authenticated user</h1>
            <p>id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>email: {user.email}</p>
          </div>
        )}
      </main>
    </div>
  );
};
