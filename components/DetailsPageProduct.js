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
import { useRoutesHook } from '../customHooks/useRoutesHook';
import BreadCramps from './BreadCramps';
import SliderThumbnails from './SliderThumbnails';
import DescriptionProduct from './DescriptionProduct';
import DetailsAndReviews from './DetailsAndReviews';
import SliderOtherProducts from './SliderOtherProducts';

import {
  containerDetailsStyles,
  leftSideStyles,
  rightSlideStyles,
  Section,
} from '../muistyles/DetailsPageProduct.styles';

const DetailsPageProduct = () => {
  const { endpoints } = useRoutesHook();
  console.log(endpoints, ' details product page breadcramps');

  return (
    <Section>
      <BreadCramps endpoints={endpoints} />
      <Grid container spacing={2} sx={containerDetailsStyles}>
        <Grid item xs={12} sm={6} sx={leftSideStyles}>
          <SliderThumbnails />
        </Grid>
        <Grid item xs={12} sm={6} sx={rightSlideStyles}>
          <DescriptionProduct />
        </Grid>
      </Grid>
      <DetailsAndReviews />
      <SliderOtherProducts />
    </Section>
  );
};

export default DetailsPageProduct;
