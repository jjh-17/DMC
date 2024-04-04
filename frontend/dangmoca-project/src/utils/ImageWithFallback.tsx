import { useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, ...props } : any) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;