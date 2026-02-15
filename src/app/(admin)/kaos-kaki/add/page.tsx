'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type VariasiType = {
  warna: string;
  ukuran: string;
};

export default function CreateKaosKakiPage() {
  const [nama, setNama] = useState('');
  const [mesin, setMesin] = useState('');
  const [bahan, setBahan] = useState('');
  const [variasi, setVariasi] = useState<VariasiType[]>([{ warna: '', ukuran: '' }]);
  const [foto, setFoto] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const router = useRouter();

  // Handle Variasi Change
  const handleVariasiChange = (index: number, field: keyof VariasiType, value: string) => {
    const newVariasi = [...variasi];
    newVariasi[index][field] = value;
    setVariasi(newVariasi);
  };

  const tambahVariasi = () => {
    setVariasi([...variasi, { warna: '', ukuran: '' }]);
  };

  const hapusVariasi = (index: number) => {
    const newVariasi = variasi.filter((_, i) => i !== index);
    setVariasi(newVariasi);
  };

  // Handle Foto Upload
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFoto((prev) => [...prev, ...filesArray]);

    const previewUrls = filesArray.map((file) => URL.createObjectURL(file));

    setPreview((prev) => [...prev, ...previewUrls]);
  };

  const hapusFoto = (index: number) => {
    const newFoto = foto.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);
    setFoto(newFoto);
    setPreview(newPreview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nama,
      mesin,
      bahan,
      variasi,
      foto,
    };

    console.log(payload);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='min-h-screen w-full bg-[#F2F4F7] p-6'>
      <Card className='w-full bg-white rounded-2xl p-3'>
        <CardHeader>
          <Button variant='secondary' onClick={handleBack} className='mb-3 cursor-pointer'>
            Kembali
          </Button>
          <h1 className='text-2xl font-bold text-gray-900'>Tambah Kaos Kaki</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Nama */}
            <div>
              <label className='block mb-2 font-medium'>Nama</label>
              <input type='text' value={nama} onChange={(e) => setNama(e.target.value)} className='w-full border rounded-lg px-4 py-2' />
            </div>

            {/* Mesin */}
            <div>
              <label className='block mb-2 font-medium'>Jenis Mesin</label>
              <select value={mesin} onChange={(e) => setMesin(e.target.value)} className='w-full border rounded-lg px-4 py-2'>
                <option value=''>Pilih Mesin</option>
                <option value='yaushen'>Yaushen</option>
                <option value='ths'>THS</option>
                <option value='lonati'>Lonati</option>
              </select>
            </div>

            {/* Bahan */}
            <div>
              <label className='block mb-2 font-medium'>Bahan</label>
              <select value={bahan} onChange={(e) => setBahan(e.target.value)} className='w-full border rounded-lg px-4 py-2'>
                <option value=''>Pilih Bahan</option>
                <option value='PE 30s'>PE 30s</option>
                <option value='Cotton Combed 24s'>Cotton Combed 24s</option>
                <option value='Cotton Carded 30s'>Cotton Carded 30s</option>
              </select>
            </div>

            {/* Variasi */}
            <div>
              <label className='block mb-2 font-medium'>Variasi</label>

              {variasi.map((item, index) => (
                <div key={index} className='flex gap-4 mb-3 items-center'>
                  <select value={item.warna} onChange={(e) => handleVariasiChange(index, 'warna', e.target.value)} className='flex-1 border rounded-lg px-4 py-2'>
                    <option value=''>Pilih Warna</option>
                    <option value='hitam'>Hitam</option>
                    <option value='putih'>Putih</option>
                    <option value='hijau'>Hijau</option>
                  </select>

                  <select value={item.ukuran} onChange={(e) => handleVariasiChange(index, 'ukuran', e.target.value)} className='flex-1 border rounded-lg px-4 py-2'>
                    <option value=''>Pilih Ukuran</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                  </select>

                  <button type='button' onClick={() => hapusVariasi(index)}>
                    <X className='w-5 h-5 text-red-500 cursor-pointer hover:bg-black/10' />
                  </button>
                </div>
              ))}

              <div className='flex justify-end'>
                <Button type='button' className='mt-2 cursor-pointer' onClick={tambahVariasi}>
                  Tambah Variasi
                </Button>
              </div>
            </div>

            {/* Upload Foto */}
            <div>
              <label className='block mb-2 font-medium'>Upload Foto</label>

              <input type='file' multiple onChange={handleFotoChange} className='mb-4 p-3 bg-blue-500 hover:bg-blue-500/70 text-white text-base text-center rounded-lg h-12 cursor-pointer ' />

              <div className='grid grid-cols-3 gap-4'>
                {preview.map((src, index) => (
                  <div key={index} className='relative'>
                    <Image src={src} alt='preview' width={200} height={200} className='rounded-lg object-cover' />
                    <button type='button' onClick={() => hapusFoto(index)} className='absolute top-2 right-2 bg-white rounded-full p-1'>
                      <X className='w-4 h-4 text-red-500' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-end'>
              <Button type='submit' variant='primary' className='cursor-pointer'>
                Simpan Produk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
