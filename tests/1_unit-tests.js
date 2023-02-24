const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('unit tests', function () {
  suite('getNum Tests', function () {
    test('correctly read a whole number input', function () {
      assert.strictEqual(convertHandler.getNum('5mi'), 5);
      assert.strictEqual(convertHandler.getNum('2km'), 2);
      assert.strictEqual(convertHandler.getNum('9lbs'), 9);
    });
    test('correctly read a decimal number input', function () {
      assert.strictEqual(convertHandler.getNum('5.5mi'), 5.5);
      assert.strictEqual(convertHandler.getNum('2.2km'), 2.2);
      assert.strictEqual(convertHandler.getNum('9.9lbs'), 9.9);
    });
    test('correctly read a fractional input', function () {
      assert.strictEqual(convertHandler.getNum('3/2mi'), 1.5);
      assert.strictEqual(convertHandler.getNum('5/2km'), 2.5);
      assert.strictEqual(convertHandler.getNum('9/3lbs'), 3);
    });
    test('correctly read a fractional input with a decimal', function () {
      assert.strictEqual(convertHandler.getNum('1.5/1mi'), 1.5);
      assert.strictEqual(convertHandler.getNum('3.5/1km'), 3.5);
      assert.strictEqual(convertHandler.getNum('3/1.5lbs'), 2);
    });
    test('correctly return an error on a double-fraction ie 3/2/3', function () {
      assert.strictEqual(convertHandler.getNum('3/2/3mi'), 'invalid number');
      assert.strictEqual(convertHandler.getNum('3/2/6km'), 'invalid number');
      assert.strictEqual(convertHandler.getNum('5/2/0lbs'), 'invalid number');
    });
    test('correctly default to a numerical input of 1 when no numerical input is provided', function () {
      assert.strictEqual(convertHandler.getNum('mi'), 1);
      assert.strictEqual(convertHandler.getNum('km'), 1);
      assert.strictEqual(convertHandler.getNum('lbs'), 1);
    });
  });
  suite('getUnit Tests', function () {
    test('correctly read each valid input unit.', function () {
      assert.strictEqual(convertHandler.getUnit('5mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('5km'), 'km');
      assert.strictEqual(convertHandler.getUnit('5lbs'), 'lbs');
      assert.strictEqual(convertHandler.getUnit('5kg'), 'kg');
      assert.strictEqual(convertHandler.getUnit('5gal'), 'gal');
      assert.strictEqual(convertHandler.getUnit('5l'), 'l');
    });
    test('should correctly return an error for an invalid input unit.', function () {
      assert.strictEqual(convertHandler.getUnit('5mil'), 'invalid unit');
      assert.strictEqual(convertHandler.getUnit('9kilm'), 'invalid unit');
      assert.strictEqual(convertHandler.getUnit('3lit'), 'invalid unit');
    });
  });
  suite('getReturnUnit Tests', function () {
    test('should return the correct return unit for each valid input unit.', function () {
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'l');
      assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
    });
  });
  suite('spellOutUnit Tests', function () {
    test('should correctly return the spelled-out string unit for each valid input unit.', function () {
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
    });
  });
  suite('convert Tests', function () {
    test('should correctly convert gal to L.', function () {
      assert.strictEqual(convertHandler.convert(5, 'gal'), 18.92705);
    });
    test('should correctly convert L to gal.', function () {
      assert.strictEqual(convertHandler.convert(5, 'l'), 1.32086);
    });
    test('should correctly convert mi to km.', function () {
      assert.strictEqual(convertHandler.convert(5, 'mi'), 8.0467);
    });
    test('should correctly convert km to mi.', function () {
      assert.strictEqual(convertHandler.convert(5, 'km'), 3.10686);
    });
    test('should correctly convert lbs to kg.', function () {
      assert.strictEqual(convertHandler.convert(5, 'lbs'), 2.26796);
    });
    test('should correctly convert kg to lbs.', function () {
      assert.strictEqual(convertHandler.convert(5, 'kg'), 11.02312);
    });
  });
});
