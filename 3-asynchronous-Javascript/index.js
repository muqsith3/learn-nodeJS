const fs = require('fs');
const superagent = require('superagent');

// async/await method
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i could not find file ');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('i could not write file ');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${data}`);
    // get data dog from api
    // waiting for multiple promises
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // take all value from promises
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    // console.log(res);
    //  write string to file
    await writeFilePro('dog-img-await.txt', imgs.join('\n'));
    console.log('random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: ready';
};
// returning value from async function
(async () => {
  try {
    console.log('1: will get dog picture');
    const x = await getDogPic();
    console.log(x);
    console.log('3: done get dog picture');
  } catch (err) {
    console.log('error !!!');
  }
})();

/*
// consuming promises with async/await
console.log('1: will get dog picture');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: done get dog picture');
  })
  .catch((err) => console.log('error !!!'));
*/

/*
// building promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i could not find file ');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('i could not write file ');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log('building promise method');
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`dog-img-building-promise.txt`, res.body.message);
    // fs.writeFile('dog-img-building-promise.txt', res.body.message, (err) => {
    //   console.log('random dog image saved to file');
    // });
  })
  .then(() => console.log('random dog image saved to '))
  .catch((err) => {
    console.log(err.message);
  });
  */

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('random dog image saved to file');
//       });
//     });
// });

// ppromise method
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log('promise method');

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img-promise.txt', res.body.message, (err) => {
        console.log('random dog image saved to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/
