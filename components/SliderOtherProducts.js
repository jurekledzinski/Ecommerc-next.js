import React, { useEffect, useState } from 'react';
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

const SliderOtherProducts = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const router = useRouter();
  const index = router.asPath.slice(1).indexOf('/');
  const category = router.asPath.slice(1).slice(0, index);

  useEffect(() => {
    const fetchExtraProducts = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/${category}`);
      const data = await response.json();
      setDataProducts(data);
    };
    fetchExtraProducts();
  }, []);

  return (
    <Box style={wrapperSliderOtherProductsStyles}>
      <Typography variant="h5" sx={titlrTopRateStyles}>
        Top rated phones
      </Typography>
      <Splide options={optionsSliderOtherProducts}>
        {dataProducts.map((item, index) => (
          <SplideSlide key={index}>
            <Card sx={{ height: '320px' }}>
              <Link
                href={`http://localhost:3000/${item.category}/${
                  item.brand
                }/model/${item?.name?.toLowerCase()?.replace(/\s/g, '-')}?id=${
                  item._id
                }`}
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
                  value={parseInt(item?.rate)}
                  precision={0.5}
                  readOnly
                  sx={ratingTopRateSliderStyles}
                />
                <Typography variant="h6" sx={titleContentTopRatesTwoStyles}>
                  Price: {item.price}€
                </Typography>
                <Button variant="contained">Add to cart</Button>
              </CardContent>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};
export default SliderOtherProducts;
