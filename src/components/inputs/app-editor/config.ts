import { getHeaders, getPath } from '../../../http';
import { API_ENDPOINTS } from '../../../constants/routes/api-endpoints-constants';

export const CKEDITOR5_CONFIG = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'link',
      'blockQuote',
      '|',
      'fontBackgroundColor',
      'fontColor',
      'fontSize',
      'findAndReplace',
      'specialCharacters',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      'imageInsert',
      'insertTable',
      'mediaEmbed',
    ],
  },
  language: 'ru',
  image: {
    toolbar: [
      //'imageTextAlternative',
      //'imageStyle:inline',
      //'imageStyle:block',
      //'imageStyle:side',
      'imageStyle:alignCenter',
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'linkImage',
    ],
    styles: ['block', 'alignCenter', 'alignLeft', 'alignRight'],
  },
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: getPath({ path: API_ENDPOINTS.MEDIA.CREATE_ONE }),
    // Headers sent along with the XMLHttpRequest to the upload server.
    headers: getHeaders(true),
    urlsOptions: {
      default: 'fullPath',
      100: 'thumbnails.small.url',
      400: 'thumbnails.medium.url',
      1024: 'thumbnails.large.url',
      1920: 'thumbnails.xlarge.url',
    },
  },
  fontSize: {
    options: ['tiny', 'default', 'big'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};
