import ImageKit from 'imagekit';
import fs from 'fs';
import multiparty from 'multiparty';
import { connectDb } from '../../../../utils/db';
import User from '../../../../models/user';
import errorHandler from '../../../../helpers/api/error-handler';
import { isAuth } from '../../../../helpers/api/auth-helper';
import { createRouter } from 'next-connect';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to allow multiparty
  },
};

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
  privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
  urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT,
});

const router = createRouter();

router.use((req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return errorHandler(err, res);
    req.body = fields;
    req.files = files;
    next();
  });
});

connectDb();

router.post(async (req, res) => {
  const idUser = isAuth(req);

  try {
    const [objImage] = req.files.image;
    const nameImage = objImage.originalFilename
      .split('.')
      .slice(0, -1)
      .join('.');

    const data = await fs.promises.readFile(objImage.path);

    const result = await imagekit.upload({
      file: data,
      fileName: nameImage,
      folder: '/Shoppy/avatars-users',
    });

    const user = await User.findById(idUser).select('avatarId');
    const oldAvatarID = user?.avatarId;

    if (oldAvatarID) {
      try {
        const foundAvatar = await imagekit.getFileDetails(oldAvatarID);

        if (foundAvatar.fileId === oldAvatarID) {
          await imagekit.deleteFile(oldAvatarID);
        }
      } catch (err) {}
    }

    const userUpdate = await User.findByIdAndUpdate(
      idUser,
      {
        avatar: `${result.url}/tr:w-200,h-200,fo-face`,
        avatarId: result.fileId,
      },
      { new: true }
    ).select('avatar avatarId');

    return res
      .status(200)
      .json({ msgSuccess: 'Profile image added', data: userUpdate });
  } catch (error) {
    errorHandler(error, res);
  }
});

export default router.handler();
