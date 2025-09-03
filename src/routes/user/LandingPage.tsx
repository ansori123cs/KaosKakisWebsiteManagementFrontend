import Button from '../../components/ui/button/Button';

const LandingPage = () => {
  return (
    <div className='container flex-1'>
      {/* NAVBAR */}
      <nav className='bg-white border-gray-200 dark:bg-gray-900 shadow-sm'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
            <img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='JangkarMas Logo' />
            <span className='self-center text-2xl font-bold whitespace-nowrap dark:text-white text-blue-700'>JangkarMas</span>
          </a>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent'>
              <li>
                <a href='#home' className='block py-2 px-3 hover:text-blue-700 dark:text-white'>
                  Home
                </a>
              </li>
              <li>
                <a href='#about' className='block py-2 px-3 hover:text-blue-700 dark:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='#products' className='block py-2 px-3 hover:text-blue-700 dark:text-white'>
                  Products
                </a>
              </li>
              <li>
                <a href='#testimoni' className='block py-2 px-3 hover:text-blue-700 dark:text-white'>
                  Testimoni
                </a>
              </li>
              <li>
                <a href='#contact' className='block py-2 px-3 hover:text-blue-700 dark:text-white'>
                  Contact
                </a>
              </li>
              <li>
                <Button size='sm' variant='primary'>
                  <a href='/SignUp'>login admin</a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id='home' className='hero bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-20'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Kaos Kaki Nyaman & Stylish</h1>
        <p className='text-lg md:text-xl mb-6'>Dari standar hingga custom, JangkarMas Kaos Kaki hadir dengan kualitas terbaik dan harga bersahabat.</p>
        <a href='#products' className='bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition'>
          Pesan Sekarang
        </a>
      </section>

      {/* ABOUT SECTION */}
      <section id='about' className='py-16 bg-gray-50 text-center'>
        <h2 className='text-3xl font-bold mb-6'>Tentang Kami</h2>
        <p className='max-w-2xl mx-auto text-gray-600'>
          JangkarMas Kaos Kaki adalah usaha dagang yang menyediakan berbagai jenis kaos kaki — dari model standar hingga desain custom yang unik. Kami mengutamakan kenyamanan, harga terjangkau, serta pelayanan ramah untuk setiap pelanggan.
        </p>
      </section>

      {/* PRODUCTS SECTION */}
      <section id='products' className='py-16 text-center'>
        <h2 className='text-3xl font-bold mb-10'>Produk Kami</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          <div className='bg-white shadow rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Kaos Kaki Standar</h3>
            <p className='text-gray-600'>Model klasik dalam berbagai warna, cocok untuk sehari-hari.</p>
          </div>
          <div className='bg-white shadow rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Kaos Kaki Custom</h3>
            <p className='text-gray-600'>Buat desain sesuai selera: logo perusahaan, motif unik, atau gaya personal.</p>
          </div>
          <div className='bg-white shadow rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Bahan Nyaman</h3>
            <p className='text-gray-600'>Pilihan bahan katun, bambu, hingga premium untuk kenyamanan optimal.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONI SECTION */}
      <section id='testimoni' className='py-16 bg-gray-50 text-center'>
        <h2 className='text-3xl font-bold mb-10'>Apa Kata Mereka</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <div className='bg-white shadow rounded-lg p-6'>
            <p className='italic text-gray-600'>"Kaos kaki custom-nya pas banget, bahannya nyaman, harganya juga terjangkau!"</p>
            <span className='block mt-4 font-semibold'>— Fitri</span>
          </div>
          <div className='bg-white shadow rounded-lg p-6'>
            <p className='italic text-gray-600'>"Pelayanan cepat dan ramah. Pilihan standar lengkap dan desain custom keren!"</p>
            <span className='block mt-4 font-semibold'>— Budi</span>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id='contact' className='py-16 text-center'>
        <h2 className='text-3xl font-bold mb-6'>Hubungi Kami</h2>
        <p className='text-gray-600 mb-6'>Ingin pesan atau ada pertanyaan? Silakan hubungi kami melalui WhatsApp atau email.</p>
        <a href='https://wa.me/628123456789' target='_blank' className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition'>
          Chat via WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className='bg-white border-t border-gray-200 shadow-sm py-6 text-center dark:bg-gray-800 dark:border-gray-600'>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          © 2025{' '}
          <a href='/' className='hover:underline font-semibold'>
            JangkarMas
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default LandingPage;
