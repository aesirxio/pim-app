import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class ImageCustom extends Plugin {
  init() {
    const editor = this.editor;
    editor.model.schema.register('img', {
      inheritAllFrom: '$block',
      allowIn: ['paragraph'],
      allowAttributes: ['id', 'class'],
      allowClassnames: '*',
    });
    editor.ui.componentFactory.add('imagecustom', (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Image',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z"/></svg>',
        tooltip: true,
      });

      // Xử lý khi icon được click
      view.on('execute', () => {
        let input = document.createElement('input');

        input.type = 'file';
        input.accept = 'image/png, image/gif, image/jpeg';
        input.classList.add('d-none');
        input.onchange = () => {
          if (input.files) {
            if (input.files[0].size > 1097152) {
              alert('File size is too big. File size must be smaller than 1M', 'warning');
            } else {
              let files = Array.from(input.files);
              const reader = new FileReader();
              reader.readAsArrayBuffer(files[0]);

              reader.addEventListener(
                'load',
                function () {
                  // you can keep blob or save blob to another position
                  const blob = new Blob([reader.result]);
                  // url for download
                  const url = URL.createObjectURL(blob, { type: 'image/png' });
                  //   const randomId = 'random' + Math.random().toString(36).slice(2);
                  // input.classList.add(randomId);
                  input.setAttribute('url', url);
                  const imgTag = `<img  src="${url}" ></img>`;

                  const viewFragment = editor.data.processor.toView(imgTag);
                  const modelFragment = editor.data.toModel(viewFragment);
                  editor.model.insertContent(modelFragment);
                },
                false
              );
            }
          }
        };
        document.body.appendChild(input);
        input.click();
      });

      return view;
    });
  }
}

export default ImageCustom;
