import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { Section } from '../muistyles/Products.styles';

import {
  aTagStyles,
  boxWrapper,
  cardContentStyles,
  cardMediaStyles,
  cardStyles,
  containerProductsStyles,
  productTitleStyles,
  productBoxesStyles,
} from '../muistyles/Products.styles';

import { UPDATE_PRODUCTS_BRAND_ON_STOCK } from '../utils/constants';

import { StoreContext } from '../utils/store';
import { controlCart } from '../helpers/carthelpers';

import BreadCramps from './BreadCramps';

const Products = ({ endpoints }) => {
  const {
    dispatchCart,
    disptachProductsBrand,
    stateCart,
    stateLoginUser,
    stateProductsBrand,
  } = useContext(StoreContext);

  const handleAddToCart = (idProduct) => {
    const singleProductAdded = stateProductsBrand.find(
      (item) => item._id === idProduct
    );

    let copyProduct = {
      ...singleProductAdded,
      amount: singleProductAdded.onStock,
    };

    controlCart(copyProduct, idProduct, stateCart, dispatchCart);
  };

  //   TODO: Zmiana

  useEffect(() => {
    if (!Boolean(stateLoginUser.tokenAccess)) {
      localStorage.setItem('cart', JSON.stringify(stateCart));
    }
    stateCart.products.forEach((item) => {
      disptachProductsBrand({
        type: UPDATE_PRODUCTS_BRAND_ON_STOCK,
        productId: item._id,
        amountOnStock: item.onStock,
      });
    });
  }, [stateCart]);

  return (
    <Section>
      <BreadCramps endpoints={endpoints} />
      <Grid container spacing={2} sx={containerProductsStyles}>
        {stateProductsBrand.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card sx={cardStyles}>
              <Link
                href={`/${item.category}/${item.brand}/model/${item?.name
                  ?.toLowerCase()
                  ?.replace(/\s/g, '-')}?id=${item._id}`}
                passHref
              >
                <a style={aTagStyles}>
                  <CardActionArea>
                    <Box sx={productBoxesStyles}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={item.imagesSlider[0]}
                        alt={item.name}
                        sx={cardMediaStyles}
                        srcSet={`${item.imagesSlider[0]}?tr=w-250,h-250,cm-pad_resize,bg-transparent`}
                        sizes="250px"
                      />
                    </Box>
                  </CardActionArea>
                </a>
              </Link>
              <CardContent sx={cardContentStyles}>
                <Typography variant="h6" sx={productTitleStyles}>
                  {item.name}
                </Typography>
                <Typography variant="h6" sx={productTitleStyles}>
                  Price: {item.price}€
                </Typography>
                <Box sx={boxWrapper}>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item._id)}
                    disabled={item.onStock === 0 ? true : false}
                  >
                    {item.onStock === 0 ? 'Out of stock' : 'Add to cart'}
                  </Button>
                  <Typography variant="body1" sx={productTitleStyles}>
                    On stock: {item.onStock}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Products;
