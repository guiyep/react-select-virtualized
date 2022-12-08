const fs = require('fs');
const { filesize } = require('filesize');
const oldFile = require('./size.json');

const exec = () => {
  try {
    const stats = fs.statSync('./dist/index.min.js');
    const size = stats.size;

    console.log('Sizes', { size });

    fs.unlink('./size.json', () => {
      const delta = size - oldFile?.new?.size || 0;

      const sizeObj = {
        old: {
          ...(oldFile?.new || {}),
          old: undefined,
        },
        new: {
          delta,
          prettyDelta: filesize(delta),
          size,
          prettySize: filesize(size),
        },
      };

      fs.writeFile('./size.json', JSON.stringify(sizeObj), (err) => {
        if (err) throw err;
        console.log('File is created successfully.');
        if (delta > 8000) {
          console.log('Delta is bigger than 8k.');
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
};

exec();
