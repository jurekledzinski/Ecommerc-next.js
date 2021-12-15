import React, { useContext, useState } from 'react';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
  brandTitleStyles,
  boxBrandStyles,
  cardActionBrandsStyles,
  cardContentBrandsStyles,
  containerBrandsStyles,
  imageBrandsStyles,
  linkBrandStyles,
  loaderBrandsImageStyles,
} from '../muistyles/BrandsProducts.styles';

import { StoreContext } from '../utils/store';

const BrandsProducts = () => {
  const { stateCategoryBrands } = useContext(StoreContext);
  const [isLoad, setIsLoad] = useState(false);

  return (
    <main>
      <Grid container spacing={2} sx={containerBrandsStyles}>
        {stateCategoryBrands.length > 0 &&
          stateCategoryBrands.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card>
                <Link href={`/${item.category}/${item.brand}`} passHref>
                  <a style={linkBrandStyles}>
                    <CardActionArea sx={cardActionBrandsStyles}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.brand}
                          sx={imageBrandsStyles}
                          onLoad={() => setIsLoad(true)}
                        />
                        {!Boolean(isLoad) && (
                          <CircularProgress
                            size={20}
                            thickness={2}
                            sx={loaderBrandsImageStyles}
                          />
                        )}
                      </Box>
                      <CardContent sx={cardContentBrandsStyles}>
                        <Box
                          sx={{
                            ...boxBrandStyles,
                            background: item.background1,
                            background: item.background2,
                            background: item.background3,
                          }}
                        >
                          <Typography variant="h3" sx={brandTitleStyles}>
                            {item.brand}
                          </Typography>
                        </Box>
                      </CardContent>
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
