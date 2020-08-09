import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor(props) {
  const { description, setDescription } = props;
  return (
    <CKEditor
      className="my-3"
      editor={ClassicEditor}
      data={description}
      onChange={(event, editor) => {
        setDescription(editor.getData());
      }}
    />
  );
}
