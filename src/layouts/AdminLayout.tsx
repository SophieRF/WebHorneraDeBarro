import { Outlet } from 'react-router-dom';
import { AdminNavBar } from '../components/AdminNavBar/AdminNavBar';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const AdminLayout = () => {
  const verifyToken = useAuthStore((state) => state.verifyToken);

  useEffect(() => {
    verifyToken().catch(()=> {});
  }, []);

  return (
    <div>
      <AdminNavBar />

      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};
