import { Book, User } from 'lucide-react';
import PageMeta from '../../../components/common/PageMeta';
import CardDashboard from '../../../components/ecommerce/CardDashboard';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const DashboardPage = () => {
  // chart dashboard
  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#465FFF', '#9CB9FF'], // Define line colors
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'line', // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: 'straight', // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: '#fff', // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: 'dd MMM yyyy', // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: 'category', // Category-based x-axis
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px', // Adjust font size for y-axis labels
          colors: ['#6B7280'], // Color of the labels
        },
      },
      title: {
        text: '', // Remove y-axis title
        style: {
          fontSize: '0px',
        },
      },
    },
  };

  const series = [
    {
      name: 'Pesanan',
      data: [180, 190, 170, 160, 175, 165, 170, 205, 0, 0, 0, 0],
    },
  ];

  return (
    <>
      <PageMeta title='Dashboard' description='Dashboard of Jangkar Mas' />
      <div className='container'>
        <div className='card-section'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-6 my-2'>
            <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
              <div className='flex flex-row justify-between'>
                <p className='text-2xl font-bold text-gray-500 dark:text-gray-400'>Jangkar Mas Dashboard </p>
                <p className='text-2xl font-bold text-gray-500 dark:text-gray-400'> {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6'>
            {/* <!-- Metric Item Start --> */}
            <CardDashboard title={`Pesanan Masuk Bulan :` + new Date().toLocaleString('en-US', { month: 'long' })} percentage={10} total={100} leverage={true} icon={<User />} />
            <CardDashboard title={`Pesanan Masuk Hari :` + new Date().toLocaleString('en-US', { day: '2-digit' }) + '-' + new Date().toLocaleString('en-US', { month: 'long' })} percentage={10} total={100} leverage={true} icon={<User />} />
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-6 my-2'>
            <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
              <span className='text-sm text-gray-500 dark:text-gray-400'>Statistik Orderan Tahun : {new Date().getFullYear()}</span>
              <Chart options={options} series={series} type='area' height={310} />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6'>
            {/* <!-- Metric Item Start --> */}
            <CardDashboard title='Total Users' percentage={10} total={100} leverage={true} icon={<User />} />
            <CardDashboard title='Online Users Now ' percentage={2} total={20} leverage={false} icon={<Book />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
