import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  boxBtnDeleteUserStyles,
  boxWrapperBtnsDeleteUserStyles,
  boxWrapperDeleteUserStyles,
  titleQuestionDeleteUserStyles,
} from '../muistyles/DeleteProfileUser.styles';

import ModalPopUp from './ModalPopUp';
import SnackBarMessage from './SnackBarMessage';

import { CLEAR_USER_LOGIN_DATA } from '../utils/constants';

import { StoreContext } from '../utils/store';

import { deleteUser } from '../helpers/client/apiHelpers';

const DeleteProfileUser = () => {
  const router = useRouter();
  const { dispatchLoginUser, stateLoginUser } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const idTimeout = useRef(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDeleteUser = async () => {
    const result = await deleteUser(
      'http://localhost:3000/api/v1/register',
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result?.msgSuccess)) {
      Cookies.remove('darkmode');
      Cookies.remove('_mso');
      Cookies.remove('_cb');
      Cookies.remove('_bi');
      dispatchLoginUser({ type: CLEAR_USER_LOGIN_DATA });
      setSuccessMsg(result.msgSuccess);
      idTimeout.current = setTimeout(() => router.push('/'), 1100);
    }
    setOpenModal(false);
  };

  useEffect(() => {
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <>
      <ModalPopUp openModal={openModal} handleClose={handleClose}>
        <Box sx={boxWrapperDeleteUserStyles}>
          <Typography variant="h6" sx={titleQuestionDeleteUserStyles}>
            Are you sure you want delete your account?
          </Typography>
          <Box sx={boxWrapperBtnsDeleteUserStyles}>
            <Button onClick={handleDeleteUser} variant="contained">
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained">
              No
            </Button>
          </Box>
        </Box>
      </ModalPopUp>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Box sx={boxBtnDeleteUserStyles}>
        <Button onClick={handleOpenModal} color="error" variant="contained">
          Delete account
        </Button>
      </Box>
    </>
  );
};

export default DeleteProfileUser;
