'use client';
import { useParams } from 'next/navigation';

type mesin = {
  value: string;
  label: string;
};

type VariasiType = {
  ukuran: string;
  warna: string;
};

type foto = {
  url: string;
  isPrimary: boolean;
};

type KaosKaki = {
  nama: string;
  mesin: mesin[];
  bahan: string;
  variasi: VariasiType[];
  foto: foto[];
};

const FetchKaosKaki: KaosKaki = {
  nama: 'SMAN 1 Surabaya',
  mesin: [
    { value: '1', label: 'THS' },
    { value: '2', label: 'YauShen' },
  ],
  bahan: 'PE 30 S',
  variasi: [
    { ukuran: 'S', warna: 'Hitam' },
    { ukuran: 'M', warna: 'Putih' },
  ],
  foto: [
    { url: '/images/kaos-kaki-1.jpg', isPrimary: true },
    { url: '/images/kaos-kaki-2.jpg', isPrimary: false },
  ],
};

const EditKaosKakiPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1> param : {id}</h1>;<p>{FetchKaosKaki.nama}</p>
      <p>{FetchKaosKaki.bahan}</p>
      <ul>
        {FetchKaosKaki.mesin.map((mesin, index) => (
          <li key={index}>
            {mesin.value} - {mesin.label}
          </li>
        ))}
      </ul>
      <ul>
        {FetchKaosKaki.variasi.map((variasi, index) => (
          <li key={index}>
            {variasi.ukuran} - {variasi.warna}
          </li>
        ))}
      </ul>
      <ul>
        {FetchKaosKaki.foto.map((foto, index) => (
          <li key={index}>{foto.url}</li>
        ))}
      </ul>
    </>
  );
};

export default EditKaosKakiPage;
