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

import BreadCramps from './BreadCramps';

const Products = ({ data, endpoints }) => {
  return (
    <Section>
      <BreadCramps endpoints={endpoints} />
      <Grid container spacing={2} sx={containerProductsStyles}>
        {data.map((item, index) => (
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
                        image={item.imageSrc}
                        alt={item.name}
                        sx={cardMediaStyles}
                        srcSet={item.imagesSrcSet.map((item) => item)}
                        sizes={item.sizes.map((item) => item)}
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
                  <Button variant="contained">Add to cart</Button>
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
