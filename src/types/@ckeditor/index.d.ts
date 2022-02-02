declare module '@ckeditor/ckeditor5-react';
declare module '@ckeditor/ckeditor5-build-classic';
declare module 'ckeditor5-custom-build';

declare module '@ckeditor/ckeditor5-react' {
  const CKEditor: any;
  export default CKEditor;
}

declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditor: any;
  export = ClassicEditor;
}

declare module 'ckeditor5-custom-build' {
  const CustomBuild: any;
  export = CustomBuild;
}
