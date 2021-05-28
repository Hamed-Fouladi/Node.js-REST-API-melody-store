module.exports = (req, res, next) => {
  try {
    const { id } = req.params;

    // here you can put any logic main for all or some of your api's
    // in this example we just checking id persistence. if it absent - your api call ends here and returns an error. it don't reach your controller at all.
    if (!id) return res.status(400).send('"id" param is required');

    // you can pass some value to controller through "req"
    req.testValue = { test: 'Hi! I came from middleware' };

    // if after making all your checkouts here successfully you have to call "next" method to move into controller function
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};
