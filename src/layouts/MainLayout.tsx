import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';
import { Footer } from '../components/Footer/Footer';
import { WhatsappIcon } from '../components/WhatsappIcon/WhatsappIcon';

export const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <WhatsappIcon />
    </div>
  );
};
