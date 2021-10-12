import CustomError from '../customError.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errorMessage: err.message });
  }
  if (err.name === 'ValidationError') {
    const errorMessage = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');

    return res.status(400).json({ errorMessage });
  }
  return res.status(500).json({ errorMessage: 'Server Error' });
};

export default errorHandler;
