import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../../../../components/common/ComponentCard';
import Button from '../../../../components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../../../components/ui/table';
import Loader from '../../../../components/ui/loader/Loader';
import Input from '../../../../components/form/input/InputField';
import { PencilLine, Plus, Search, Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

// Interface response
interface JenisUkuranResponse {
  success: boolean;
  message: string;
  data: {
    jenisUkuranList: JenisUkuran[];
    pagination: Pagination;
  };
}

interface JenisUkuran {
  id: number;
  nama: string;
  kode_Ukuran: string;
  status: number; // 0 = tidak aktif, 1 = aktif
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Dummy data
const UkuranResponse: JenisUkuranResponse = {
  success: true,
  message: 'List Jenis Ukuran berhasil diambil',
  data: {
    jenisUkuranList: [
      { id: 3, nama: '15-16', kode_Ukuran: 'xs', status: 1 },
      { id: 4, nama: '17-18', kode_Ukuran: 's', status: 1 },
      { id: 5, nama: '19-20', kode_Ukuran: 'm', status: 1 },
      { id: 6, nama: '21-22', kode_Ukuran: 'l', status: 1 },
      { id: 7, nama: '23-24', kode_Ukuran: 'xl', status: 0 },
      { id: 8, nama: '25-26', kode_Ukuran: 'xxl', status: 0 },
      { id: 9, nama: '27-28', kode_Ukuran: 'xxxl', status: 0 },
      { id: 10, nama: 'tk 15-16', kode_Ukuran: 'tk-s', status: 0 },
      { id: 11, nama: 'tk 17-18', kode_Ukuran: 'tk-m', status: 0 },
      { id: 12, nama: 'tk 19-20', kode_Ukuran: 'tk-l', status: 0 },
    ],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 5,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

const UkuranPage = () => {
  // ✅ default state
  const [dataUkuran, setDataUkuran] = useState<JenisUkuran[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [position, setPosition] = useState(1); // currentPage mulai dari 1
  const [searchKey, setSearchKey] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const getDataUkuran = () => {
      setIsLoading(true);

      // ✅ ambil data dari dummy
      setDataUkuran(UkuranResponse.data.jenisUkuranList);
      setIsNext(UkuranResponse.data.pagination.hasNextPage);
      setIsPrev(UkuranResponse.data.pagination.hasPreviousPage);
      setPosition(UkuranResponse.data.pagination.currentPage);
      setTotalPage(UkuranResponse.data.pagination.totalPages);

      setIsLoading(false);
    };

    getDataUkuran();
  }, []);

  const addUkuran = () => {
    navigate('/Ukuran/new');
  };
  const searchUkuran = () => {
    Swal.fire({
      title: 'Data Tidak Ditemukan',
      text: 'Coba Cari Dengan Kata Kunci Lain : ' + searchKey,
      icon: 'question',
      confirmButtonText: 'OK',
      backdrop: true, // Pastikan ada backdrop
    });
  };
  const editUkuran = (id: number) => {
    navigate('/Ukuran/edit/' + id);
  };
  const deleteUkuran = (id: number) => {
    Swal.fire({
      title: 'Data Berhasil Di Hapus',
      text: 'Data yang di Hapus :' + id,
      icon: 'success',
      confirmButtonText: 'OK',
      backdrop: true, // Pastikan ada backdrop
    });
  };

  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Tabel Ukuran'>
      {/* Header atas: tombol tambah + search */}
      <div className='flex justify-between'>
        <Button size='sm' variant='success' onClick={addUkuran} startIcon={<Plus size={20} />}>
          Tambah Baru
        </Button>

        <div className='flex flex-row'>
          <Input type='text' placeholder='Cari Ukuran' id='searchBar' onChange={(e) => setSearchKey(e.target.value)} />
          <Button size='sm' className='ms-2' onClick={searchUkuran} startIcon={<Search size={20} />}>
            Cari
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-xl  border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-4'>
        <div className='max-w-full overflow-x-auto'>
          <Table>
            <TableHeader className='border-b text-left border-gray-100 dark:border-white/[0.05]'>
              <TableRow>
                <TableCell isHeader className='text-center'>
                  No
                </TableCell>
                <TableCell isHeader>Nama Ukuran</TableCell>
                <TableCell isHeader>Kode Ukuran</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataUkuran.map((item, index) => (
                <TableRow key={item.id} className='hover:bg-gray-100'>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 text-center'>{index + 1}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>{item.nama}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>{item.kode_Ukuran}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>
                    <div className='flex items-center gap-2'>
                      <Button size='sm' variant='warning' onClick={() => editUkuran(item.id)} startIcon={<PencilLine size={20} />}>
                        Edit
                      </Button>
                      <Button size='sm' variant='danger' onClick={() => deleteUkuran(item.id)} startIcon={<Trash size={20} />}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className='flex justify-end mt-3'>
        <nav aria-label='Page navigation'>
          <ul className='flex items-center -space-x-px h-8 text-sm'>
            {/* Prev */}
            {isPrev && (
              <li>
                <a href='#' className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border rounded-s-lg hover:bg-gray-100'>
                  Prev
                </a>
              </li>
            )}

            {/* Page numbers */}
            {Array.from({ length: totalPage }, (_, i) => (
              <li key={i}>
                <a
                  href='#'
                  className={`flex items-center justify-center px-3 h-8 leading-tight border 
                    ${position === i + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100'}`}
                >
                  {i + 1}
                </a>
              </li>
            ))}

            {/* Next */}
            {isNext && (
              <li>
                <a href='#' className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border rounded-e-lg hover:bg-gray-100'>
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </ComponentCard>
  );
};

export default UkuranPage;
