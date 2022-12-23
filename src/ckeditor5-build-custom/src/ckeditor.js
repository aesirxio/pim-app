import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Code,
} from '@ckeditor/ckeditor5-basic-styles/src/index';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageResize,
  ImageResizeEditing,
  ImageResizeButtons,
} from '@ckeditor/ckeditor5-image/src/index';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent/src/index';
import { Link, LinkImage, AutoLink } from '@ckeditor/ckeditor5-link/src/index';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import {
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
} from '@ckeditor/ckeditor5-table/src/index';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from '@ckeditor/ckeditor5-special-characters/src/index';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import { Font, FontFamily } from '@ckeditor/ckeditor5-font/src/index';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

import sanitizeHtml from 'sanitize-html';
// import ImageCustom from './ImageCustom';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  RemoveFormat,
  SourceEditing,
  Code,
  BlockQuote,
  Heading,
  Highlight,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageResize,
  ImageResizeEditing,
  ImageResizeButtons,
  Indent,
  IndentBlock,
  // Link,
  // LinkImage,
  ListStyle,
  TodoList,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  HorizontalLine,
  Alignment,
  AutoLink,
  SpecialCharacters,
  SpecialCharactersEssentials,
  HtmlEmbed,
  Font,
  FontFamily,
  CodeBlock,
  TableProperties,
  TableCellProperties,
  // ImageCustom,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'highLight',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'removeFormat',
      'code',
      'link',
      'bulletedList',
      'numberedList',
      'todoList',
      // 'imagecustom',
      '|',
      'alignment',
      'indent',
      'outdent',
      '|',
      'specialCharacters',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'htmlEmbed',
      'codeBlock',
      'horizontalLine',
      '|',
      'sourceEditing',
      '|',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
  image: {
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage:75',
        value: '75',
        icon: 'large',
      },
    ],
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'imageTextAlternative',
      'toggleImageCaption',
      '|',
      'resizeImage:50',
      'resizeImage:75',
      'resizeImage:original',
      '|',
      'linkImage',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
    ],
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
    ],
  },
  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: (inputHtml) => {
      const outputHtml = sanitizeHtml(inputHtml);
      return {
        html: outputHtml,
        hasChanged: true,
      };
    },
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
  fontSize: {
    options: [10, 14, 15, 16, 20, 24, 32, 40, 48],
    supportAllValues: false,
  },
  fontFamily: {
    options: [
      'default',
      'AndesRoundedRegular, AndesRoundedBlack, AndesRoundedBold, AndesRoundedExtraBold, AndesRoundedExtraLight,AndesRoundedSemiBold,AndesRoundedUltraLight, sans-serif',
      'Archivo-Regular, Archivo-Black,Archivo-BlackItalic,Archivo-Bold,Archivo-BoldItalic,Archivo-ExtraBold,Archivo-ExtraBoldItalic, Archivo-ExtraLight,Archivo-ExtraLightItalic,Archivo-Italic,Archivo-Light,Archivo-LightItalic,Archivo-Medium,Archivo-MediumItalic,Archivo-SemiBold,Archivo-SemiBoldItalic, Archivo-Thin,Archivo-ThinItalic , sans-serif',
    ],
    supportAllValues: true,
  },
  fontColor: {
    columns: 5,
    documentColors: 10,
  },
  fontBackgroundColor: {
    columns: 5,
    documentColors: 10,
  },
  link: {
    defaultProtocol: 'http://',
    decorators: [
      {
        mode: 'manual',
        label: 'Open in a new tab',
        defaultValue: true,
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
      {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'download',
        },
      },
    ],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
};

export default Editor;
