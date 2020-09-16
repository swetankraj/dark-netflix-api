module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };

  // * The above error is catched by globalErrorHandler in app.js.
};
