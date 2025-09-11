import { useState } from 'react';
import ComponentCard from '../../../components/common/ComponentCard';
import { useNavigate } from 'react-router';
import Loader from '../../../components/ui/loader/Loader';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

interface IVariasiKaos {
  ukuran: number;
  warna: number;
  jumlah: number;
}
interface IFormKaosKaki {
  nama_kaos: string;
  jenis_bahan_id: number;
  keterangan: string;
  tgl_terakhir_pesan: string;
  kode_kaos_kaki: string;
  images: File[];
  kode_mesin: number[];
  kaos_kaki_variasi: IVariasiKaos[];
}

//mock data select
const variasiMesin = [
  {
    nama_mesin: 'THS',
    kode_mesin: 1,
  },
  {
    nama_mesin: 'YauShen',
    kode_mesin: 2,
  },
  {
    nama_mesin: 'Manual',
    kode_mesin: 3,
  },
];
const variasiKaos = [
  {
    warna: 1,
    ukuran: 1,
  },
  {
    warna: 2,
    ukuran: 2,
  },
  {
    warna: 3,
    ukuran: 3,
  },
];
const variasiJenisBahan = [
  {
    nama_bahan: 'Nilon',
    value: 1,
  },
  {
    nama_bahan: 'Spandek',
    value: 2,
  },
  {
    nama_bahan: 'Campuran',
    value: 3,
  },
];
const FormAddKaosKaki = () => {
  const [form, setForm] = useState<IFormKaosKaki>({
    nama_kaos: '',
    jenis_bahan_id: 0,
    keterangan: '',
    tgl_terakhir_pesan: '',
    kode_kaos_kaki: '',
    images: [],
    kode_mesin: [],
    kaos_kaki_variasi: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // handle regular input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // handle file upload input
  const onDrop = (acceptedFiles: File[]) => {
    setForm({
      ...form,
      images: [...form.images, ...acceptedFiles],
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/svg+xml': [],
    },
  });

  //handle dynamic input mesin
  const addMesin = () => {
    setForm({
      ...form,
      kode_mesin: [...form.kode_mesin, 0],
    });
  };
  const updateMesin = (index: number, value: number) => {
    const updated = [...form.kode_mesin];
    updated[index] = value;
    setForm({ ...form, kode_mesin: updated });
  };
  const removeMesin = (index: number) => {
    setForm({
      ...form,
      kode_mesin: form.kode_mesin.filter((_, i) => i !== index),
    });
  };

  //handle dynamic input variasi kaos kaki
  const addVariasi = () => {
    setForm({
      ...form,
      kaos_kaki_variasi: [...form.kaos_kaki_variasi, { warna: 0, ukuran: 0, jumlah: 0 }],
    });
  };
  const updateVariasi = (index: number, field: keyof IVariasiKaos, value: number) => {
    const updated = [...form.kaos_kaki_variasi];
    updated[index][field] = value;
    setForm({ ...form, kaos_kaki_variasi: updated });
  };
  const removeVariasi = (index: number) => {
    setForm({
      ...form,
      kaos_kaki_variasi: form.kaos_kaki_variasi.filter((_, i) => i !== index),
    });
  };

  //handle submit form
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nama_kaos', form.nama_kaos);
      formData.append('jenis_bahan_id', String(form.jenis_bahan_id));
      formData.append('keterangan', form.keterangan);
      formData.append('tgl_terakhir_pesan', form.tgl_terakhir_pesan);
      formData.append('kode_kaos', form.kode_kaos_kaki);

      form.images.forEach((file) => {
        formData.append('images', file);
      });

      form.kode_mesin.forEach((id) => {
        formData.append('kode_mesin', String(id));
      });

      formData.append('kaos_kaki_variasi', JSON.stringify(form.kaos_kaki_variasi));

      const res = await fetch('http://localhost:3000/api/v1/kaoskakis', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token',
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal Menambahkan Data Kaos');

      Swal.fire('Berhasil', 'Data Berhasil Ditambahkan', 'success').then(() => navigate('/kaos-kaki'));
    } catch (error) {
      Swal.fire('Error', 'Terjadi Kesalahan Sistem', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Form Jenis Bahan Baru'>
      <div className='container-form'>
        <div className='space-y-6'></div>
      </div>
    </ComponentCard>
  );
};

export default FormAddKaosKaki;
