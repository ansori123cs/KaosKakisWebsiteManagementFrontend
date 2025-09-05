import { useState } from 'react';
import Loader from '../../../../components/ui/loader/Loader';
import Swal from 'sweetalert2';
import ComponentCard from '../../../../components/common/ComponentCard';
import Button from '../../../../components/ui/button/Button';
import { Save, X } from 'lucide-react';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import { useNavigate } from 'react-router-dom';

interface IFormWarna {
  nama_jenis: string;
  kode_jenis: string;
}

const FormAddWarna = () => {
  const [form, setForm] = useState<IFormWarna>({
    nama_jenis: '',
    kode_jenis: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // TODO: panggil API simpan data di sini
      // contoh dummy delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil disimpan.',
        icon: 'success',
        confirmButtonText: 'OK',
        backdrop: true,
      }).then(() => {
        navigate('/Warna'); // kembali ke halaman list setelah sukses
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menyimpan data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Form Jenis Warna Baru'>
      <div className='container-form'>
        <div className='space-y-6'>
          <div>
            <Label htmlFor='nama_jenis'>Nama Jenis Warna</Label>
            <Input type='text' id='nama_jenis' name='nama_jenis' value={form.nama_jenis} onChange={handleChange} placeholder='Masukkan nama Warna' />
          </div>
          <div>
            <Label htmlFor='kode_jenis'>Kode Jenis Warna</Label>
            <Input type='text' id='kode_jenis' name='kode_jenis' value={form.kode_jenis} onChange={handleChange} placeholder='Masukkan kode Warna' />
          </div>
        </div>
      </div>
      <div className='container-button flex flex-row gap-2 justify-end mt-6'>
        <Button size='sm' variant='danger' onClick={() => navigate('/Warna')} startIcon={<X size={20} />}>
          Batal Kembali
        </Button>
        <Button size='sm' variant='success' onClick={handleSubmit} startIcon={<Save size={20} />}>
          Simpan
        </Button>
      </div>
    </ComponentCard>
  );
};

export default FormAddWarna;
