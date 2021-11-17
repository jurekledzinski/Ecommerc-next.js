import jwt from 'jsonwebtoken';

export const isAuth = (req) => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('Unauthorized');
  const token = authorization.split(' ')[1];
  const { idUser } = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
  return idUser;
};
