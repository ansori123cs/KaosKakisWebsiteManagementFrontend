import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../../components/ui/loader/Loader';
import Swal from 'sweetalert2';
import ComponentCard from '../../../../components/common/ComponentCard';
import Button from '../../../../components/ui/button/Button';
import { Save, X } from 'lucide-react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';

interface IFormBahan {
  nama_jenis: string;
  kode_jenis: string;
}

const FormEditBahan = () => {
  const { id } = useParams<{ id: string }>(); // ambil id dari URL
  const [form, setForm] = useState<IFormBahan>({
    nama_jenis: '',
    kode_jenis: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ambil data existing
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: ganti dengan API asli
        // contoh dummy data sesuai ID
        const dummyData = {
          nama_jenis: 'Nilon 30s',
          kode_jenis: 'n30s',
        };

        setForm(dummyData);
      } catch (error) {
        Swal.fire('Error!', 'Gagal mengambil data.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // TODO: panggil API update data di sini
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulasi delay

      Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil diperbarui.',
        icon: 'success',
        confirmButtonText: 'OK',
        backdrop: true,
      }).then(() => {
        navigate('/bahan'); // kembali ke halaman list
      });
    } catch (error) {
      Swal.fire('Error!', 'Terjadi kesalahan saat menyimpan perubahan.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Form Edit Jenis Bahan'>
      <div className='container-form'>
        <div className='space-y-6'>
          <div>
            <Label htmlFor='nama_jenis'>Nama Jenis Bahan</Label>
            <Input type='text' id='nama_jenis' name='nama_jenis' value={form.nama_jenis} onChange={handleChange} placeholder='Masukkan nama bahan' />
          </div>
          <div>
            <Label htmlFor='kode_jenis'>Kode Jenis Bahan</Label>
            <Input type='text' id='kode_jenis' name='kode_jenis' value={form.kode_jenis} onChange={handleChange} placeholder='Masukkan kode bahan' />
          </div>
        </div>
      </div>
      <div className='container-button flex flex-row gap-2 justify-end mt-6'>
        <Button size='sm' variant='danger' onClick={() => navigate('/bahan')} startIcon={<X size={20} />}>
          Batal Kembali
        </Button>
        <Button size='sm' variant='success' onClick={handleSubmit} startIcon={<Save size={20} />}>
          Simpan Perubahan
        </Button>
      </div>
    </ComponentCard>
  );
};

export default FormEditBahan;
