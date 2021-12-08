import React, { useContext, useEffect, useState } from 'react';

import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';

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

  const handleChooseCategory = (categoryItems) => {
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
    const filterItems = copy.filter(
      (item) => item.category === onlyCategory[0].category
    );
    dispatchStateCategoryBrands({
      type: ADD_CATEGORY_BRANDS,
      data: filterItems,
    });
    setBtnCategory(onlyCategory);
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
                variant="contained"
                sx={buttonProductStyles}
                onClick={() => handleChooseCategory(item.category)}
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
