import { useEffect, useState } from 'react';
import ComponentCard from '../../../components/common/ComponentCard';
import { useParams } from 'react-router';
import Loader from '../../../components/ui/loader/Loader';
import Label from '../../../components/form/Label';
import ResponsiveImage from '../../../components/ui/images/ResponsiveImage';
import Carousel from '../../../components/ui/images/Carousel';

interface KaosKaki {
  id: number;
  nama: string;
  jenis_bahan_id: number;
  keterangan: string;
  last_order_date: string | Date;
  kode_kaos_kaki: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  jenis_bahan: JenisBahan;
  images: string[];
  mesin: string[];
}

interface JenisBahan {
  id: number;
  nama: string;
  kode_bahan: string;
  status: number;
}

const responseApi = {
  success: true,
  message: 'Kaos Kaki berhasil diambil',
  data: {
    kaosKaki: {
      id: 22,
      nama: 'SMP NEGERI 1 surabaya',
      jenis_bahan_id: 3,
      keterangan: 'Kaos kaki berbahan katun untuk anak sekolah',
      last_order_date: '2025-07-30',
      kode_kaos_kaki: 'bhvashjvj',
      status: 1,
      createdAt: '2025-08-21T13:34:18.412Z',
      updatedAt: '2025-08-21T13:34:18.412Z',
      jenis_bahan: {
        id: 3,
        nama: 'spandek 20s',
        kode_bahan: 'spdpe30s',
        status: 1,
      },
      images: ['/uploads/kaoskakisimages/1755783257917-naruto.jpg', '/uploads/kaoskakisimages/1755783257917-bleach.jpg'],
      mesin: ['Yau Shien', 'Manual Panjang', 'THS Manual'],
    },
  },
};

const DetailKaosKaki = () => {
  const [responseData, setResponseData] = useState<KaosKaki | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { idKaos } = useParams();

  useEffect(() => {
    const getDetailKaosKaki = (idKaos: string) => {
      setIsLoading(true);
      console.log('get data api detail kode : ' + idKaos);
      setResponseData(responseApi.data.kaosKaki);
      setIsLoading(false);
    };
    getDetailKaosKaki(String(idKaos));
  }, [idKaos]);

  if (isLoading) return <Loader />;
  if (!responseData) return <p>Data tidak ditemukan</p>;
  return (
    <ComponentCard title='Detail Kaos Kaki'>
      <div className='container-detail'>
        <div className='grid mb-2 grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-2'>
          <div>
            <Label>Nama Kaos Kaki</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>{responseData?.nama}</p>
            </div>
          </div>
          <div>
            <Label>Kode Kaos Kaki</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>{responseData?.kode_kaos_kaki}</p>
            </div>
          </div>
        </div>
        <div className='grid mb-2 grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-2'>
          <div>
            <Label>Jenis Bahan</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>
                {responseData?.jenis_bahan?.kode_bahan} - {responseData?.jenis_bahan?.nama}
              </p>
            </div>
          </div>
          <div>
            <Label>Tanggal Pesanan Terakhir</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>{String(responseData?.last_order_date)}</p>
            </div>
          </div>
        </div>
        <div className='grid mb-2 grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-2'>
          <div>
            <Label>Keterangan</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>{responseData?.keterangan}</p>
            </div>
          </div>
          <div>
            <Label>Mesin</Label>
            <div className='border border-gray-500 rounded-2xl p-3'>
              {responseData?.mesin.map((itm) => (
                <p className='mb-1.5 text-base font-medium text-gray-700 dark:text-gray-400'>- {itm}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='mb-2'>
          <Carousel
            autoSlide={false}
            autoSlideInterval={2000}
            slides={responseData?.images.map((itm) => (
              <div>
                <Label>{itm}</Label>
                <div className='border border-gray-500 rounded-2xl p-3'>
                  <ResponsiveImage></ResponsiveImage>
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </ComponentCard>
  );
};

export default DetailKaosKaki;
