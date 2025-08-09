import { useContext } from 'react';
import { SidebarContext } from './layouts/Sidebar';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Tipe props untuk NavItems
interface NavItemsProps {
  icon: ReactNode;
  text: string;
  to: string;
  alert?: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ icon, text, to, alert = false }) => {
  const context = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    throw new Error('NavItems must be used within a SidebarContext.Provider');
  }

  const { expanded } = context;
  const active = location.pathname === to;

  return (
    <li
      onClick={() => navigate(to)}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'}`}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>

      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}></div>}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
};

export default NavItems;
