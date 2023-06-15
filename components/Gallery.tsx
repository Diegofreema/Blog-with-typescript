import { FC } from 'react';
import Image from './Image';
import { BsCardImage } from 'react-icons/bs';

interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage?: string;
}

const Gallery: FC<Props> = ({
  images,
  onSelect,
  uploading = false,
  selectedImage = '',
}): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="basis-1/4 p-2 aspect-square flex items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse flex-col">
          <BsCardImage size={60} />
          <p>Uploading...</p>
        </div>
      )}
      {images.map(({ src }, index) => {
        return (
          <div className="basis-1/4 p-2" key={src}>
            <Image
              src={src}
              selected={selectedImage === src}
              onClick={() => onSelect(src)}
            />
            ;
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
