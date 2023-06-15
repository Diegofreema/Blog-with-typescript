'use client';
import Button from '@/components/Button';
import { FC, useState } from 'react';
import { getFocusedEditor } from '../ToolBar/EditorUtils';
import { BsYoutube } from 'react-icons/bs';
import { Editor } from '@tiptap/react';

interface Props {
  onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [url, setUrl] = useState('');
  const handleSubmit = () => {
    if (!url.trim()) return setVisible(false);

    onSubmit(url);
    setUrl('');
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
        <BsYoutube />
      </Button>
      {visible && (
        <div className="absolute top-full mt-4 z-50 right-0">
          <div className="flex  space-x-2">
            <input
              type="text"
              placeholder="https://youtube.com"
              className="text-primary-dark dark:text-primary bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2"
              autoFocus
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-action p-2 rounded-md text-primary"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedYoutube;
