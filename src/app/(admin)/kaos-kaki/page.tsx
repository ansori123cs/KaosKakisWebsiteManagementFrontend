'use client';

import Button from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import Link from 'next/link';
import { useState } from 'react';

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

export default function KaosKakiPage() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log(search);
  };
  return (
    <Card className='space-y-8 p-6'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-gray-900'>Kaos Kaki</h1>
            <p className='text-gray-600'>Kelola dan lihat semua daftar kaos kaki sekolah/uniform di sistem.</p>
          </div>
          <Link href='/kaos-kaki/add'>
            <Button variant='primary' className='cursor-pointer'>
              Tambah Kaos Kaki
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Card className='shadow-xl'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <h2 className='text-lg font-semibold text-gray-900'>Daftar Kaos Kaki</h2>
            <div className='flex flex-row gap-2'>
              <input type='text' placeholder='Cari nama kaos kaki...' className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64' onChange={(e) => setSearch(e.target.value)} />
              <Button variant='primary' size='sm' onClick={handleSearch}>
                Cari..
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-max'>
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
                      <td className='py-3 px-4 flex gap-2'>
                        <Link
                          href={{
                            pathname: '/kaos-kaki/edit',
                            query: { id: item.id },
                          }}
                        >
                          <Button variant='warning' size='sm'>
                            Edit
                          </Button>
                        </Link>
                        <Button variant='danger' size='sm'>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className='flex items-center justify-between'>
            <p className='text-gray-600 text-sm'>Menampilkan {KaosKakiList.length} kaos kaki</p>
            <div className='flex gap-2'>
              <Button variant='primary' size='sm'>
                Sebelumnya
              </Button>
              <Button variant='primary' size='sm'>
                Selanjutnya
              </Button>
            </div>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
