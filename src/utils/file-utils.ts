interface ReduceImageSizeProps {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
}

export const convertImageToBlob = ({
  file,
  maxWidth = 3200,
  maxHeight = 3200,
}: ReduceImageSizeProps) => {
  if (!file) return;

  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width <= maxWidth && height <= maxHeight) {
        resolve(file);
      }

      let newWidth;
      let newHeight;

      if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
      } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
      }

      let canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context: any = canvas.getContext('2d');

      context.drawImage(image, 0, 0, newWidth, newHeight);

      canvas.toBlob(resolve, file.type);
    };
    image.onerror = reject;
  });
};

export const reduceImagFileSize = async (props: ReduceImageSizeProps) => {
  if (!props.file) return;

  const blob = await convertImageToBlob(props);
  // @ts-ignore
  return new File([blob], props.file.name);
};

export const isFileImage = (file: File) => {
  const acceptedImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg',
  ];
  return file && acceptedImageTypes.includes(file['type']);
};
