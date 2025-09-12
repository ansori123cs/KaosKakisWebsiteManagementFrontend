interface ResponsiveImagesComponentProps {
  src?: string;
}
const ResponsiveImage: React.FC<ResponsiveImagesComponentProps> = ({ src = '/images/grid-image/image-02.png' }) => {
  return (
    <div className='relative'>
      <div className='overflow-hidden'>
        <img src={src} alt='Cover' className='w-full border border-gray-200 rounded-xl dark:border-gray-800' />
      </div>
    </div>
  );
};
export default ResponsiveImage;
