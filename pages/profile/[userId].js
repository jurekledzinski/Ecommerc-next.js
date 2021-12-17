import cookie from 'cookie';
import React, { useContext, useEffect, useState } from 'react';
import { USER_DATA_PROFILE, USER_LOGIN_DATA } from '../../utils/constants';

import { StoreContext } from '../../utils/store';

import UserProfile from '../../components/ProfileUser';
import { useRoutesHook } from '../../customHooks/useRoutesHook';
import { getProfile } from '../../helpers/client/apiHelpers';

const ProfileUser = ({ user }) => {
  const { stateLoginUser, dispatchLoginUser, dispatchUserProfile } =
    useContext(StoreContext);
  const { endpoints } = useRoutesHook();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (stateLoginUser?.tokenAccess) {
      const fetchData = async () => {
        const result = await getProfile(
          '/api/v1/profile',
          stateLoginUser.tokenAccess,
          setErrorMsg
        );

        if (result?.userData) {
          const { userData } = result;
          dispatchUserProfile({ type: USER_DATA_PROFILE, data: userData });
        }
      };
      fetchData();
    }
  }, [stateLoginUser]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  return <UserProfile endpoints={endpoints} />;
};

export default ProfileUser;

export async function getServerSideProps(context) {
  const domainUrl = context.req.headers.host;

  const response = await fetch(`https://${domainUrl}/api/v1/refresher-access`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'applications/json',
      credentials: 'include',
      cookie: JSON.stringify(context.req.cookies),
    },
  });

  if (response.ok) {
    const data = await response.json();
    const { tokenAccess, user } = data;

    if (data.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('_sp', data.user.tokenRefresh, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        })
      );
    }

    let dataChange;
    if (data.tokenAccess) {
      dataChange = {
        tokenAccess: tokenAccess,
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar ? user.avatar : '',
          avatarId: user.avatarId ? user.avatarId : '',
        },
      };
    }

    return {
      props: {
        user: dataChange || {},
      },
    };
  } else {
    return {
      props: {
        user: {},
        error: {
          message: `Oops! ${response.statusText}`,
          statusCode: response.status,
        },
      },
    };
  }
}
