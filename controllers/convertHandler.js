function ConvertHandler() {
  this.getNum = function (input) {
    let doubleFraction = input.match(/[/]+/g);
    if (doubleFraction === null) {
      doubleFraction = [1];
      //If input contains double fraction, return invalid
    }
    if (doubleFraction.length > 1) {
      return 'invalid number';
    }
    let regex = /^[0-9./]+/;
    let num = input.match(regex);
    if (num === null) return 1; //If no number given, return 1
    let result = Math.round((eval(num[0]) + Number.EPSILON) * 100000) / 100000;
    if (result === 'NaN') {
      return 'invalid number';
    } else {
      return result;
    }
  };

  this.getUnit = function (input) {
    let regex = /[a-zA-Z]+/;
    let unit = input.match(regex)[0].toLowerCase();
    let units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
    if (!units.includes(unit)) {
      return 'invalid unit';
    } else if (unit === 'l') {
      return 'L';
    }
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit === 'mi') {
      return 'km';
    } else if (initUnit === 'km') {
      return 'mi';
    } else if (initUnit === 'lbs') {
      return 'kg';
    } else if (initUnit === 'kg') {
      return 'lbs';
    } else if (initUnit === 'gal') {
      return 'L';
    } else {
      return 'gal';
    }
  };

  this.spellOutUnit = function (unit) {
    if (unit === 'mi') {
      return 'miles';
    } else if (unit === 'km') {
      return 'kilometers';
    } else if (unit === 'lbs') {
      return 'pounds';
    } else if (unit === 'kg') {
      return 'kilograms';
    } else if (unit === 'gal') {
      return 'gallons';
    } else {
      return 'liters';
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      return 'invalid number';
    } else if (initUnit === 'invalid unit') {
      return 'invalid unit';
    } else if (initUnit === 'mi') {
      result = initNum * miToKm;
    } else if (initUnit === 'km') {
      result = initNum / miToKm;
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } else if (initUnit === 'gal') {
      result = initNum * galToL;
    } else if (initUnit === 'l') {
      result = initNum / galToL;
    }
    return Math.round((result + Number.EPSILON) * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      return 'invalid number';
    } else if (initUnit === 'invalid unit') {
      return 'invalid unit';
    } else {
      let result =
        String(initNum) +
        ' ' +
        this.spellOutUnit(initUnit) +
        ' converts to ' +
        String(returnNum) +
        ' ' +
        this.spellOutUnit(returnUnit);
      return result;
    }
  };
}

module.exports = ConvertHandler;
