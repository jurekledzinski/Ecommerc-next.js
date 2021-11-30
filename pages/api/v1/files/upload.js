import ImageKit from 'imagekit';
import fs from 'fs';
import nextConnect from 'next-connect';
import multiparty from 'multiparty';
import { connectDb } from '../../../../utils/db';
import User from '../../../../models/user';
import errorHandler from '../../../../helpers/api/error-handler';
import { isAuth } from '../../../../helpers/api/auth-helper';

const middleware = nextConnect();

middleware.use(async (req, res, next) => {
  const form = new multiparty.Form();

  await form.parse(req, function (err, fields, files) {
    req.body = fields;
    req.files = files;
    next();
  });
});

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
  privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
  urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

handler.use(middleware);

connectDb(
  handler.post(async (req, res) => {
    const idUser = isAuth(req);
    try {
      if (req.method === 'POST') {
        const [objImage] = req.files.image;
        const indexDot = objImage.originalFilename.indexOf('.');
        const nameImage = objImage.originalFilename.slice(0, indexDot);
        fs.readFile(objImage.path, async (error, data) => {
          if (error) {
            errorHandler(error, res);
          }

          const result = await imagekit.upload({
            file: data,
            fileName: nameImage,
            folder: '/Shoppy/avatars-users',
          });

          const oldAvatarID = await User.findOne({ _id: idUser }).select([
            '-_id',
            'avatarId',
          ]);

          if (oldAvatarID.avatarId) {
            const foundAvatar = await imagekit.getFileDetails(
              oldAvatarID.avatarId
            );

            if (foundAvatar.fileId === oldAvatarID.avatarId) {
              await imagekit.deleteFile(oldAvatarID.avatarId);
            }
          }

          let userUpdate = await User.findByIdAndUpdate(
            { _id: idUser },
            {
              avatar: `${result.url}/tr:w-200,h-200,fo-face`,
              avatarId: result.fileId,
            },
            { new: true }
          ).select(['avatar', 'avatarId', '-_id']);

          return res
            .status(200)
            .json({ msgSuccess: 'Profile image added', data: userUpdate });
        });
      }
    } catch (error) {
      errorHandler(error, res);
    }
  })
);

export default handler;
