import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import ChangePasswordForm from '../../components/ChangePasswordForm';
import NoPermissionsPage from '../../components/NoPermissionsPage';

const ChangePasswordPage = ({ tokenAccessChange, tokenUrl }) => {
  const router = useRouter();

  if (router.query.tokenUrl !== tokenUrl) {
    return <NoPermissionsPage />;
  }

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return <ChangePasswordForm urlCode={tokenAccessChange} />;
};

export default ChangePasswordPage;

ChangePasswordPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const urlToken = context.query.tokenUrl;

  const response1 = await fetch(
    `http://localhost:3000/api/v1/register?tokenUrl=${urlToken}`
  );

  if (response1.ok) {
    const dataToken = await response1.json();

    if (dataToken.data === urlToken) {
      const response2 = await fetch(
        `http://localhost:3000/api/v1/register?tokenUrl=${urlToken}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      await response2.json();
    }

    return {
      props: {
        tokenAccessChange: dataToken.dataAccess || '',
        tokenUrl: dataToken.data || '',
      },
    };
  } else {
    return {
      props: {
        tokenAccessChange: '',
        tokenUrl: '',
        error: {
          message: `Oops! ${response1.statusText}`,
          statusCode: response1.status,
        },
      },
    };
  }
}
