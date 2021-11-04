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

const data = [
  {
    imageSrc:
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png',
    imagesSrcSet: [
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png?tr=w-100 100w',
    ],
    sizes: ['100px'],
    price: 100,
    rates: 4.5,
  },
  {
    imageSrc:
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png',
    imagesSrcSet: [
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png?tr=w-100 100w',
    ],
    sizes: ['100px'],
    price: 100,
    rates: 4.5,
  },
  {
    imageSrc:
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png',
    imagesSrcSet: [
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png?tr=w-100 100w',
    ],
    sizes: ['100px'],
    price: 100,
    rates: 4.5,
  },
  {
    imageSrc:
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png',
    imagesSrcSet: [
      'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png?tr=w-100 100w',
    ],
    sizes: ['100px'],
    price: 100,
    rates: 4.5,
  },
];

const SliderOtherProducts = () => {
  return (
    <Box style={wrapperSliderOtherProductsStyles}>
      <Typography variant="h5" sx={titlrTopRateStyles}>
        Top rated phones
      </Typography>
      <Splide options={optionsSliderOtherProducts}>
        {data.map((item, index) => (
          <SplideSlide key={index}>
            <Card sx={{ height: '320px' }}>
              <Link href="#">
                <a>
                  <CardActionArea sx={cardActionTopRatedStyles}>
                    <CardMedia
                      component="img"
                      height="150"
                      alt=""
                      src={item.imageSrc}
                      srcSet={item.imagesSrcSet.map((item) => item)}
                      sizes={item.sizes.map((item) => item)}
                      sx={cardMediaTopRateStyles}
                    ></CardMedia>
                  </CardActionArea>
                </a>
              </Link>
              <CardContent>
                <Typography variant="h6" sx={titleContentTopRatesOneStyles}>
                  Iphone 1
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                  sx={ratingTopRateSliderStyles}
                />
                <Typography variant="h6" sx={titleContentTopRatesTwoStyles}>
                  Price: 80.00€
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
