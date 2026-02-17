'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { ListFilter, PlusIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

type Order = {
  id: string;
  namaPemesan: string;
  namaKaosKaki: string;
  tglPemesanan: Date;
  statusOrder: 'belum' | 'proses' | 'selesai';
};

const OrderList: Order[] = [
  {
    id: '671283616268123',
    namaPemesan: 'Pak Subhan',
    namaKaosKaki: 'SMP N 10 SURABAYA',
    tglPemesanan: new Date('2026-02-18'),
    statusOrder: 'proses',
  },
  {
    id: '671283616268124',
    namaPemesan: 'Bu Rina',
    namaKaosKaki: 'SMA N 5 SURABAYA',
    tglPemesanan: new Date('2026-02-10'),
    statusOrder: 'selesai',
  },
  {
    id: '671283616268125',
    namaPemesan: 'Pak Joko',
    namaKaosKaki: 'SD AL HIKMAH',
    tglPemesanan: new Date('2026-02-01'),
    statusOrder: 'selesai',
  },
  {
    id: '671283616268126',
    namaPemesan: 'Bu Sari',
    namaKaosKaki: 'SMPN 3 MALANG',
    tglPemesanan: new Date('2026-02-20'),
    statusOrder: 'belum',
  },
  {
    id: '671283616268127',
    namaPemesan: 'Pak Hendra',
    namaKaosKaki: 'SMA MUHAMMADIYAH 2',
    tglPemesanan: new Date('2026-02-17'),
    statusOrder: 'proses',
  },
  {
    id: '671283616268128',
    namaPemesan: 'Bu Anita',
    namaKaosKaki: 'SDN KETABANG',
    tglPemesanan: new Date('2026-02-05'),
    statusOrder: 'selesai',
  },
  {
    id: '671283616268129',
    namaPemesan: 'Pak Yusuf',
    namaKaosKaki: 'SMP KRISTEN PETRA 1',
    tglPemesanan: new Date('2026-02-22'),
    statusOrder: 'belum',
  },
  {
    id: '671283616268130',
    namaPemesan: 'Bu Lilis',
    namaKaosKaki: 'SMA N 2 GRESIK',
    tglPemesanan: new Date('2026-02-14'),
    statusOrder: 'proses',
  },
  {
    id: '671283616268131',
    namaPemesan: 'Pak Dedi',
    namaKaosKaki: 'SDIT NURUL FIKRI',
    tglPemesanan: new Date('2026-02-08'),
    statusOrder: 'selesai',
  },
  {
    id: '671283616268132',
    namaPemesan: 'Bu Maya',
    namaKaosKaki: 'SMP N 11 SURABAYA',
    tglPemesanan: new Date('2026-02-23'),
    statusOrder: 'belum',
  },
];

const SelectFilter = [
  { label: 'Terbaru', value: 'ascending' },
  { label: 'Terlama', value: 'descending' },
  { label: 'Status Belum', value: 'belum' },
  { label: 'Status Proses', value: 'proses' },
  { label: 'Status Selesai', value: 'selesai' },
];

const OrdersPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const statusColor: Record<Order['statusOrder'], string> = {
    belum: 'bg-red-500',
    proses: 'bg-blue-500',
    selesai: 'bg-green-500',
  };

  const handleSearch = () => {
    // logic search
    console.log(search);
  };

  const handleFilter = () => {
    //logic filter
    console.log(filter);
  };

  const handleDetail = (id: string) => {
    router.push(`/order/detail/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`kaos-kaki/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        //logic delete

        router.push(`kaos-kaki/delete/${id}`);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <Card className='space-y-8'>
      <CardHeader>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Order</h1>
            <p className='text-gray-600'>Kelola dan lihat semua daftar order di sistem.</p>
          </div>
          <Link href='/kaos-kaki/add' className='w-full md:w-auto'>
            <Button variant='default' className='w-full md:w-auto cursor-pointer'>
              Order Baru <PlusIcon className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Card className='shadow-xl'>
          <h2 className=' p-2 text-lg font-semibold text-gray-900'>Daftar Order</h2>
          <CardHeader className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2'>
            <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
              {/* Filter */}
              <div className='w-full sm:w-64'>
                <Select instanceId='selectFilter' isMulti={false} isSearchable options={SelectFilter} onChange={(e) => setFilter(e?.value ?? '')} placeholder='Pilih Filter...' />
              </div>

              <Button variant='default' size='sm' onClick={handleFilter} className='w-full sm:w-auto cursor-pointer'>
                Filter.. <ListFilter className='ml-2 h-4 w-4' />
              </Button>
            </div>
            {/* Search */}
            <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
              <input
                type='text'
                placeholder='Cari nama Order...'
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64'
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <Button variant='default' size='sm' onClick={handleSearch} className='w-full sm:w-auto cursor-pointer'>
                Cari.. <Search className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-175'>
                <thead>
                  <tr className='border-b border-gray-200 bg-gray-50'>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>No.</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Nama Pemesan</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Nama Kaos Kaki</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Tgl Pemesanan</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Status</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderList.map((item, index) => (
                    <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-50'>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{index + 1}</td>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{item.namaPemesan}</td>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{item.namaKaosKaki}</td>
                      <td className='py-3 px-4 text-gray-900 font-medium'>
                        {new Intl.DateTimeFormat('id-ID', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        }).format(item.tglPemesanan)}
                      </td>
                      <td className='py-3 px-4  text-gray-900 font-medium'>
                        <div className={`${statusColor[item.statusOrder]} text-white w-full py-1  text-center rounded-full capitalize text-xs px-1 sm:text-base sm:px-0 `}>{item.statusOrder}</div>
                      </td>

                      <td className='py-3 px-4'>
                        <div className='flex flex-col sm:flex-row gap-2'>
                          <Button
                            variant='ghost'
                            className='cursor-pointer'
                            size='sm'
                            onClick={() => {
                              handleDetail(item.id);
                            }}
                          >
                            Detail
                          </Button>
                          <Button
                            variant='default'
                            className='cursor-pointer'
                            size='sm'
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant='destructive'
                            className='text-white cursor-pointer'
                            size='sm'
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <p className='text-gray-600 text-sm'>Menampilkan {OrderList.length} Order</p>
            <div className='flex gap-2 w-full sm:w-auto'>
              <Button variant='default' size='sm' className='flex-1 sm:flex-none'>
                Sebelumnya
              </Button>
              <Button variant='default' size='sm' className='flex-1 sm:flex-none'>
                Selanjutnya
              </Button>
            </div>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};
export default OrdersPage;
