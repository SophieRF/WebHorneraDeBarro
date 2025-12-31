import { Outlet} from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';

export const MainLayout = () => {

  return (
    <div>
      <NavBar />
 
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};
