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
exports.getUsersHasManyAddress = async (req, res) => {
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

// Function GetUserById
exports.getUsertById = async (req, res) => {
  try {
    const { idParam } = req.params;

    const getData = await User.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
// End Function GetUserById

// Function DeleteUser
exports.deleteUser = async (req, res) => {
  try {
    const { idParam } = req.params;

    // CheckDataById
    const getDataById = await User.findOne({
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
