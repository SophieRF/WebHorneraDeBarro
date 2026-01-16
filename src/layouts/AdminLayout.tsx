import { Outlet} from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';

export const AdminLayout = () => {

  return (
    <div>
      <NavBar />
 
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};
