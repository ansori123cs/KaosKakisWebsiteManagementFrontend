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
interface JenisMesinResponse {
  success: boolean;
  message: string;
  data: {
    jenisMesinList: JenisMesin[];
    pagination: Pagination;
  };
}

interface JenisMesin {
  id: number;
  nama: string;
  kode_Mesin: string;
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
const MesinResponse: JenisMesinResponse = {
  success: true,
  message: 'List Jenis Mesin berhasil diambil',
  data: {
    jenisMesinList: [
      { id: 3, nama: 'THS', kode_Mesin: 'ths', status: 1 },
      { id: 4, nama: 'Manual', kode_Mesin: 'manual', status: 1 },
      { id: 5, nama: 'YauShen', kode_Mesin: 'ys', status: 1 },
      { id: 6, nama: 'YauShen', kode_Mesin: 'YauShen', status: 1 },
      { id: 7, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
      { id: 8, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
      { id: 9, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
      { id: 10, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
      { id: 11, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
      { id: 12, nama: 'YauShen', kode_Mesin: 'YauShen', status: 0 },
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

const MesinPage = () => {
  // ✅ default state
  const [dataMesin, setDataMesin] = useState<JenisMesin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [position, setPosition] = useState(1); // currentPage mulai dari 1
  const [searchKey, setSearchKey] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const getDataMesin = () => {
      setIsLoading(true);

      // ✅ ambil data dari dummy
      setDataMesin(MesinResponse.data.jenisMesinList);
      setIsNext(MesinResponse.data.pagination.hasNextPage);
      setIsPrev(MesinResponse.data.pagination.hasPreviousPage);
      setPosition(MesinResponse.data.pagination.currentPage);
      setTotalPage(MesinResponse.data.pagination.totalPages);

      setIsLoading(false);
    };

    getDataMesin();
  }, []);

  const addMesin = () => {
    navigate('/Mesin/new');
  };
  const searchMesin = () => {
    Swal.fire({
      title: 'Data Tidak Ditemukan',
      text: 'Coba Cari Dengan Kata Kunci Lain : ' + searchKey,
      icon: 'question',
      confirmButtonText: 'OK',
      backdrop: true, // Pastikan ada backdrop
    });
  };
  const editMesin = (id: number) => {
    navigate('/Mesin/edit/' + id);
  };
  const deleteMesin = (id: number) => {
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
    <ComponentCard title='Tabel Mesin'>
      {/* Header atas: tombol tambah + search */}
      <div className='flex justify-between'>
        <Button size='sm' variant='success' onClick={addMesin} startIcon={<Plus size={20} />}>
          Tambah Baru
        </Button>

        <div className='flex flex-row'>
          <Input type='text' placeholder='Cari Mesin' id='searchBar' onChange={(e) => setSearchKey(e.target.value)} />
          <Button size='sm' className='ms-2' onClick={searchMesin} startIcon={<Search size={20} />}>
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
                <TableCell isHeader>Nama Mesin</TableCell>
                <TableCell isHeader>Kode Mesin</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataMesin.map((item, index) => (
                <TableRow key={item.id} className='hover:bg-gray-100'>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 text-center'>{index + 1}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>{item.nama}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>{item.kode_Mesin}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5  border-gray-200 '>
                    <div className='flex items-center gap-2'>
                      <Button size='sm' variant='warning' onClick={() => editMesin(item.id)} startIcon={<PencilLine size={20} />}>
                        Edit
                      </Button>
                      <Button size='sm' variant='danger' onClick={() => deleteMesin(item.id)} startIcon={<Trash size={20} />}>
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

export default MesinPage;
