import ClassicEditor from 'ckeditor5/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = ({ field }) => {
  return (
    <div key={field.key}>
      <CKEditor
        editor={ClassicEditor}
        data={field?.value ?? ''}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              { 'max-height': '400px', 'min-height': '200px' },
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          field.handleChange(data);
        }}
      />
    </div>
  );
};

export default Editor;
