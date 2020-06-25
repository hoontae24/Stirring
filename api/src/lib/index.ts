import { access, mkdir } from 'fs';

export const mkdirIfNotExist = (path: string) => {
  access(path, (err) => {
    if (err) {
      mkdir(path, () => null);
    }
  });
};
