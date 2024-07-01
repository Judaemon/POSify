import { Link, Outlet } from 'react-router-dom';

export const AuthenticatedLayout = () => {
  return (
    <div className='app-container'>
      <ul className='navigation flex space-x-2 bg-black text-white'>
        <li>
          <Link to="/">Public | </Link>
        </li>
        <li>
          <Link to="/protected">Protected | </Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
      </ul>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};