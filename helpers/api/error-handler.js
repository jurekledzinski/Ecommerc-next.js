const checkError = (error) => {
  const result =
    error.message.indexOf('duplicate key error') !== -1 ? true : false;
  return result;
};

const errorHandler = (error, res) => {
  if (typeof error === 'string') {
    return res.status(400).json({ msgError: error });
  }

  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      msgError: checkError(error) ? 'Email already exist' : error.message,
    });
  }

  if (error.name === 'Unauthorized') {
    return res.status(401).json({ msgError: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      msgError: 'You have to log in',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      msgError: 'Permission required',
    });
  }

  return res.status(500).json({
    msgError: 'Something went wrong. Please try later.',
  });
};

export default errorHandler;
