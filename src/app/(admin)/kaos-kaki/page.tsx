'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { ListFilter, PlusIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

const KaosKakiList = [
  {
    id: 1,
    nama_kaos: 'smp n 11 surabaya',
    mesin: ['yaushen', 'ths'],
    bahan: 'PE 30 s',
  },
  {
    id: 2,
    nama_kaos: 'sma n 5 surabaya',
    mesin: ['yaushen', 'lonati'],
    bahan: 'cotton combed 24s',
  },
  {
    id: 3,
    nama_kaos: 'sd al hikmah surabaya',
    mesin: ['ths'],
    bahan: 'PE 24 s',
  },
  {
    id: 4,
    nama_kaos: 'smpn 1 sidoarjo',
    mesin: ['yaushen', 'ths'],
    bahan: 'cotton combed 30s',
  },
  {
    id: 5,
    nama_kaos: 'sma muhammadiyah 2 surabaya',
    mesin: ['lonati'],
    bahan: 'PE 20 s',
  },
  {
    id: 6,
    nama_kaos: 'sdn ketabang surabaya',
    mesin: ['yaushen'],
    bahan: 'cotton carded 24s',
  },
  {
    id: 7,
    nama_kaos: 'smp kristen petra 1',
    mesin: ['ths', 'lonati'],
    bahan: 'cotton combed 28s',
  },
  {
    id: 8,
    nama_kaos: 'sma n 2 gresik',
    mesin: ['yaushen'],
    bahan: 'PE 30 s',
  },
  {
    id: 9,
    nama_kaos: 'sd islam terpadu nurul fikri',
    mesin: ['ths'],
    bahan: 'cotton combed 20s',
  },
  {
    id: 10,
    nama_kaos: 'smpn 3 malang',
    mesin: ['yaushen', 'lonati'],
    bahan: 'cotton carded 30s',
  },
];

const selectCategory = [
  { label: 'Sekolah TK', value: 'TK' },
  { label: 'Sekolah SD', value: 'SD' },
  { label: 'Sekolah SMP', value: 'SMP' },
  { label: 'Sekolah SMA', value: 'SMA' },
  { label: 'Sekolah CAMPUR', value: 'CAMPUR' },
  { label: 'UMUM', value: 'UMUM' },
];

const KaosKakiPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // logic search
    console.log(search);
  };

  const handleFilter = () => {
    //logic filter
    console.log(filter);
  };

  const handleEdit = (id: number) => {
    router.push(`kaos-kaki/edit/${id}`);
  };

  const handleDelete = (id: number) => {
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
    <Card className='space-y-8 p-6'>
      <CardHeader>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Kaos Kaki</h1>
            <p className='text-gray-600'>Kelola dan lihat semua daftar kaos kaki sekolah/uniform di sistem.</p>
          </div>
          <Link href='/kaos-kaki/add' className='w-full md:w-auto'>
            <Button variant='default' className='w-full md:w-auto cursor-pointer'>
              Tambah Kaos Kaki <PlusIcon className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Card className='shadow-xl'>
          <h2 className=' p-2 text-lg font-semibold text-gray-900'>Daftar Kaos Kaki</h2>
          <CardHeader className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2'>
            <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
              {/* Filter */}
              <div className='w-full sm:w-64'>
                <Select instanceId='selectFilter' isMulti={false} isSearchable options={selectCategory} onChange={(e) => setFilter(e?.value ?? '')} placeholder='Pilih Filter...' />
              </div>

              <Button variant='default' size='sm' onClick={handleFilter} className='w-full sm:w-auto cursor-pointer'>
                Filter.. <ListFilter className='ml-2 h-4 w-4' />
              </Button>
            </div>
            {/* Search */}
            <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
              <input
                type='text'
                placeholder='Cari nama kaos kaki...'
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
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Nama Kaos</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Mesin</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Bahan</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {KaosKakiList.map((item) => (
                    <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-50'>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{item.nama_kaos}</td>
                      <td className='py-3 px-4 text-gray-600'>
                        <div className='flex flex-wrap gap-1'>
                          {item.mesin.map((m, idx) => (
                            <span key={idx} className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'>
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className='py-3 px-4 text-gray-600'>{item.bahan}</td>
                      <td className='py-3 px-4'>
                        <div className='flex flex-col sm:flex-row gap-2'>
                          <Button
                            variant='default'
                            size='sm'
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant='destructive'
                            className='text-white'
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
            <p className='text-gray-600 text-sm'>Menampilkan {KaosKakiList.length} kaos kaki</p>
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
export default KaosKakiPage;
