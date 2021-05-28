const { melodies } = require('../../../database/models');

module.exports = {
  // EXAMPLE API
  getMelodyById: async (req, res) => {
    try {
      const { id } = req.params;

      // getting our testValue from req, that we put in req in middleware
      const { test } = req.testValue;
      // param validation.
      // here you can add additional validation for params value type or some other specific validation(date, length, etc.)
      // or better to use some global library for validation all params and doing it in some middleware not here
      if (isNaN(id)) return res.status(400).send('"id" should be a number');

      // database querying. you have to import target table from sequelize models for this purpose
      const result = await melodies.findOne({ where: { id } });

      // returning result
      return res.status(200).json({ melody: result, middlewareValue: test });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  },
};
