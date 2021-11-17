const errorHandler = (error, res) => {
  console.log('error handling funkcja api', error);
  if (typeof error === 'string') {
    // custom application error
    return res.status(400).json({ msgError: error });
  }

  if (error.name === 'Unauthorized') {
    // jwt authentication error
    return res.status(401).json({ msgError: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      msgError: 'Unauthorized',
    });
  }

  // default to 500 server error
  return res.status(500).json({
    msgError: error.message,
  });
};

export default errorHandler;
