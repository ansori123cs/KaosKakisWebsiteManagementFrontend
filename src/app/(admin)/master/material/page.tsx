'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { PlusIcon, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

const KaosKakiList = [
  {
    id: 1,
    kode: 'kode-asd-fas',
    nama: 'PE 30 S',
  },
  {
    id: 2,
    kode: 'kode-asd-fas',
    nama: 'cotton combed 24s',
  },
  {
    id: 3,
    kode: 'kode-asd-fas',
    nama: 'PE 24 s',
  },
];

const MasterMaterialPage = () => {
  const [search, setSearch] = useState('');
  const [nama, setNama] = useState('');
  const [kode, setKode] = useState('');
  const [edit, setEdit] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const router = useRouter();

  const handleSearch = () => {
    // logic search
    console.log(search);
  };

  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (edit) {
          console.log('nama : ', nama);
          console.log('kode : ', kode);
        } else {
          //logic save master
          console.log('nama : ', nama);
          console.log('kode : ', kode);
        }

        setIsPreviewOpen(false);
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

  const handleEdit = (id: number) => {
    setIsPreviewOpen(true);
    //logic edit, fetch data by id and set to form

    const selectedMaterial = KaosKakiList.find((item) => item.id === id);
    if (selectedMaterial) {
      setNama(selectedMaterial.nama);
      setKode(selectedMaterial.kode);
      setEdit(true);
    }
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

        router.push(`/master/bahan/${id}`);

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
            <h1 className='text-3xl font-bold text-gray-900'>Master Bahan</h1>
            <p className='text-gray-600'>Kelola dan lihat semua daftar Bahan</p>
          </div>
          <Button variant='default' className='w-full md:w-auto cursor-pointer' onClick={() => setIsPreviewOpen(true)}>
            Tambah Bahan <PlusIcon className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Card className='shadow-xl'>
          <h2 className=' p-2 text-lg font-semibold text-gray-900'>Daftar Bahan</h2>
          <CardHeader className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2'>
            {/* Search */}
            <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
              <input
                type='text'
                placeholder='Cari Bahan...'
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
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>No</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Nama Bahan</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Kode</th>
                    <th className='text-left py-3 px-4 text-gray-700 font-semibold'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {KaosKakiList.map((item, index) => (
                    <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-50'>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{index + 1}</td>
                      <td className='py-3 px-4 text-gray-900 font-medium'>{item.nama}</td>
                      <td className='py-3 px-4 text-gray-600'>{item.kode}</td>
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

      {isPreviewOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4'>
          {/* Overlay Click Close */}
          <div className='absolute inset-0' onClick={() => setIsPreviewOpen(false)} />

          {/* Modal Content */}
          <div className='relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Preview Data</h2>
              <button onClick={() => setIsPreviewOpen(false)} className='text-gray-500 hover:text-black text-xl cursor-pointer'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='space-y-3 text-sm'>
              <div>
                <label className='block mb-2 font-medium'>Nama</label>
                <input type='text' value={nama} onChange={(e) => setNama(e.target.value)} className='w-full border rounded-lg px-4 py-2' />
              </div>

              <div>
                <label className='block mb-2 font-medium'>Kode</label>
                <input type='text' value={kode} onChange={(e) => setKode(e.target.value)} className='w-full border rounded-lg px-4 py-2' />
              </div>

              {/* Tambahkan field lain jika ada */}
            </div>

            <div className='flex justify-end mt-6 gap-3'>
              <Button variant='secondary' className='cursor-pointer' onClick={() => setIsPreviewOpen(false)}>
                Tutup
              </Button>

              <Button variant='default' className='cursor-pointer' onClick={handleSubmit}>
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default MasterMaterialPage;
