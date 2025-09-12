interface ResponsiveImagesComponentProps {
  src?: string;
  className?: string;
  alt?: string;
}
const ResponsiveImage: React.FC<ResponsiveImagesComponentProps> = ({ src = '/images/grid-image/image-02.png', className = '', alt = '' }) => {
  return (
    <div className='relative'>
      <div className='overflow-hidden'>
        <img src={src} alt={alt} className={`w-full border border-gray-200 rounded-xl dark:border-gray-800 ${className}`} />
      </div>
    </div>
  );
};
export default ResponsiveImage;
