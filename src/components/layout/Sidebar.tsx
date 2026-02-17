'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, BarChart3, Users, Settings, HelpCircle, ChevronRight, X, Ruler, PaintBucket, WashingMachine, CirclePile, Blocks } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebarStore';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className='w-5 h-5' />,
  },
  {
    label: 'Order',
    href: '/order',
    icon: <BarChart3 className='w-5 h-5' />,
  },
  {
    label: 'Kaos Kaki',
    href: '/kaos-kaki',
    icon: <Users className='w-5 h-5' />,
    badge: '24',
  },
  {
    label: 'Master Data',
    href: '',
    icon: <Blocks className='w-5 h-5' />,
    submenu: [
      {
        label: 'Ukuran',
        href: '/master/size',
        icon: <Ruler className='w-5 h-5' />,
      },
      {
        label: 'Warna',
        href: '/master/color',
        icon: <PaintBucket className='w-5 h-5' />,
      },
      {
        label: 'Mesin',
        href: '/master/machine',
        icon: <WashingMachine className='w-5 h-5' />,
      },
      {
        label: 'Bahan',
        href: '/master/material',
        icon: <CirclePile className='w-5 h-5' />,
      },
    ],
  },
  {
    label: 'Stok',
    href: '/stock',
    icon: <CirclePile className='w-5 h-5' />,
  },
  {
    label: 'Akun',
    href: '/account',
    icon: <HelpCircle className='w-5 h-5' />,
  },
];

const Sidebar: React.FC = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  const isActive = (href: string) => pathname === href || (href !== '#' && pathname?.startsWith(href + '/'));

  const NavItemComponent: React.FC<{ item: NavItem; isSubmenu?: boolean }> = ({ item, isSubmenu = false }) => {
    const hasSubmenu = !!item.submenu?.length;
    const expanded = expandedItems.includes(item.label);

    if (hasSubmenu) {
      return (
        <div>
          <button
            onClick={() => toggleSubmenu(item.label)}
            className={clsx(
              'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
              isSubmenu ? 'text-sm ml-4' : 'text-base',
              expanded ? 'bg-blue-500 text-white shadow-md' : 'hover:text-white hover:bg-blue-500/70',
            )}
          >
            <div className='flex items-center gap-3'>
              {item.icon}
              <span className={clsx('font-medium', !isOpen && 'hidden')}>{item.label}</span>
            </div>
            <ChevronRight className={clsx('w-4 h-4 transition-transform', expanded && 'rotate-90')} />
          </button>

          {expanded && isOpen && (
            <div className='space-y-1 mt-1'>
              {item.submenu?.map((subitem) => (
                <NavItemComponent key={subitem.href} item={subitem} isSubmenu />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => isMobile && closeSidebar()}
        className={clsx(
          'flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
          isSubmenu ? 'text-sm ml-4' : 'text-base',
          isActive(item.href) ? 'bg-blue-500 text-white shadow-md' : 'text-persebaya-text hover:bg-blue-500/70 hover:text-white',
        )}
      >
        <div className='flex items-center gap-3 flex-1'>
          {item.icon}
          <span className={clsx('font-medium', !isOpen && 'hidden')}>{item.label}</span>
        </div>
        {item.badge && isOpen && <span className='bg-persebaya-error text-white text-xs font-bold rounded-full px-2 py-1'>{item.badge}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isMobile && isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden' onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 overflow-y-auto',
          isOpen ? 'w-64 translate-x-0' : isMobile ? '-translate-x-full' : 'w-20',
          isMobile && !isOpen ? 'hidden md:block' : '',
        )}
      >
        {/* Sidebar Header */}
        <div className='p-4 flex items-center justify-between'>
          {isOpen && <h3 className='font-bold text-gray-900'>Menu</h3>}
          {isMobile && isOpen && (
            <Button variant='ghost' size='sm' onClick={closeSidebar} className='p-1'>
              <X className='w-5 h-5' />
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className='space-y-1 px-2 py-4'>
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        {isOpen && (
          <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50'>
            <p className='text-xs text-gray-500'>© 2026 FaiSal</p>
            <p className='text-xs text-gray-400'>v1.0.0</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
