import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';

import { USER_LOGIN_DATA } from '../utils/constants';

import SnackBarMessage from './SnackBarMessage';

import { StoreContext } from '../utils/store';

import { addImageProfile } from '../helpers/client/apiHelpers';

import {
  addProfileImageBtnStyles,
  cardAvatarProfileStyles,
  loaderImageAvatarProfile,
  FileNameTag,
  formAddImageStyles,
  FormMsgAvatarProfile,
  InputFile,
  LabelFileTag,
} from '../muistyles/AddImageProfile.styles';

const ProfileImage = () => {
  const { dispatchLoginUser, stateLoginUser } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [nameFile, setNameFile] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      image: '',
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image);

    const result = await addImageProfile(
      '/api/v1/files/upload',
      formData,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result.msgSuccess)) {
      const updateUser = {
        tokenAccess,
        user: {
          ...result.data,
          name: stateLoginUser.user.name,
          _id: stateLoginUser.user._id,
        },
      };
      setSuccessMsg(result.msgSuccess);
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: updateUser });
    }
  };

  useEffect(() => {
    if (Object.keys(stateLoginUser).length > 0) {
      const defaultValues = {
        image: '',
      };
      reset(defaultValues);
    }
  }, [stateLoginUser, reset]);

  const errorMessage = (errorMsg) => {
    return <FormMsgAvatarProfile>{errorMsg}</FormMsgAvatarProfile>;
  };

  return (
    <>
      {stateLoginUser.user?.avatar && (
        <Card sx={cardAvatarProfileStyles}>
          <CardMedia
            component="img"
            height="50"
            image={stateLoginUser.user.avatar}
            alt="User avatar"
            onLoad={() => setIsLoad(true)}
          />
          {!Boolean(isLoad) && (
            <CircularProgress
              size={15}
              thickness={2}
              sx={loaderImageAvatarProfile}
            />
          )}
        </Card>
      )}
      <Box
        component="form"
        sx={formAddImageStyles}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SnackBarMessage
          errorMsg={errorMsg}
          successMsg={successMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
        {errors.image && errorMessage(errors.image.message)}
        <Controller
          name="image"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Image is required',
            },
          }}
          render={({ field }) => (
            <LabelFileTag htmlFor="contained-button-file">
              <InputFile
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                  setNameFile(e.target.files[0].name);
                }}
              />
              <Button variant="contained" component="span">
                Upload image
              </Button>
              <FileNameTag>{nameFile}</FileNameTag>
            </LabelFileTag>
          )}
        />
        <Button
          variant="contained"
          size="large"
          sx={addProfileImageBtnStyles}
          type="submit"
        >
          Add profile image
        </Button>
      </Box>
    </>
  );
};

export default ProfileImage;
