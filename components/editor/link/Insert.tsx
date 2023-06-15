'use client';
import Button from '@/components/Button';
import { FC, useState } from 'react';
import { getFocusedEditor } from '../ToolBar/EditorUtils';
import { BsLink45Deg } from 'react-icons/bs';
import { Editor } from '@tiptap/react';
import LinkForm, { linkOptions } from './LinkForm';

interface Props {
  onSubmit(link: linkOptions): void;
}

const Insert: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleSubmit = (link: linkOptions) => {
    if (!link.url.trim()) return setVisible(false);
    console.log(link);

    onSubmit(link);
    setVisible(false);
  };
  return (
    <div
      className="relative"
      onKeyDown={({ key }) => {
        if (key === 'Escape') return setVisible(false);
      }}
    >
      <Button onClick={() => setVisible((prev) => !prev)}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full mt-4 z-50 right-0">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Insert;
