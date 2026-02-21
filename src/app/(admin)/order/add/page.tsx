'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import Select from 'react-select';

type Variasi = {
  warna: string;
  ukuran: string;
  jumlah: number;
};

type KaosKakiOrder = {
  kode: number;
  nama: string;
  foto: string[];
};

type Order = {
  namaPemesan: string;
  kaosKakai: KaosKakiOrder;
  variasi: Variasi[];
};

type SelectOption = {
  label: string;
  value: string;
};

// from api
const selectWarna: SelectOption[] = [
  { label: 'Putih 1/2 Telapak Hitam', value: '4' },
  { label: 'Hitam', value: '5' },
];

const selectUkuran: SelectOption[] = [
  { label: '21-22 / L', value: '4' },
  { label: '23-24 / XL', value: '5' },
  { label: '26-25 / XXL', value: '6' },
];

const fetchKaosKakiOrder: KaosKakiOrder[] = [
  { kode: 1, nama: 'SMP 1 Surabaya', foto: ['url1', 'url2'] },
  { kode: 4, nama: 'SMP 2 Surabaya', foto: ['url1', 'url2'] },
  { kode: 2, nama: 'SMP 1 Gresik', foto: ['url1', 'url2'] },
  { kode: 3, nama: 'SMP 1 Malang', foto: ['url1', 'url2'] },
  { kode: 5, nama: 'SMP 6 Malang', foto: ['url1', 'url2'] },
];

const AddOrderPage = () => {
  const [namaPemesan, setNamaPemesan] = React.useState('');
  const [searchKaosKaki, setSearchKaosKaki] = React.useState('');
  const [kaosKaki, setKaosKaki] = React.useState<KaosKakiOrder[]>([]);
  const [variasi, setVariasi] = React.useState<Variasi[]>([]);
  const [selectOptWarna, setSelectOptWarna] = React.useState<SelectOption[]>([]);
  const [selectOptUkuran, setSelectOptUkuran] = React.useState<SelectOption[]>([]);

  useEffect(() => {
    const getSelectOption = async () => {
      setSelectOptUkuran(selectUkuran);
      setSelectOptWarna(selectWarna);
    };
    getSelectOption();
  }, []);

  useEffect(() => {
    const fetchDataKaosKakiOrder = async (e: string) => {
      //fetch backend kaos kaki order with photo
      setKaosKaki(fetchKaosKakiOrder.filter((item) => item.nama.toLowerCase().includes(e.toLowerCase())));
    };
    const searcFilter = async () => {
      if (searchKaosKaki !== '') {
        fetchDataKaosKakiOrder(searchKaosKaki);
      } else {
        setKaosKaki([]);
      }
    };
    searcFilter();
  }, [searchKaosKaki]);

  const hapusVariasi = (index: number) => {
    const newVariasi = variasi.filter((_, i) => i !== index);
    setVariasi(newVariasi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      namaPemesan,
      kaosKaki,
      variasi,
    };

    console.log(payload);
  };

  return (
    <div className='min-h-screen w-full bg-[#F2F4F7] p-6'>
      <Card className='w-full bg-white rounded-2xl'>
        <CardHeader className='border-b-2 border-gray-200 p-6'>
          <h1 className='text-2xl font-bold mb-4'>Order Baru</h1>
        </CardHeader>
        <CardContent className='p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* NamaPemesan */}
            <div>
              <label className='block mb-2 font-medium'>Nama Pemesan</label>
              <input type='text' value={namaPemesan} onChange={(e) => setNamaPemesan(e.target.value)} className='w-full border rounded-lg px-4 py-2' />
            </div>
            {/* KaosKakai */}
            <div>
              <label className='block mb-2 font-medium'>Kaos Kakai</label>
              <input type='text' value={searchKaosKaki} onChange={(e) => setSearchKaosKaki(e.target.value)} className='w-full border rounded-lg px-4 py-2' />
              {kaosKaki.map((item, index) => (
                <div key={index}>
                  <p>{item.kode}</p>
                  <p>{item.nama}</p>
                  <p>{item.foto}</p>
                </div>
              ))}
            </div>
            {/* Variasi */}
            <div>
              <label className='block mb-2 font-medium'>Variasi</label>
              {variasi.map((v, index) => (
                <div key={index} className='mb-4 border p-4 rounded-lg'>
                  <div className='flex flex-col md:flex-row gap-2'>
                    <Select
                      instanceId={`selectWarna-${index}`}
                      value={{
                        label: selectOptWarna.find((e) => e.value === v.warna)?.label ?? 'Pilih Warna...',
                        value: v.warna,
                      }}
                      isMulti={false}
                      isSearchable={true}
                      options={selectOptWarna}
                      onChange={(e) => {
                        const newVariasi = [...variasi];
                        newVariasi[index].warna = e?.value ?? '';
                        setVariasi(newVariasi);
                      }}
                      placeholder='Pilih Warna...'
                      className='w-full'
                    />
                    <Select
                      instanceId={`selectUkuran-${index}`}
                      value={{
                        label: selectOptUkuran.find((e) => e.value === v.ukuran)?.label ?? 'Pilih Ukuran...',
                        value: v.ukuran,
                      }}
                      isMulti={false}
                      isSearchable={true}
                      options={selectOptUkuran}
                      onChange={(e) => {
                        const newVariasi = [...variasi];
                        newVariasi[index].ukuran = e?.value ?? '';
                        setVariasi(newVariasi);
                      }}
                      placeholder='Pilih Ukuran...'
                      className='w-full'
                    />

                    <input
                      type='number'
                      placeholder='Jumlah'
                      value={v.jumlah}
                      onChange={(e) => {
                        const newVariasi = [...variasi];
                        newVariasi[index].jumlah = parseInt(e.target.value);
                        setVariasi(newVariasi);
                      }}
                      className='w-full border rounded-lg px-4 py-2'
                    />
                    <button type='button' onClick={() => hapusVariasi(index)} className='flex justify-end p-2 rounded-lg cursor-pointer hover:bg-red-50 transition'>
                      <X className='w-5 h-5 text-red-500 border ' />
                    </button>
                  </div>
                  <div className='flex justify-end md:justify-center'></div>
                </div>
              ))}
              <Button type='button' variant='default' onClick={() => setVariasi([...variasi, { warna: '', ukuran: '', jumlah: 0 }])}>
                Tambah Variasi
              </Button>
            </div>
            <Button type='submit' variant='default'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrderPage;
