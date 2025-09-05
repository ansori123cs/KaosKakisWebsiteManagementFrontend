import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../../../components/common/ComponentCard';
import Button from '../../../components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../../components/ui/table';
import Loader from '../../../components/ui/loader/Loader';
import Input from '../../../components/form/input/InputField';
import { PencilLine, Plus, Search, Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

// Interface response
interface KaosKakiResponse {
  success: boolean;
  message: string;
  data: {
    kaosKakiList: KaosKaki[];
    pagination: Pagination;
  };
}

interface KaosKaki {
  id: number;
  nama: string;
  last_order_date: string | null;
  mesin: string[];
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Dummy data sesuai response Anda
const kaosKakiResponse: KaosKakiResponse = {
  success: true,
  message: 'List Kaos Kaki berhasil diambil',
  data: {
    kaosKakiList: [
      {
        id: 9,
        nama: 'Smp Negeri 1 Gresik',
        last_order_date: null,
        mesin: [],
      },
      {
        id: 14,
        nama: 'SMP NEGERI 1 SURABAYA',
        last_order_date: '2025-07-30',
        mesin: [],
      },
      {
        id: 17,
        nama: 'SMP NEGERI 1 PASURUAN',
        last_order_date: '2025-07-30',
        mesin: [],
      },
      {
        id: 18,
        nama: 'SMP NEGERI 1 PROBOLINGGO',
        last_order_date: '2025-07-30',
        mesin: [],
      },
      {
        id: 19,
        nama: 'SMP NEGERI 1 MALANG',
        last_order_date: '2025-07-30',
        mesin: [],
      },
      {
        id: 22,
        nama: 'SMP NEGERI 1 surabaya',
        last_order_date: '2025-07-30',
        mesin: ['Yau Shien', 'Manual Panjang', 'THS Manual'],
      },
    ],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 6,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

const KaosKakiPage = () => {
  const [dataKaosKaki, setDataKaosKaki] = useState<KaosKaki[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [position, setPosition] = useState(1); // currentPage
  const [searchKey, setSearchKey] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);

      // ambil dari dummy response
      setDataKaosKaki(kaosKakiResponse.data.kaosKakiList);
      setIsNext(kaosKakiResponse.data.pagination.hasNextPage);
      setIsPrev(kaosKakiResponse.data.pagination.hasPreviousPage);
      setPosition(kaosKakiResponse.data.pagination.currentPage);
      setTotalPage(kaosKakiResponse.data.pagination.totalPages);

      setIsLoading(false);
    };

    getData();
  }, []);

  const addKaosKaki = () => {
    navigate('/kaoskaki/new');
  };
  const searchKaosKaki = () => {
    Swal.fire({
      title: 'Data Tidak Ditemukan',
      text: 'Coba Cari Dengan Kata Kunci Lain : ' + searchKey,
      icon: 'question',
      confirmButtonText: 'OK',
      backdrop: true,
    });
  };
  const detailKaosKaki = (id: number) => {
    navigate('/kaoskaki/detail/' + id);
  };
  const editKaosKaki = (id: number) => {
    navigate('/kaoskaki/edit/' + id);
  };
  const deleteKaosKaki = (id: number) => {
    Swal.fire({
      title: 'Data Berhasil Dihapus',
      text: 'Data yang dihapus: ' + id,
      icon: 'success',
      confirmButtonText: 'OK',
      backdrop: true,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <ComponentCard title='Tabel Kaos Kaki'>
      {/* Header atas: tombol tambah + search */}
      <div className='flex justify-between'>
        <Button size='sm' variant='success' onClick={addKaosKaki} startIcon={<Plus size={20} />}>
          Tambah Baru
        </Button>

        <div className='flex flex-row'>
          <Input type='text' placeholder='Cari kaos kaki' id='searchBar' onChange={(e) => setSearchKey(e.target.value)} />
          <Button size='sm' className='ms-2' onClick={searchKaosKaki} startIcon={<Search size={20} />}>
            Cari
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-4'>
        <div className='max-w-full overflow-x-auto'>
          <Table>
            <TableHeader className='border-b text-left border-gray-100 dark:border-white/[0.05]'>
              <TableRow>
                <TableCell isHeader className='text-center'>
                  No
                </TableCell>
                <TableCell isHeader>Nama</TableCell>
                <TableCell isHeader>Tanggal</TableCell>
                <TableCell isHeader>Mesin</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataKaosKaki.map((item, index) => (
                <TableRow key={item.id} className='hover:bg-gray-100'>
                  <TableCell className='py-0.5 border-x px-0.5 border-gray-200 text-center'>{index + 1}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5 border-gray-200'>{item.nama}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5 border-gray-200'>{item.last_order_date ?? '-'}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5 border-gray-200'>{item.mesin.length > 0 ? item.mesin.join(', ') : '-'}</TableCell>
                  <TableCell className='py-0.5 border-x px-0.5 border-gray-200'>
                    <div className='flex items-center gap-2'>
                      <Button size='sm' variant='primary' onClick={() => detailKaosKaki(item.id)} startIcon={<PencilLine size={20} />}>
                        Detail
                      </Button>
                      <Button size='sm' variant='warning' onClick={() => editKaosKaki(item.id)} startIcon={<PencilLine size={20} />}>
                        Edit
                      </Button>
                      <Button size='sm' variant='danger' onClick={() => deleteKaosKaki(item.id)} startIcon={<Trash size={20} />}>
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

export default KaosKakiPage;
