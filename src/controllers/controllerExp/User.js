const { User, Address } = require("../../../models");

const joi = require("joi");

// Function GetUsers
exports.getUsers = async (req, res) => {
  try {
    const getDatas = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (getDatas == null) {
      return res.send({
        status: "Response Failed",
        message: "Data is empty!",
      });
    }

    res.send({
      status: "Response Success",
      message: "Get data Success.",
      dataCount: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Get data Error!",
      error: error,
    });
  }
};
// End Function GetUsers

// Function GetUsersBelongsToAddress
exports.getUsersBelongsToAddress = async (req, res) => {
  try {
    // CheckDataFromMiddleware
    // const dataAutMiddleware = req.user;
    // EndCheckDataFromMiddleware

    // const pathFile = process.env.PATCH_UPLOADS;

    let getDatas = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Address,
        as: "address",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      },
    });

    if (getDatas == null) {
      return res.send({
        status: "Response Failed",
        message: "Data is empty!",
      });
    }

    // const parseJSON = JSON.parse(JSON.stringify(getDatas));

    // getDatas = parseJSON.map((item) => {
    //   return {
    //     ...item,
    //     thumbnail: pathFile + item.thumbnail,
    //     attache: pathFile + item.attache,
    //   };
    // });

    // res.send({
    //   status: "Response Success",
    //   message: "Get data Success.",
    //   dataCount: getDatas.length,
    //   dataAutMiddleware,
    //   data: getDatas,
    // });

    res.send({
      status: "Response Success",
      message: "Get data Success.",
      dataCount: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Get data Error!",
      error: error,
    });
  }
};
// End Function GetUsersBelongsToAddress

// Function GetMusicById
exports.getMusictById = async (req, res) => {
  try {
    const { idParam } = req.params;

    const getData = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (getData == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }

    res.send({
      status: "Response Success",
      message: "Get data Success.",
      idParam: idParam,
      data: getData,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Get data Error!",
      error: error,
    });
  }
};
// End Function GetMusicById

// Function AddMusic
exports.addMusic = async (req, res) => {
  try {
    const dataAdd = req.body; //Data will Added

    // ChekcValidationInput
    const schema = joi.object({
      title: joi.string().min(1).required(),
      year: joi.string().min(1).required(),
      thumbnail: joi.string(),
      attache: joi.string(),
      artistId: joi.string().min(1).required(),
    });
    const { error } = schema.validate(dataAdd);
    if (error) {
      return res.send({
        status: "Response Failed",
        message: error.details[0].message,
        data: dataAdd,
      });
    }
    // EndChekcValidationInput

    // AddData
    const dataAdded = await Music.create(dataAdd);
    if (!dataAdded) {
      return res.send({
        status: "Response Failed",
        message: `Add data Failed!`,
      });
    }
    // EndAddData

    // GetDataById
    const idMusic = dataAdded.id;
    const getData = await Music.findOne({
      where: {
        id: idMusic,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
    });
    if (getData == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idMusic} Not Found!`,
        data: null,
      });
    }
    // GetDataById

    res.send({
      statuss: "Response Success",
      message: "Add data Success.",
      dataAdded: getData,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Add Data Error!",
      error: error,
    });
  }
};
// End Function AddMusic

// Function AddMusicWithFile
exports.addMusicWithFile = async (req, res) => {
  try {
    const dataAdd = req.body; //Data will Added

    // ChekcValidationInput
    const schema = joi.object({
      title: joi.string().min(1).required(),
      year: joi.string().min(1).required(),
      artistId: joi.string().min(1).required(),
      thumbnail: joi.string().min(3),
      attache: joi.string().min(3),
    });
    const { error } = schema.validate(dataAdd);
    if (error) {
      return res.send({
        status: "Validate Failed",
        message: error.details[0].message,
        data: dataAdd,
      });
    }
    // EndChekcValidationInput

    // ModifValueDataInput
    const thumbnail = req.files.imageFile[0].filename;
    const attache = req.files.audioFile[0].filename;
    const dataWithUpload = {
      ...dataAdd,
      thumbnail,
      attache,
    };
    // console.log("dataWithUpload: ", dataWithUpload);
    // ModifValueDataInput

    // AddData
    const dataAdded = await Music.create(dataWithUpload);
    if (!dataAdded) {
      return res.send({
        status: "Response Failed",
        message: `Add data Failed!`,
      });
    }
    // EndAddData

    // GetDataById;
    const idMusic = dataAdded.id;
    const getData = await Music.findOne({
      where: {
        id: idMusic,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
    });
    if (getData == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idMusic} Not Found!`,
        data: null,
      });
    }
    // GetDataById

    res.send({
      status: "Response Success",
      message: "Add data Success.",
      dataAdded: getData,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: `Add Data Error!  ${error}`,
    });
  }
};
// End Function AddMusicWithFile

// Function UpdateMusic
exports.updateMusic = async (req, res) => {
  try {
    const { idParam } = req.params;

    // CheckDataById
    const getDataById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (getDataById == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndCheckDataById

    // UpdateData
    const dataUpdate = req.body; //Data will updated
    const dataUpdated = await Music.update(dataUpdate, {
      where: {
        id: idParam,
      },
    });
    if (!dataUpdated) {
      return res.send({
        status: "Response Failed",
        message: `Update Data Failed!`,
        data: null,
      });
    }
    // EndUpdateData

    // getDataAfterUpdateById
    const getDataAfterUpdateById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    // getDataAfterUpdateById

    if (getDataAfterUpdateById == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndgetUserAfterUpdateById

    res.send({
      status: "Response Success",
      message: "Update data Success.",
      idParam: idParam,
      dataUpdated: getDataAfterUpdateById,
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Update Error!",
      error: error,
    });
  }
};
// End Function UpdateMusic

// Function DeleteArtist
exports.deleteMusic = async (req, res) => {
  try {
    const { idParam } = req.params;

    // CheckDataById
    const getDataById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (getDataById == null) {
      return res.send({
        status: "Response Failed",
        message: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndCheckDataById

    // DeleteData
    const deleteData = await Music.destroy({
      where: {
        id: idParam,
      },
    });
    if (!deleteData) {
      return res.send({
        status: "Response Failed",
        message: `Delete data Failed!`,
        data: null,
      });
    }
    // EndDelete

    res.send({
      status: "Response Success",
      message: "Delete data Success.",
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Delete Error!",
      error: error,
    });
  }
};
// End Function DeleteArtist

// Template Function
exports.templateFunction = async (req, res) => {
  try {
    res.send({
      status: "Response Success",
      message: "Success.",
    });
  } catch (error) {
    return res.send({
      status: "Response Failed",
      message: "Error!",
      error: error,
    });
  }
};
// End Template Function
