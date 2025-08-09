import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Tentukan tipe untuk context
interface SidebarContextType {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const user = {
    name: 'Ansori',
    email: 'ansori@gmail.com',
    role: 'Admin Kaos Kaki',
  };

  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col bg-white  shadow-sm'>
        {/* Logo & toggle */}
        <div className='p-4 pb-2 flex justify-between items-center'>
          {/* <img src='/assets/logo.png' alt='Logo' className={`overflow-hidden transition-all ${expanded ? 'w-16' : 'w-0'}`} /> */}
          <h4 className={`font-bold text center ${expanded ? 'text-2xl ' : 'text-sm'}`}>Jangkar Mas</h4>
          <button onClick={() => setExpanded((curr) => !curr)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Menu */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>

        {/* Profil */}
        <div className=' flex p-3'>
          <img src='/assets/profile.png' alt='Profile' className='w-10 h-10 rounded-md' />
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
            <div className='leading-4'>
              <h4 className='font-semibold'>{user?.name}</h4>
              <span className='text-xs text-gray-600'>{user?.email}</span>
              <span className='text-xs text-gray-600'>{user?.role}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
