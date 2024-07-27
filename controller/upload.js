const multer = require("multer");
const Jimp = require('jimp');


var storage = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/image');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)
    callback(null, file.originalname);

  }
});




var storageSlider = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/imageSlider');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)
    callback(null, file.originalname);

  }
});



var docship = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/docShip');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)

    callback(null, file.originalname);

  }
});


var chat = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/chat');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)

    callback(null, file.originalname);

  }
});





var docUser = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/docUser');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)

    callback(null, file.originalname);

  }
});







var signature = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/signature');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname)

    callback(null, file.originalname);

  }
});

var imageAds = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/imageAds');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname);

    callback(null, file.originalname)

  }
});

var test2 = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(null, './image/imageMin');

  },
  filename: (req, file, callback) => {

    console.log(file.originalname);

    callback(null, file.originalname)

  }
});






async function resize(dataName) {

  image = await Jimp.read
    (`./image/imageMax/${dataName}`, (err, file) => {
      if (err) throw err;
      lenna

        .quality(30) // set JPEG quality

        .write(`./image/imageMin/${dataName}`); // save
    })

}
exports.uploadFiles = multer({ storage: storage }).array('image', 3);
exports.docUser = multer({ storage: docUser }).array('image', 2);
exports.signature = multer({ storage: signature }).single('image');

exports.uploadDocShipUser = multer({ storage: docship }).array('image', 5);
exports.uploadchat = multer({ storage: chat }).array('image', 5);
exports.imageAds = multer({ storage: imageAds }).single('image');

exports.imageSlider = multer({ storage: storageSlider }).single('image');






