// src/utils/responseHelper.js

module.exports = {
  success: (res, data = null, message = "Success", code = 200) => {
    return res.status(code).json({
      success: true,
      message,
      data,
      errors: null,
    });
  },

  fail: (res, message = "Something went wrong", code = 400, errors = null) => {
    return res.status(code).json({
      success: false,
      message,
      data: null,
      errors,
    });
  }
};
