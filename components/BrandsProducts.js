import React, { useContext } from 'react';

import Link from 'next/link';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';

import {
  brandTitleStyles,
  boxBrandStyles,
  containerBrandsStyles,
  imageStyles,
  linkBrandStyles,
} from '../muistyles/BrandsProducts.styles';

// stateCategoryBrands

import { StoreContext } from '../utils/store';

const BrandsProducts = ({ brands }) => {
  const { stateCategoryBrands } = useContext(StoreContext);

  return (
    <main>
      <Grid container spacing={2} sx={containerBrandsStyles}>
        {stateCategoryBrands.length > 0 &&
          stateCategoryBrands.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card sx={{ height: '150px' }}>
                <Link href={`/${item.category}/${item.brand}`} passHref>
                  <a style={linkBrandStyles}>
                    <CardActionArea>
                      <Box
                        sx={{
                          ...boxBrandStyles,
                          background: item.background1,
                          background: item.background2,
                          background: item.background3,
                        }}
                      >
                        {item.icon && (
                          <img src={item.icon} alt="img" style={imageStyles} />
                        )}
                        <Typography variant="h3" sx={brandTitleStyles}>
                          {item.brand}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </a>
                </Link>
              </Card>
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default BrandsProducts;
