import {intersection, filter} from 'lodash';

export const FileErrors = {
  COULD_NOT_READ: 'File could not be interpretted by the browser',
  NOT_ALLOWED: 'The file type is not allowed or exceeds maximum size!',
  NOT_SUPPORTED: 'Browser does not support FileReader API',
};

export const FileTypes = [
  {
    mimeType: 'image/jpeg',
    extension: ['.jpg', '.jpeg'],
  },
  {
    mimeType: 'image/png',
    extension: ['.png'],
  },
  {
    mimeType: 'image/gif',
    extension: ['.gif'],
  },
  {
    mimeType: 'video/mp4',
    extension: ['.mp4'],
  },
];

export function getMimeTypesForExtension(extensionArray) {
  return filter(
    FileTypes.filter((item) => {
      if (!!intersection(item.extension, extensionArray).length === true) {
        return item;
      }
    }), 'mimeType');
}

export function validateFile(file, ext, size) {
  if (!ext && !size) {
    return true;
  }

  if (ext) {
    const allowedMimeTypes = getMimeTypesForExtension(ext);
    if (!allowedMimeTypes.filter(item => item.mimeType === file.type).length) {
      return false;
    }
  }

  if (size) {
    if (Math.floor(file.size / 1024) > size) {
      return false;
    }
  }

  return true;
}

export function getFileContents(file, extensionsArray, maxSize) {
  const fileReader = typeof(FileReader) !== 'undefined' ? new FileReader() : null;
  const isValidFile = validateFile(file, extensionsArray, maxSize);

  const readFilePromise = new Promise((resolve, reject) => {
    fileReader.onloadend = () => {
      resolve({file: fileReader.result, binaryFile: file});
    };

    fileReader.onerror = (ev) => {
      reject({error: FileErrors.COULD_NOT_READ, detail: ev.detail});
    };
  });

  if (fileReader && isValidFile) {
    fileReader.readAsDataURL(file);
  } else {
    if (!fileReader) {
      return Promise.reject({error: FileErrors.NOT_SUPPORTED});
    }

    return Promise.reject({error: FileErrors.NOT_ALLOWED, detail: null});
  }

  return readFilePromise;
}
