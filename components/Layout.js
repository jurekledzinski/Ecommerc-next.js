import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  buttonGroupStyles,
  buttonProductStyles,
  layoutContainerStyles,
  titleProductsStyles,
  wrapperButtonsStyles,
  wrapperTitleStyles,
} from '../muistyles/Layout.styles';

import MainSlider from './MainSlider';

import { ADD_CATEGORY_BRANDS } from '../utils/constants';

import { StoreContext } from '../utils/store';

const createCopyBrands = (productsBrands) => {
  const copyBrands = productsBrands.map((item) => ({ ...item }));
  return copyBrands;
};

const changeArrayBrands = (copy) => {
  const buttonsCategory = copy.reduce((acc, curr) => {
    const temp = acc.find((item) => item.category === curr.category);

    if (!temp) {
      const type = {
        category: curr.category,
      };
      acc.push(type);
    }

    return acc;
  }, []);

  return buttonsCategory;
};

const Layout = ({ brandsProducts, children }) => {
  const { dispatchStateCategoryBrands } = useContext(StoreContext);
  const [btnCategory, setBtnCategory] = useState([]);
  const [btnIndex, setBtnIndex] = useState({
    category: Cookies.get('_cb'),
    index: Number(Cookies.get('_bi')),
  });

  const handleChooseCategory = (categoryItems, index) => {
    Cookies.set('_bi', JSON.stringify(index));
    Cookies.set('_cb', categoryItems);
    setBtnIndex({
      ...btnIndex,
      category: categoryItems,
      index: index,
    });
    const copy = createCopyBrands(brandsProducts);
    const filterItems = copy.filter((item) => item.category === categoryItems);

    dispatchStateCategoryBrands({
      type: ADD_CATEGORY_BRANDS,
      data: filterItems,
    });
  };

  useEffect(() => {
    const copy = createCopyBrands(brandsProducts);
    const onlyCategory = changeArrayBrands(copy);
    const filterItems = copy.filter((item) =>
      Boolean(Cookies.get('_cb'))
        ? item.category === Cookies.get('_cb')
        : item.category === onlyCategory[0].category
    );
    dispatchStateCategoryBrands({
      type: ADD_CATEGORY_BRANDS,
      data: filterItems,
    });
    setBtnCategory(onlyCategory);
    if (!Cookies.get('_bi')) {
      Cookies.set('_bi', '0');
      Cookies.set('_cb', onlyCategory[0].category);
    }
  }, []);

  return (
    <div>
      <MainSlider />
      <Box sx={wrapperTitleStyles}>
        <Typography variant="h4" sx={titleProductsStyles}>
          Our Products
        </Typography>
      </Box>
      <Box sx={wrapperButtonsStyles}>
        <ButtonGroup
          size="large"
          aria-label="small button group"
          sx={buttonGroupStyles}
        >
          {btnCategory.length > 0 &&
            btnCategory.map((item, index) => (
              <Button
                key={index}
                variant={btnIndex.index === index ? 'contained' : 'outlined'}
                sx={buttonProductStyles}
                onClick={() => handleChooseCategory(item.category, index)}
              >
                {item.category}
              </Button>
            ))}
        </ButtonGroup>
      </Box>
      <Container sx={layoutContainerStyles}>{children}</Container>
    </div>
  );
};

export default Layout;

/* <Button sx={buttonProductStyles}>Watches</Button>
<Button sx={buttonProductStyles}>Tablets</Button> */
