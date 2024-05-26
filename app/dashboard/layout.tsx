import SideNav from '../components/Sidebar/sidenav';
import NavbarDashboard from '../components/navbarDashboard';
import { MyCoworkingProvider } from '@/app/components/myCoworkigs/myCoworkingConstext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MyCoworkingProvider>
      <div className="md-overflow-hidden flex h-screen flex-col md:flex-row">
        <div className="w-full flex-none md:w-[13rem]">
          <SideNav />
        </div>
        <div className="grow md:p-4">
          <NavbarDashboard />
          {children}
        </div>
      </div>
    </MyCoworkingProvider>
  );
}
