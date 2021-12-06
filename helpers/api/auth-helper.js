import jwt from 'jsonwebtoken';

export const isAuth = (req) => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('Unauthorized');
  const token = authorization.split(' ')[1];
  const { idUser } = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
  return idUser;
};

export const isAuthUser = (token) => {
  const { email } = jwt.verify(token, process.env.JWT_SECRET_FORGET_PASSWORD);
  return email;
};

export const isAccessTokenChangePassword = (token) => {
  const { email } = jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN_ACCESS_CHANGE_PASSWORD
  );
  return email;
};
