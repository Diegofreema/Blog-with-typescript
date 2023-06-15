import { FC, useEffect, useState } from 'react';
import { validate } from '../ToolBar/EditorUtils';

interface Props {
  visible: boolean;
  onSubmit(link: linkOptions): void;
  initialState?: linkOptions;
}
export type linkOptions = {
  url: string;
  openInNewTab: boolean;
};
const LinkForm: FC<Props> = ({
  onSubmit,
  initialState,
  visible,
}): JSX.Element | null => {
  const [link, setLink] = useState<linkOptions>({
    url: '',
    openInNewTab: false,
  });
  const handleSubmit = () => {
    onSubmit({ ...link, url: validate(link.url) });
    setLink({
      url: '',
      openInNewTab: false,
    });
  };

  useEffect(() => {
    initialState && setLink({ ...initialState });
  }, [initialState]);

  if (!visible) return null;
  return (
    <div className="rounded p-2 bg-primary dark:bg-primary-dark shadow shadow-secondary-dark">
      <input
        type="text"
        placeholder="https://example.com"
        className="text-primary-dark dark:text-primary bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2"
        autoFocus
        value={link.url}
        onChange={({ target }) => setLink({ ...link, url: target.value })}
      />
      <div className="flex item-center justify-between space-x-2 mt-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={({ target }) =>
            setLink({ ...link, openInNewTab: target.checked })
          }
        />
        <label htmlFor="open-in-new-tab">open in new tab</label>
        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="bg-action px-2 py-1 text-primary"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
