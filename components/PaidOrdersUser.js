import React, { useContext } from 'react';

import { StoreContext } from '../utils/store';

import { SectionPaidOrdersUser } from '../muistyles/PaidOrdersUser.styles';

const PaidOrdersUser = () => {
  const { stateOrdersUser } = useContext(StoreContext);
  const {} = stateOrdersUser;

  return <SectionPaidOrdersUser></SectionPaidOrdersUser>;
};

export default PaidOrdersUser;
