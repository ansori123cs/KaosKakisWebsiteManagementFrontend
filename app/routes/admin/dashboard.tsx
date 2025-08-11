import { Book, PencilRulerIcon, Plus, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router';
import Loader from '~/components/layouts/Loader';

interface JenisBahan {
  _id: string;
  nama: string;
}

interface DataMesin {
  _id: string;
  nama: string;
}

interface KaosKaki {
  _id: string;
  namaKaosKaki: string;
  jenis_bahan_id: JenisBahan;
  data_mesin_id: DataMesin;
  keterangan: string;
  stok: number;
  last_order_date: string;
  userEdited: string;
  images: string[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<KaosKaki[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti URL ini dengan endpoint API Anda
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/v1/kaoskakis')
          .then((res) => res.json())
          .then((res) => {
            if (res.success && Array.isArray(res.data)) {
              setData(res.data); // langsung ambil array-nya

              console.log(JSON.stringify(res.data));
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const searchKaos = (name: string) => {
    alert('Cari Kaos Kaki Nama: ' + name);
  };

  const createNewKaosKaki = () => {
    // Redirect ke halaman form tambah kaos kaki baru
    navigate('/kaoskaki/new');
  };

  const editKaosKaki = (id: string) => {
    // Redirect ke halaman form edit kaos kaki, kirim id lewat param route
    navigate(`/kaoskaki/edit/${id}`);
  };
  const deleteKaosKaki = (id: string) => {
    alert('Hapus Kaos Kaki: ' + id);
  };

  if (loading) return <Loader />;

  return (
    <div className='main p-5'>
      <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
        {/* Header actions */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
          <button onClick={createNewKaosKaki} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition'>
            <Plus></Plus>
          </button>

          <div className='flex gap-2 items-center w-full md:w-auto'>
            <input
              type='text'
              id='searchNamaKaosKaki'
              className='flex-1 md:w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              placeholder='Cari Kaos Kaki...'
              required
            />
            <button onClick={() => searchKaos((document.getElementById('searchNamaKaosKaki') as HTMLInputElement)?.value)} className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition'>
              <Search></Search>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-dark-100 uppercase bg-light-100 dark:bg-gray-700 dark:text-gray-300'>
              <tr>
                <th className='px-6 py-3'>Nama Kaos Kaki</th>
                <th className='px-6 py-3'>Jenis Bahan</th>
                <th className='px-6 py-3'>Mesin</th>
                <th className='px-6 py-3'>Stok</th>
                <th className='px-6 py-3'>Keterangan</th>
                <th className='px-6 py-3 text-center'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className='bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 transition'>
                  <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>{item.namaKaosKaki}</td>
                  <td className='px-6 py-4'>{item.jenis_bahan_id?.nama || '-'}</td>
                  <td className='px-6 py-4'>{item.data_mesin_id?.nama || '-'}</td>
                  <td className='px-6 py-4'>{item.stok}</td>
                  <td className='px-6 py-4'>{item.keterangan}</td>
                  <td className='px-6 py-4 flex justify-center gap-2'>
                    <button onClick={() => editKaosKaki(item._id)} className='px-3 py-3 text-sm bg-blue-400 hover:bg-blue-500 text-white rounded transition '>
                      <Book></Book>
                    </button>
                    <button onClick={() => editKaosKaki(item._id)} className='px-3 py-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded transition '>
                      <PencilRulerIcon></PencilRulerIcon>
                    </button>
                    <button onClick={() => deleteKaosKaki(item._id)} className='px-3 py-3 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition '>
                      <Trash></Trash>
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center text-gray-400'>
                    Tidak ada data kaos kaki
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
