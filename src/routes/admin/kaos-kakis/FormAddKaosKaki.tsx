import { useState } from 'react';
import ComponentCard from '../../../components/common/ComponentCard';
import { useNavigate } from 'react-router';
import Loader from '../../../components/ui/loader/Loader';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/input/InputField';
import Select from '../../../components/form/Select';
import Button from '../../../components/ui/button/Button';
import { Save, X } from 'lucide-react';
import TextArea from '../../../components/form/input/TextArea';
import DatePicker from '../../../components/form/date-picker';
import DropzoneComponent from '../../../components/form/form-elements/DropZone';
import ResponsiveImage from '../../../components/ui/images/ResponsiveImage';

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
    label: 'THS',
    value: 1,
  },
  {
    label: 'YauShen',
    value: 2,
  },
  {
    label: 'Manual',
    value: 3,
  },
];
const variasiKaos = [
  {
    label: '1/2 Telapak hitam',
    value: 1,
  },
  {
    label: 'Telapak Hitam Full',
    value: 2,
  },
  {
    label: 'Hitam Polos',
    value: 3,
  },
  {
    label: 'Putih Polos',
    value: 4,
  },
];
const variasiJenisBahan = [
  {
    label: 'Nilon',
    value: '1',
  },
  {
    label: 'Spandek',
    value: '2',
  },
  {
    label: 'Campuran',
    value: '3',
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  // handle regular input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    // console.log('myForm :' + JSON.stringify(form, null, ' '));
    // console.log(name + ':' + value);
  };

  const handleChangeTextArea = (value: string) => {
    setForm({
      ...form,
      keterangan: value,
    });
    // console.log('myForm :' + JSON.stringify(form, null, ' '));
    // console.log(name + ':' + value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: Number(value),
    });
    // console.log(name + ':' + value);
    // console.log('myForm :' + JSON.stringify(form, null, ' '));
  };

  const handleUploadedFile = (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);

    setForm({
      ...form,
      images: [...form.images, ...acceptedFiles],
    });
  };

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
      let formData = new FormData();
      formData.append('nama_kaos', form.nama_kaos);
      formData.append('jenis_bahan_id', String(form.jenis_bahan_id));
      formData.append('keterangan', form.keterangan);
      formData.append('tgl_terakhir_pesan', form.tgl_terakhir_pesan);
      formData.append('kode_kaos_kaki', form.kode_kaos_kaki);

      form.images.forEach((file) => {
        formData.append('images', file);
      });

      form.kode_mesin.forEach((id) => {
        formData.append('kode_mesin', String(id));
      });

      // formData.append('kaos_kaki_variasi', JSON.stringify(form.kaos_kaki_variasi));
      // const plainObject: Record<string, any> = {};
      // formData.forEach((value, key) => {
      //   plainObject[key] = value;
      // });
      // console.log(JSON.stringify(plainObject, null, 2));

      // const res = await fetch('http://localhost:3000/api/v1/kaoskakis', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: 'Bearer token',
      //   },
      //   body: formData,
      // });

      // if (!res.ok) throw new Error('Gagal Menambahkan Data Kaos');

      // Swal.fire('Berhasil', 'Data Berhasil Ditambahkan', 'success').then(() => navigate('/kaos-kaki'));
    } catch (error) {
      Swal.fire('Error', 'Terjadi Kesalahan Sistem', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Form Kaos Kaki Baru Baru'>
      <div className='container-form'>
        <div className='space-y-6'>
          <div>
            <Label htmlFor='nama_kaos'>Nama Kaos Kaki</Label>
            <Input type='text' id='nama_kaos' name='nama_kaos' value={form.nama_kaos} onChange={handleChange} placeholder='Masukkan Nama Kaos Kaki' />
          </div>
          <div>
            <Label htmlFor='kode_kaos_kaki'>Kode Kaos Kaki</Label>
            <Input type='text' id='kode_kaos_kaki' name='kode_kaos_kaki' value={form.kode_kaos_kaki} onChange={handleChange} placeholder='Masukkan Kode Kaos Kaki' />
          </div>
          <div>
            <Label>Pilih Bahan</Label>
            <Select options={variasiJenisBahan} placeholder='Select Option' onChange={handleSelectChange} name='jenis_bahan_id' id='jenis_bahan_id' className='dark:bg-dark-900' />
          </div>
          <div>
            <DatePicker
              id='date-picker'
              label='Tanggal terakhir Order'
              placeholder='Select a date'
              onChange={(dates, currentDateString) => {
                setForm({
                  ...form,
                  tgl_terakhir_pesan: currentDateString,
                });
                console.log({ dates, currentDateString });
              }}
            />
          </div>
          <div>
            <Label>Keterangan</Label>
            <TextArea value={form.keterangan || ''} onChange={handleChangeTextArea} rows={3} placeholder='Masukkan Keterangan' />
          </div>
          <div>
            <Label htmlFor='foto'>Foto</Label>
            <DropzoneComponent onFilesIploaded={handleUploadedFile} />
          </div>
          <div>
            {uploadedFiles.length > 0 && (
              <div className='preview'>
                <Label>Preview Foto</Label>
                {uploadedFiles.map((file, index) => (
                  <div key={index}>
                    {file.name}
                    <ResponsiveImage src={URL.createObjectURL(file)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='container-button flex flex-row gap-2 justify-end mt-6'>
          <Button size='sm' variant='danger' onClick={() => navigate('/bahan')} startIcon={<X size={20} />}>
            Batal Kembali
          </Button>
          <Button size='sm' variant='success' onClick={handleSubmit} startIcon={<Save size={20} />}>
            Simpan
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default FormAddKaosKaki;
