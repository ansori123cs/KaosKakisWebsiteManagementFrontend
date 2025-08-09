import { Outlet } from 'react-router';

import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from 'lucide-react';
import Sidebar from './Sidebar';
import NavItems from '../NavItems';

const adminLayout = () => {
  return (
    <div className='admin-layout'>
      {/* Tampilkan hanya di layar besar */}
      <aside>
        <Sidebar>
          <NavItems icon={<Home size={20} />} text='Home' to='/' alert />
          <NavItems icon={<LayoutDashboard size={20} />} text='Kaos Kaki' to='/kaos-kaki' />
          <NavItems icon={<StickyNote size={20} />} text='Mesin' to='/mesin' alert />
          <NavItems icon={<Flag size={20} />} text='Bahan' to='/bahan' />
          <NavItems icon={<Calendar size={20} />} text='Pesanan' to='/pesanan' />
          <hr className='my-3' />
          <NavItems icon={<Layers size={20} />} text='Stok' to='/stok' />
          <NavItems icon={<Settings size={20} />} text='User' to='/user' />
          <NavItems icon={<LifeBuoy size={20} />} text='Bantuan' to='/bantuan' />
        </Sidebar>
      </aside>
      <aside className='children'>
        <Outlet />
      </aside>
    </div>
  );
};

export default adminLayout;
