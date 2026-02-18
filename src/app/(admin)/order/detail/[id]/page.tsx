'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { usePermission } from '@/hooks/usePermission';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type Variasi = {
  warna: string;
  ukuran: string;
  jumlah: number;
};

type DetailOrder = {
  id: string;
  namaPemesan: string;
  tglPemesanan: Date;
  statusOrder: 'belum' | 'proses' | 'selesai';
  namaKaosKaki: string;
  variasi: Variasi[];
};

const Detail: DetailOrder = {
  id: '21874871973',
  namaPemesan: 'Pak Arip',
  statusOrder: 'proses',
  tglPemesanan: new Date(),
  namaKaosKaki: 'SMP N 10 Surabaya',
  variasi: [
    { warna: 'putih 1/2 telapak hitam', ukuran: '19-20', jumlah: 100 },
    { warna: 'putih 1/2 telapak hitam', ukuran: '21-22', jumlah: 100 },
    { warna: 'hitam', ukuran: '19-20', jumlah: 100 },
  ],
};

const DetailOrderPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<DetailOrder>({
    id: '',
    namaPemesan: '',
    tglPemesanan: new Date(),
    statusOrder: 'belum',
    namaKaosKaki: '',
    variasi: [],
  });
  const router = useRouter();

  //auth context and hooks
  //auth context
  const { user } = useAuth();
  const { hasPermission } = usePermission(user?.roles ?? []);

  const canFinish = hasPermission('finishOrder', {
    statusOrder: data?.statusOrder,
  });

  useEffect(() => {
    const fetchdata = async (id: string | undefined) => {
      console.log('Fetching data for ID:', id);
      setData(Detail);
    };
    fetchdata(id?.toString());
  }, [id]);

  const groupedVariasi = data.variasi.reduce<Record<string, Variasi[]>>((acc, item) => {
    if (!acc[item.warna]) {
      acc[item.warna] = [];
    }
    acc[item.warna].push(item);
    return acc;
  }, {});

  const statusColor: Record<DetailOrder['statusOrder'], string> = {
    belum: 'bg-red-500',
    proses: 'bg-blue-500',
    selesai: 'bg-green-500',
  };

  //   print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');

    if (!printWindow) return;

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(data.tglPemesanan);

    const groupedVariasi = data.variasi.reduce<Record<string, Variasi[]>>((acc, item) => {
      if (!acc[item.warna]) acc[item.warna] = [];
      acc[item.warna].push(item);
      return acc;
    }, {});

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Order ${data.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
          }
          h1 {
            margin-bottom: 10px;
          }
          .section {
            margin-bottom: 20px;
          }
          .warna {
            margin-top: 15px;
            font-weight: bold;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Detail Order</h1>

        <div class="section">
          <h3><strong>Nama Pemesan:</strong> ${data.namaPemesan}</h3>
          <h3><strong>Tanggal:</strong> ${formattedDate}</h3>
   
          <h3><strong>Status:</strong> ${data.statusOrder}</h3>
        </div>
 <hr />
        <div class="section">
        <h2><strong>Nama Kaos Kaki:</strong> ${data.namaKaosKaki}</h2>
        <hr />
          <h3>Detail Variasi</h3>
          ${Object.entries(groupedVariasi)
            .map(
              ([warna, items]) => `
                <div class="warna"><h3>${warna}</h3></div>
                <hr />
                ${items
                  .map(
                    (item) => `
                      <div class="row">
                        <h3><span>${item.ukuran}</span></h3>
              
                        <h3><span>${item.jumlah} pcs</span></h3>
                      </div>
                    `,
                  )
                  .join('')}
              `,
            )
            .join('')}
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  const handleFinish = () => {
    // Logic untuk menyelesaikan order, misalnya update status di backend
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Selesaikan Orderan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Selesaikan!',
    }).then((result) => {
      if (result.isConfirmed) {
        //logic delete

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Order DI Selesaikan',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push(`/order`);
      }
    });
  };

  return (
    <div className='p-1 md:p-2 bg-gray-50 w-full min-h-screen'>
      <Card className='max-w-4xl mx-auto shadow-xl rounded-2xl'>
        <CardHeader className='border-b pb-4 space-y-2'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Detail Order</h1>

            <div className={`${statusColor[data.statusOrder]} text-white px-4 py-1 rounded-full text-sm capitalize w-fit`}>{data.statusOrder}</div>
          </div>
        </CardHeader>

        <CardContent className='space-y-6 pt-6'>
          {/* Informasi Utama */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-gray-500 text-sm'>Nama Pemesan</p>
              <p className='font-semibold text-gray-900'>{data.namaPemesan}</p>
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Tanggal Pemesanan</p>
              <p className='font-semibold text-gray-900'>
                {new Intl.DateTimeFormat('id-ID', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }).format(data.tglPemesanan)}
              </p>
            </div>
          </div>

          {/* Nama Produk */}
          <div>
            <p className='text-gray-500 text-sm'>Nama Kaos Kaki</p>
            <p className='font-semibold text-gray-900 text-lg'>{data.namaKaosKaki}</p>
          </div>

          {/* Variasi */}
          <div className='border rounded-xl p-4 bg-gray-50'>
            <h2 className='font-semibold text-gray-900 mb-4'>Detail Variasi</h2>

            <div className='space-y-4'>
              {Object.entries(groupedVariasi).map(([warna, items]) => (
                <div key={warna} className='bg-white p-4 rounded-lg shadow-sm'>
                  <h3 className='font-semibold text-gray-800 mb-2 capitalize'>{warna}</h3>
                  <hr />

                  <div className='space-y-1'>
                    {items.map((item, index) => (
                      <div key={index} className='flex justify-between text-sm text-gray-700'>
                        <span>{item.ukuran}</span>
                        <span>{item.jumlah} ps</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className='flex justify-end gap-3'>
            <Button variant='secondary' className='cursor-pointer' onClick={handlePrint}>
              Print
            </Button>

            {data.statusOrder !== 'selesai' && canFinish && (
              <Button variant='default' className='cursor-pointer' onClick={handleFinish}>
                Selesaikan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailOrderPage;
