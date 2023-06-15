import { FC } from 'react';
import NextImage from 'next/image';
import CheckMark from './CheckMark';
interface Props {
  src: string;
  selected?: boolean;
  onClick?(): void;
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="rounded h-[200px] w-[200px] bg-white relative overflow-hidden cursor-pointer"
    >
      <NextImage
        src={src}
        fill
        alt="gallery"
        className="bg-secondary-light hover:scale-110 transition object-cover"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
