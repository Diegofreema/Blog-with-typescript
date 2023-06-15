import Editor from '@/components/editor/Editor';
import { NextPage } from 'next';

interface Props {}

const Create: NextPage<Props> = ({}): JSX.Element => {
  return (
    <div className="max-w-3xl mx-auto">
      <Editor />
    </div>
  );
};

export default Create;
