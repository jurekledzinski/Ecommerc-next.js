import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { StoreContext } from '../utils/store';

import BreadCramps from './BreadCramps';
import {
  boxProfileLeftStyles,
  boxProfileRightStyles,
  boxProfileWrappperStyles,
  profileAddressStyles,
  SectionProfile,
  titleProfileUpdateStyles,
  titleShippingStyles,
} from '../muistyles/ProfileUser.styles';

import UpdateFormProfile from './UpdateFormProfile';
import FormAddShippingAddress from './FormAddShippingAddress';

const ProfileUser = ({ endpoints }) => {
  const { stateUserProfile } = useContext(StoreContext);
  return (
    <SectionProfile>
      <BreadCramps endpoints={endpoints} />
      <Box sx={boxProfileWrappperStyles}>
        <Box sx={boxProfileLeftStyles}>
          <Typography variant="h4" sx={titleProfileUpdateStyles}>
            Update profile
          </Typography>
          <UpdateFormProfile />
        </Box>
        <Box sx={boxProfileRightStyles}>
          <Typography variant="h4" sx={titleProfileUpdateStyles}>
            {`${stateUserProfile.city ? 'Update' : 'Add'} Shipping address`}
          </Typography>
          <FormAddShippingAddress />
          {stateUserProfile.city ? (
            <>
              <Typography variant="h4" sx={titleShippingStyles}>
                Shipping address
              </Typography>
              <Typography variant="body1" sx={profileAddressStyles}>
                Name: {stateUserProfile.name}
              </Typography>
              <Typography variant="body1" sx={profileAddressStyles}>
                Street: {stateUserProfile.street}
              </Typography>
              <Typography variant="body1" sx={profileAddressStyles}>
                Post Code: {stateUserProfile.zipCode}
              </Typography>
              <Typography variant="body1" sx={profileAddressStyles}>
                City: {stateUserProfile.city}
              </Typography>
              <Typography variant="body1" sx={profileAddressStyles}>
                Country: {stateUserProfile.country}
              </Typography>
            </>
          ) : null}
        </Box>
      </Box>
    </SectionProfile>
  );
};

export default ProfileUser;
