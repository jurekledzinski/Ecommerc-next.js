import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import {
  cardActionTopRatedStyles,
  cardMediaTopRateStyles,
  optionsSliderOtherProducts,
  ratingTopRateSliderStyles,
  titleContentTopRatesOneStyles,
  titleContentTopRatesTwoStyles,
  titlrTopRateStyles,
  wrapperSliderOtherProductsStyles,
} from '../muistyles/SliderOtherProducts.styles';

import { UPDATE_PRODUCTS_BRAND_ON_STOCK } from '../utils/constants';
import { controlCart } from '../helpers/carthelpers';
import { StoreContext } from '../utils/store';

const SliderOtherProducts = () => {
  const {
    dispatchCart,
    disptachProductsBrand,
    stateCart,
    stateLoginUser,
    stateReviews,
  } = useContext(StoreContext);
  const [dataProducts, setDataProducts] = useState([]);
  const [productsTop, setProductsTop] = useState([]);
  const router = useRouter();
  const index = router.asPath.slice(1).indexOf('/');
  const category = router.asPath.slice(1).slice(0, index);
  const topProducts = useRef([]);

  const handleAddToCart = (idProduct) => {
    const singleProductAdded = dataProducts.find(
      (item) => item._id === idProduct
    );

    let copyProduct = {
      ...singleProductAdded,
      amount: singleProductAdded.onStock,
    };

    controlCart(copyProduct, idProduct, stateCart, dispatchCart);
  };

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

  useEffect(() => {
    topProducts.current = JSON.parse(JSON.stringify(dataProducts));
  }, [dataProducts]);

  useEffect(() => {
    const update = topProducts.current.map((item1) => {
      const product = stateCart.products.find(
        (item2) => item2._id === item1._id
      );
      if (product) {
        return { ...item1, onStock: product.onStock };
      }
      return item1;
    });

    setProductsTop(update);
  }, [stateCart, topProducts.current]);

  useEffect(() => {
    const fetchExtraProducts = async () => {
      const response = await fetch(`/api/v1/${category}`);
      const data = await response.json();
      setDataProducts(data);
    };
    fetchExtraProducts();
  }, [stateReviews]);

  return (
    <Box style={wrapperSliderOtherProductsStyles}>
      <Typography variant="h5" sx={titlrTopRateStyles}>
        Top rated phones
      </Typography>
      <Splide options={optionsSliderOtherProducts}>
        {productsTop.map((item, index) => (
          <SplideSlide key={index}>
            <Card sx={{ height: '320px' }}>
              <Link
                href={`/${item.category}/${item.brand}/model/${item?.name
                  ?.toLowerCase()
                  ?.replace(/\s/g, '-')}?id=${item._id}`}
              >
                <a>
                  <CardActionArea sx={cardActionTopRatedStyles}>
                    <CardMedia
                      component="img"
                      height="150"
                      alt=""
                      src={item.imagesSlider[0]}
                      srcSet={`${item.imagesSlider[0]}?tr=w-100,h-100,cm-pad_resize,bg-transparent`}
                      sizes="100px"
                      sx={cardMediaTopRateStyles}
                    ></CardMedia>
                  </CardActionArea>
                </a>
              </Link>
              <CardContent>
                <Typography variant="h6" sx={titleContentTopRatesOneStyles}>
                  {item.name}
                </Typography>
                <Rating
                  name="half-rating-read"
                  value={parseFloat(item?.rate)}
                  precision={0.5}
                  readOnly
                  sx={ratingTopRateSliderStyles}
                />
                <Typography variant="h6" sx={titleContentTopRatesTwoStyles}>
                  Price: {item.price.toFixed(2)}€
                </Typography>
                <Button
                  disabled={item.onStock === 0 ? true : false}
                  variant="contained"
                  onClick={() => handleAddToCart(item._id)}
                >
                  {item.onStock === 0 ? 'Out of stock' : 'Add to cart'}
                </Button>
              </CardContent>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};
export default SliderOtherProducts;
