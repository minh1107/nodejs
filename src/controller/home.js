const homeModel = require('../model/homeModel');

exports.getHomePage =  async(req, res) => {
  const message = await homeModel.getMessage();
  res.send(message);
};