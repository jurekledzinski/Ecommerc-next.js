import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {} from '../muistyles/DeleteProfileUser.styles';

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '95%', sm: '400px' },
            height: '250px',
            backgroundColor: 'white',
            zIndex: '1',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontFamily: 'Oswald,sans-serif',
              fontWeight: '400',
            }}
          >
            Are you sure you want delete your account?
          </Typography>
          <Box
            sx={{
              width: { xs: '80%', sm: '50%' },
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '10px',
            }}
          >
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
      <Box sx={{ marginBottom: { xs: '15px', sm: 'initial' } }}>
        <Button onClick={handleOpenModal} color="error" variant="contained">
          Delete account
        </Button>
      </Box>
    </>
  );
};

export default DeleteProfileUser;
