import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Loader from '~/components/layouts/Loader';
import CustomInput from '~/components/CustomInput';
import { CustomButton } from '~/components';
import Select from 'react-select';
import type { SingleValue, MultiValue } from 'react-select';

type OptionType = { value: string; label: string };

interface ApiKaosKaki {
  namaKaosKaki: string;
  jenis_bahan_id: { _id: string };
  data_mesin_id: { _id: string }[] | { _id: string };
  keterangan: string;
  stok: number;
  last_order_date: string;
  userEdited: string;
  images?: string[];
}

type KaosKakiFormType = {
  namaKaosKaki: string;
  jenis_bahan_id: string;
  data_mesin_id: string[];
  keterangan: string;
  stok: number;
  last_order_date: string;
  userEdited: string;
  images?: string[];
};

const initialFormState: KaosKakiFormType = {
  namaKaosKaki: '',
  jenis_bahan_id: '',
  data_mesin_id: [],
  keterangan: '',
  stok: 0,
  last_order_date: '',
  userEdited: '',
  images: [],
};

const bahanOptions: OptionType[] = [
  { value: 'spandek', label: 'Spandek' },
  { value: 'nilon', label: 'Nilon' },
  { value: 'campuran', label: 'Campuran' },
  { value: 'acrelix', label: 'Acrelix' },
  { value: 'polyster', label: 'Polyster' },
];

const mesinOptions: OptionType[] = [
  { value: 'ths', label: 'THS' },
  { value: 'usb144', label: 'USB 144' },
  { value: 'usb120', label: 'USB 120' },
  { value: 'manual', label: 'Manual' },
];

const KaosKakiForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<KaosKakiFormType>(initialFormState);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fetch data edit mode
  useEffect(() => {
    if (!isClient || !id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/v1/kaoskakis/${id}`);
        const { data: d }: { data: ApiKaosKaki } = await res.json();
        setForm({
          namaKaosKaki: d.namaKaosKaki,
          jenis_bahan_id: d.jenis_bahan_id._id,
          data_mesin_id: Array.isArray(d.data_mesin_id) ? d.data_mesin_id.map((m) => m._id) : [d.data_mesin_id._id],
          keterangan: d.keterangan,
          stok: d.stok,
          last_order_date: d.last_order_date.split('T')[0],
          userEdited: d.userEdited,
          images: d.images || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient, id]);

  // Update preview saat file input berubah
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Bersihkan URL preview
  useEffect(() => {
    return () => previewImages.forEach(URL.revokeObjectURL);
  }, [previewImages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'stok' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: keyof KaosKakiFormType, value: SingleValue<OptionType> | MultiValue<OptionType>) => {
    if (Array.isArray(value)) {
      setForm((prev) => ({ ...prev, [name]: value.map((v) => v.value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value?.value || '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    (Object.entries(form) as [keyof KaosKakiFormType, unknown][]).forEach(([key, val]) => {
      if (key === 'images') return;
      if (Array.isArray(val)) {
        val.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, String(val));
      }
    });

    newImages.forEach((file) => formData.append('images', file));

    try {
      const token = 'eyJhbGciOiJI...'; // TODO: ambil dari context/auth
      const url = id ? `http://localhost:3000/api/v1/kaoskakis/${id}` : 'http://localhost:3000/api/v1/kaoskakis';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal mengirim data');
      alert('Data berhasil disimpan!');
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Error: ' + (error as Error).message);
      console.error(error);
    }
  };

  useEffect(() => setIsClient(true), []);

  if (loading) return <Loader />;

  return (
    <div className='w-full p-3'>
      <form onSubmit={handleSubmit} className='w-full m-3 mx-auto p-6 bg-white rounded-lg shadow-md space-y-4' encType='multipart/form-data'>
        {/* Header */}
        <div className='w-full flex flex-row'>
          <div className='w-1/2'>
            <h2 className='text-xl font-semibold mb-4'>{id ? 'Edit Kaos Kaki' : 'Tambah Kaos Kaki'}</h2>
          </div>
          <CustomButton text='Kembali' variant='danger' type='button' onClick={() => navigate('/dashboard')} />
        </div>

        {/* Nama & Stok */}
        <div className='w-full flex lg:flex-row sm:flex:col gap-3'>
          <CustomInput label='Nama Kaos Kaki' id='namaKaosKaki' name='namaKaosKaki' value={form.namaKaosKaki} onChange={handleChange} required placeholder='Nama Kaos Kaki' />
          <CustomInput label='Stok Yang Ada' id='stok' name='stok' type='number' value={form.stok} onChange={handleChange} required placeholder='Stok Yang Ada' />
        </div>

        {/* Select Jenis Bahan & Mesin */}
        <div className='w-full flex lg:flex-row sm:flex:col gap-3'>
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Jenis Bahan</label>
            <Select options={bahanOptions} value={bahanOptions.find((opt) => opt.value === form.jenis_bahan_id) || null} onChange={(val) => handleSelectChange('jenis_bahan_id', val)} />
          </div>
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Jenis Mesin</label>
            <Select isMulti options={mesinOptions} value={mesinOptions.filter((opt) => form.data_mesin_id.includes(opt.value))} onChange={(val) => handleSelectChange('data_mesin_id', val)} />
          </div>
        </div>

        {/* Keterangan */}
        <div className='w-full'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Keterangan</label>
          <textarea
            id='keterangan'
            name='keterangan'
            value={form.keterangan}
            onChange={handleChange}
            rows={3}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100'
            placeholder='Kaos kaki berbahan katun untuk anak sekolah'
          />
        </div>

        {/* User Edited & Last Order */}
        <div className='w-full flex lg:flex-row sm:flex:col gap-3'>
          <CustomInput label='User yang Menginput' id='userEdited' name='userEdited' value={form.userEdited} onChange={handleChange} required disabled placeholder='User Yang Menginput' />
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Last Order Date</label>
            <input
              type='date'
              id='last_order_date'
              name='last_order_date'
              value={form.last_order_date}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer'
            />
          </div>
        </div>

        {/* Upload & Preview */}
        <label className='block mb-1 font-semibold'>Upload Images (boleh lebih dari satu)</label>
        <input type='file' onChange={handleImageChange} multiple accept='image/*' className='w-full mb-3' />
        <div className='flex flex-wrap gap-4 mb-4'>
          {form.images?.map((url, i) => (
            <img key={'old-' + i} src={`http://localhost:3000${url}`} alt='' className='w-16 h-16 object-cover rounded cursor-pointer border' onClick={() => setModalImg(`http://localhost:3000${url}`)} />
          ))}
          {previewImages.map((url, i) => (
            <img key={'new-' + i} src={url} alt='' className='w-16 h-16 object-cover rounded cursor-pointer border' onClick={() => setModalImg(url)} />
          ))}
        </div>

        <CustomButton text='Simpan' type='submit' />
      </form>

      {/* Modal Preview */}
      {modalImg && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-pointer' onClick={() => setModalImg(null)}>
          <img src={modalImg} alt='preview' className='max-w-[90vw] max-h-[90vh] rounded shadow-lg' />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalImg(null);
            }}
            className='absolute top-5 right-5 text-white text-3xl font-bold'
            aria-label='Close preview'
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default KaosKakiForm;
