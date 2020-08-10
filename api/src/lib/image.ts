import sizeOf from 'image-size';

export const getImageSize = async (path: string) => {
  if (!path) throw new Error('wrong path for checking size of image');
  return new Promise<{ width?: number; height?: number }>(
    (res, rej) => {
      sizeOf.imageSize(path, (err, dimensions) => {
        if (err || !dimensions) return rej(err);
        res(dimensions);
      });
    },
  );
};
