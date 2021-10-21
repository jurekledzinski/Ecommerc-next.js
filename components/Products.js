import Link from "next/link";
import {
  Breadcrumbs,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { Section } from "../muistyles/Products.styles";

import {
  aTagStyles,
  BreadLink,
  boxWrapper,
  cardContentStyles,
  cardMediaStyles,
  cardStyles,
  containerProductsStyles,
  productTitleStyles,
  productBoxesStyles,
} from "../muistyles/Products.styles";

const Products = ({ data }) => {
  return (
    <Section>
      <Box
        sx={{
          paddingLeft: (theme) => theme.spacing(3),
          marginTop: (theme) => theme.spacing(3),
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">
            <BreadLink>Home</BreadLink>
          </Link>
          <Link href="/apple">
            <BreadLink>Apple</BreadLink>
          </Link>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2} sx={containerProductsStyles}>
        {data.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card sx={cardStyles}>
              <Link href={item.url} passHref>
                <a style={aTagStyles}>
                  <CardActionArea>
                    <Box sx={productBoxesStyles}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={item.mainImage}
                        alt={item.name}
                        sx={cardMediaStyles}
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
