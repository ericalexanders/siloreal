import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <header className='h-14 bg-blue-500 text-white flex items-center px-4 justify-end'>
        <NavLink to="/">Home</NavLink>
        <p className='px-4'>|</p>
        {user?.roleId === 3 && (
          <>
            <NavLink to="/admin">Administration</NavLink>
            <p className='px-4'>|</p>
          </>  
        )}
        <NavLink to="/profile">{user?.name} Profile</NavLink>
        <p className='px-4'>|</p>
        <button onClick={() => logout()}>{'Logout -->'}</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout