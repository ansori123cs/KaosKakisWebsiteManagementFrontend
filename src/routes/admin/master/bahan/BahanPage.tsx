import { useEffect, useState } from 'react';
import ComponentCard from '../../../../components/common/ComponentCard';
import Button from '../../../../components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../../../components/ui/table';
import Loader from '../../../../components/ui/loader/Loader';
import Input from '../../../../components/form/input/InputField';

interface IBahanResponse {
  bahanList: IBahan[];
  isNext: boolean;
  isPrev: boolean;
  position: number;
  totalPage: number;
}

interface IBahan {
  id: number;
  namaBahan: string;
}

const bahanResponse: IBahanResponse = {
  bahanList: [
    {
      id: 1,
      namaBahan: 'Spandek',
    },
    {
      id: 2,
      namaBahan: 'Nilon',
    },
    {
      id: 3,
      namaBahan: 'Polyster',
    },
    {
      id: 4,
      namaBahan: 'Spandek Warna',
    },
  ],
  isNext: true,
  isPrev: true,
  position: 5,
  totalPage: 10,
};

const BahanPage = () => {
  const [dataBahan, setDataBahan] = useState<IBahan[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [position, setPosition] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const getDataBahan = () => {
      setIsLoading(true);
      setDataBahan(bahanResponse.bahanList);
      setIsNext(bahanResponse.isNext);
      setIsPrev(bahanResponse.isPrev);
      setPosition(bahanResponse.position);
      setTotalPage(bahanResponse.totalPage);
    };

    getDataBahan();
    setIsLoading(false);
  }, []);

  const addBahan = () => {
    console.log('Tambah Bahan');
  };
  const searchBahan = () => {
    console.log('Dicari Bahan :' + searchKey);
  };
  const editBahan = (id: number) => {
    console.log('Edit Bahan :' + id);
  };
  const deleteBahan = (id: number) => {
    console.log('Delete Bahan :' + id);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <ComponentCard title='Tabel Bahan'>
        <div className='flex justify-between'>
          {' '}
          <Button
            size='sm'
            variant='success'
            onClick={() => addBahan()}
            startIcon={
              <svg className='w-6 h-6 text-white dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 12h14m-7 7V5' />
              </svg>
            }
          >
            Tambah Baru
          </Button>
          <div className='flex flex-row'>
            <Input
              type='text'
              placeholder='Cari bahan'
              id='searchBar'
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
            <Button size='sm' className='ms-2' onClick={() => searchBahan()}>
              Cari
            </Button>
          </div>
        </div>
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
          <div className='max-w-full overflow-x-auto'>
            <Table>
              <TableHeader className='border-b border-gray-100 dark:border-white/[0.05]'>
                <TableRow>
                  <TableCell isHeader className='px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400'>
                    No
                  </TableCell>
                  <TableCell isHeader className='px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400'>
                    Nama Bahan
                  </TableCell>
                  <TableCell isHeader className='px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataBahan?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell isHeader className='px-5 py-3 text-start font-medium text-gray-500  text-theme-xs dark:text-gray-400'>
                      {index + 1}
                    </TableCell>
                    <TableCell isHeader className='px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400'>
                      {item.namaBahan}
                    </TableCell>
                    <TableCell isHeader className='px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400'>
                      <div className='flex items-center gap-2'>
                        <Button size='sm' variant='warning' onClick={() => editBahan(item.id)}>
                          Edit
                        </Button>
                        <Button size='sm' variant='danger' onClick={() => deleteBahan(item.id)}>
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
        <div className='flex justify-end'>
          <nav aria-label='Page navigation example'>
            <ul className='flex items-center -space-x-px h-8 text-sm'>
              {/* Previous button */}
              {isPrev && (
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Previous</span>
                    <svg className='w-2.5 h-2.5 rtl:rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 1 1 5l4 4' />
                    </svg>
                  </a>
                </li>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPage }, (_, i) => (
                <li key={i}>
                  <a
                    href='#'
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 
        ${position === i + 1 ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400'}
        hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
              {/* Next button */}
              {isNext && (
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Next</span>
                    <svg className='w-2.5 h-2.5 rtl:rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
                    </svg>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </ComponentCard>
    </>
  );
};

export default BahanPage;
