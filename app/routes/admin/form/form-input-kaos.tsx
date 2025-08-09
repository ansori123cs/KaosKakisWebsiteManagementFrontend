import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

type KaosKakiFormType = {
  namaKaosKaki: string;
  jenis_bahan_id: string;
  data_mesin_id: string;
  keterangan: string;
  stok: number;
  last_order_date: string;
  userEdited: string;
  images?: string[]; // URL gambar lama (edit mode)
};

const initialFormState: KaosKakiFormType = {
  namaKaosKaki: '',
  jenis_bahan_id: '',
  data_mesin_id: '',
  keterangan: '',
  stok: 0,
  last_order_date: '',
  userEdited: '',
  images: [],
};

const KaosKakiForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<KaosKakiFormType>(initialFormState);
  const [newImages, setNewImages] = useState<File[]>([]); // file baru dari input
  const [previewImages, setPreviewImages] = useState<string[]>([]); // preview untuk file baru
  const [modalImg, setModalImg] = useState<string | null>(null); // gambar modal yang dibuka
  const [loading, setLoading] = useState(false);

  // Fetch data kalau edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/v1/kaoskakis/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const d = data.data; // sesuaikan struktur response
          setForm({
            namaKaosKaki: d.namaKaosKaki,
            jenis_bahan_id: d.jenis_bahan_id._id,
            data_mesin_id: d.data_mesin_id._id,
            keterangan: d.keterangan,
            stok: d.stok,
            last_order_date: d.last_order_date.split('T')[0], // format YYYY-MM-DD
            userEdited: d.userEdited,
            images: d.images || [],
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Update preview saat file input berubah
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files);

      // buat preview url
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(urls);
    }
  };

  // Bersihkan URL preview saat komponen unload untuk prevent memory leak
  useEffect(() => {
    return () => {
      previewImages.forEach(URL.revokeObjectURL);
    };
  }, [previewImages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'stok' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('namaKaosKaki', form.namaKaosKaki);
    formData.append('jenis_bahan_id', form.jenis_bahan_id);
    formData.append('data_mesin_id', form.data_mesin_id);
    formData.append('keterangan', form.keterangan);
    formData.append('stok', form.stok.toString());
    formData.append('last_order_date', form.last_order_date);
    formData.append('userEdited', form.userEdited);

    newImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const token = 'eyJhbGciOiJI...'; // Ganti dengan token asli / ambil dari context
      const url = id ? `http://localhost:3000/api/v1/kaoskakis/${id}` : 'http://localhost:3000/api/v1/kaoskakis';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Jangan set Content-Type, biarkan browser atur boundary multipart/form-data
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal mengirim data');

      const data = await res.json();
      alert('Data berhasil disimpan!');
      // Redirect misal ke dashboard
      window.location.href = '/admin/dashboard';
    } catch (error) {
      alert('Error: ' + (error as Error).message);
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4' encType='multipart/form-data'>
        <h2 className='text-xl font-semibold mb-4'>{id ? 'Edit Kaos Kaki' : 'Tambah Kaos Kaki'}</h2>

        <label className='block mb-1 font-semibold' htmlFor='namaKaosKaki'>
          Nama Kaos Kaki
        </label>
        <input type='text' id='namaKaosKaki' name='namaKaosKaki' value={form.namaKaosKaki} onChange={handleChange} required className='w-full border px-3 py-2 rounded' placeholder='SMP NEGERI 1 GRESIK' />

        <label className='block mb-1 font-semibold' htmlFor='jenis_bahan_id'>
          Jenis Bahan ID
        </label>
        <input type='text' id='jenis_bahan_id' name='jenis_bahan_id' value={form.jenis_bahan_id} onChange={handleChange} required className='w-full border px-3 py-2 rounded' placeholder='6889d49fd313f2ed79d70c8a' />

        <label className='block mb-1 font-semibold' htmlFor='data_mesin_id'>
          Data Mesin ID
        </label>
        <input type='text' id='data_mesin_id' name='data_mesin_id' value={form.data_mesin_id} onChange={handleChange} required className='w-full border px-3 py-2 rounded' placeholder='6889d4a8d313f2ed79d70c8d' />

        <label className='block mb-1 font-semibold' htmlFor='keterangan'>
          Keterangan
        </label>
        <textarea id='keterangan' name='keterangan' value={form.keterangan} onChange={handleChange} rows={3} required className='w-full border px-3 py-2 rounded' placeholder='Kaos kaki berbahan katun untuk anak sekolah' />

        <label className='block mb-1 font-semibold' htmlFor='stok'>
          Stok
        </label>
        <input type='number' id='stok' name='stok' value={form.stok} onChange={handleChange} min={0} required className='w-full border px-3 py-2 rounded' placeholder='10' />

        <label className='block mb-1 font-semibold' htmlFor='last_order_date'>
          Last Order Date
        </label>
        <input type='date' id='last_order_date' name='last_order_date' value={form.last_order_date} onChange={handleChange} required className='w-full border px-3 py-2 rounded' />

        <label className='block mb-1 font-semibold' htmlFor='userEdited'>
          User Edited
        </label>
        <input type='text' id='userEdited' name='userEdited' value={form.userEdited} onChange={handleChange} required className='w-full border px-3 py-2 rounded' placeholder='admin' />

        <label className='block mb-1 font-semibold' htmlFor='images'>
          Upload Images (boleh lebih dari satu)
        </label>
        <input type='file' id='images' name='images' onChange={handleImageChange} multiple accept='image/*' className='w-full mb-3' />

        {/* Preview gambar lama + baru */}
        <div className='flex flex-wrap gap-4 mb-4'>
          {/* Preview gambar lama (edit mode) */}
          {form.images && form.images.map((url, i) => <img key={'old-' + i} src={url} alt={`old-img-${i}`} className='w-16 h-16 object-cover rounded cursor-pointer border' onClick={() => setModalImg(url)} />)}

          {/* Preview gambar baru */}
          {previewImages.map((url, i) => (
            <img key={'new-' + i} src={url} alt={`new-img-${i}`} className='w-16 h-16 object-cover rounded cursor-pointer border' onClick={() => setModalImg(url)} />
          ))}
        </div>

        <button type='submit' className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition'>
          Simpan
        </button>
      </form>

      {/* Modal preview gambar */}
      {modalImg && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-pointer' onClick={() => setModalImg(null)}>
          <img src={modalImg} alt='preview' className='max-w-[90vw] max-h-[90vh] rounded shadow-lg' />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalImg(null);
            }}
            className='absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer'
            aria-label='Close preview'
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default KaosKakiForm;
