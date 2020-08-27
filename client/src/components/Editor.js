import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor(props) {
  const { description, setDescription } = props;
  const editorConfiguration = {
    toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', '|', 'bulletedList', 'numberedList', 'mediaembed'],
    mediaEmbed: {
      previewsInData: true,
    },
  };
  return (
    <CKEditor
      className="my-3"
      editor={ClassicEditor}
      config={editorConfiguration}
      data={description}
      onChange={(event, editor) => {
        setDescription(editor.getData());
      }}
    />
  );
}
