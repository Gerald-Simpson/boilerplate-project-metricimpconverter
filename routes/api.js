'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    let jsonResult = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
    if (String(returnNum).includes('invalid')) {
      res.json(returnNum);
    } else {
      res.json(jsonResult);
    }
  });
};
