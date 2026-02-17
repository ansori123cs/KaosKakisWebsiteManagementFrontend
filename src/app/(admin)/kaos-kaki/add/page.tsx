'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ChevronDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

type VariasiType = {
  warna: string;
  ukuran: string;
};

type SelectType = {
  value: string;
  label: string;
};

const selectVariasiWarna: SelectType[] = [
  {
    value: '1',
    label: 'Hitam',
  },
  {
    value: '2',
    label: 'Putih 1/2 Telapak Hitam',
  },
  {
    value: '3',
    label: 'Putih Telapak Hitam Full',
  },
];

const selectVariasiUkuran: SelectType[] = [
  {
    value: '1',
    label: '19-20',
  },
  {
    value: '2',
    label: '21-22',
  },
  {
    value: '3',
    label: '23-24',
  },
];

const selectMesin: SelectType[] = [
  {
    value: '1',
    label: 'THS',
  },
  {
    value: '2',
    label: 'Yau Shen',
  },
  {
    value: '3',
    label: 'Manual',
  },
];

const selectBahan: SelectType[] = [
  {
    value: '1',
    label: 'PE 30 S',
  },
  {
    value: '2',
    label: 'Nilon',
  },
  {
    value: '3',
    label: 'Campuran',
  },
];

export default function CreateKaosKakiPage() {
  const [nama, setNama] = useState('');
  const [mesin, setMesin] = useState<string[]>([]);
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
        <CardHeader className=''>
          <Button variant='secondary' onClick={handleBack} className='w-28 mb-3 cursor-pointer'>
            <ChevronDown className='w-5 h-5 rotate-90' /> Kembali
          </Button>
          <h1 className='text-2xl font-bold text-gray-900'>Form Kaos Kaki</h1>
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

              <Select
                instanceId='selectMesin'
                isMulti
                options={selectMesin}
                onChange={(e) => {
                  const selected = e.map((opt) => opt.value);
                  setMesin(selected);
                }}
                placeholder='Pilih Mesin...'
              />
            </div>

            {/* Bahan */}
            <div>
              <label className='block mb-2 font-medium'>Bahan</label>
              <Select
                instanceId='selectBahan'
                isMulti={false}
                options={selectBahan}
                onChange={(e) => {
                  setBahan(e?.value ?? '');
                }}
                placeholder='Pilih Bahan...'
              />
            </div>

            {/* Variasi */}
            <div className='border p-3 rounded-lg shadow-sm'>
              <label className='block mb-2 font-medium'>Variasi</label>

              {variasi.map((item, index) => (
                <div key={index} className='flex gap-4 mb-3 items-center '>
                  <Select
                    instanceId={`selectWarna-${index}`}
                    value={{ label: selectVariasiWarna.find((e) => e.value === item.warna)?.label ?? 'Pilih Warna...', value: item.warna }}
                    isMulti={false}
                    options={selectVariasiWarna}
                    onChange={(e) => handleVariasiChange(index, 'warna', e?.value ?? '')}
                    placeholder='Pilih Warna...'
                    className='flex-1 px-4 py-2'
                  />

                  <Select
                    instanceId={`selectUkuran-${index}`}
                    value={{ label: selectVariasiUkuran.find((e) => e.value === item.ukuran)?.label ?? 'Pilih Ukuran...', value: item.ukuran }}
                    isMulti={false}
                    options={selectVariasiUkuran}
                    onChange={(e) => handleVariasiChange(index, 'ukuran', e?.value ?? '')}
                    placeholder='Pilih Ukuran...'
                    className='flex-1 px-4 py-2'
                  />

                  <button type='button' onClick={() => hapusVariasi(index)} className='cursor-pointer'>
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
            <div className='border p-3 rounded-lg shadow-sm'>
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
