import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import {
  bntAddToCartStyles,
  btnStyles,
  descriptionStyles,
  InputNumber,
  priceStyles,
  onStockStyles,
  ratingStyles,
  titleProductStyles,
  wrapperBtnsStyles,
  wrapperDescription,
  wrapperStockStyles,
} from '../muistyles/DescriptionProduct.styles';

const DescriptionProduct = () => {
  return (
    <Box variant="article" sx={wrapperDescription}>
      <Box>
        <Typography variant="h3" sx={titleProductStyles}>
          Iphone 1
        </Typography>
        <Stack spacing={1} sx={ratingStyles}>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            size="medium"
          />
        </Stack>
        <Typography variant="h4" sx={priceStyles}>
          Price: 80.00€
        </Typography>
        <Typography variant="body2" sx={descriptionStyles}>
          Canon's first 4K UHD Camcorder, the GX10 has a compact and portable
          design that delivers outstanding video quality with remarkable detail.
          With a combination of incredible features and functionality, the GX10
          is the ideal camcorder for aspiring filmmakers.
        </Typography>
      </Box>
      <Box>
        <Box sx={wrapperBtnsStyles}>
          <Button variant="contained" sx={btnStyles}>
            -
          </Button>
          <InputNumber type="number" value="1" readOnly />
          <Button variant="contained" sx={btnStyles}>
            +
          </Button>
        </Box>
        <Box sx={wrapperStockStyles}>
          <Button variant="contained" sx={bntAddToCartStyles}>
            Add to cart
          </Button>
          <Typography variant="h5" sx={onStockStyles}>
            In Stock: 14
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DescriptionProduct;
