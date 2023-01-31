import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import ModalDAMComponent from 'components/ModalDamComponent';
import styles from './index.module.scss';
import './index.scss';
import ComponentSVG from 'components/ComponentSVG';
const ClassicEditor = require('aesirx-ckeditor');
const FormEditor = ({ field }) => {
  const [editorState, setEditorState] = useState();
  const [show, setShow] = useState(false);
  const onSelect = (data) => {
    editorState?.model.change(() => {
      const imgTag = `<img  src="${data[0]?.download_url}" alt="${data[0]?.basename}"></img>`;
      const viewFragment = editorState.data.processor.toView(imgTag);
      const modelFragment = editorState.data.toModel(viewFragment);
      editorState.model.insertContent(modelFragment);
    });
    setEditorState();
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div key={field.key} className="position-relative">
      <p
        onClick={() => setShow(true)}
        className={`${styles['image-upload-button']} position-absolute bottom-0 end-0 zindex-1 mb-0 cursor-pointer`}
      >
        <ComponentSVG url="/assets/images/data-stream.svg" className={'bg-black'} />
      </p>
      <ModalDAMComponent show={show} onHide={handleClose} onSelect={onSelect} />
      <div className={styles['custom-editor']}>
        <CKEditor
          editor={window.ClassicEditor ?? ClassicEditor}
          data={field?.getValueSelected ?? ''}
          onReady={async (editor) => {
            setEditorState(editor);
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
    </div>
  );
};

export default FormEditor;
