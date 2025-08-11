const DetailKaos = () => {
  const shareOptions = {
    title: 'Title',
    text: 'Message to share',
    url: 'https://www.example.com',
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareOptions);
      } else {
        // Fallback untuk browser yang tidak mendukung Web Share API
        alert('Web Share API tidak didukung di browser ini.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const shareImage = async () => {
    try {
      const response = await fetch('https://example.com/image.jpg');
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      await navigator.share({
        title: 'Gambar',
        files: [file],
      });
    } catch (error) {
      alert('Browser tidak mendukung berbagi file.');
    }
  };

  return <button onClick={handleShare}>Share Data</button>;
};

export default DetailKaos;
