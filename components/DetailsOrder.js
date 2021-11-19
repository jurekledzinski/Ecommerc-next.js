import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  boxCardsDetailsWrapper,
  btnDetailsMethodsyStyles,
  detailsCardStyles,
  detailsCardContentStyles,
  detailsCardContentTextStyles,
  detailsCardMediaStyles,
  detailsOrderBoxLeft,
  detailsOrderBoxRight,
  detailsSummaryBtnStyles,
  detailsSummarySubTextStyles,
  SectionDetailsOrder,
  titleDetailsOrderStyles,
} from '../muistyles/DetailsOrder.styles';

const DetailsOrder = () => {
  return (
    <SectionDetailsOrder>
      <Box sx={detailsOrderBoxLeft}>
        <Typography variant="h4" sx={titleDetailsOrderStyles}>
          Order id: 12345678
        </Typography>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, marginBottom: 'initial' }}
        >
          Payment method
        </Typography>
        <Box sx={{ margin: '15px 0' }}>
          <Button
            variant="contained"
            size="large"
            sx={btnDetailsMethodsyStyles}
          >
            Credit Card
          </Button>
        </Box>
        <Typography variant="h4" sx={titleDetailsOrderStyles}>
          Delivery method
        </Typography>
        <Button variant="contained" size="large" sx={btnDetailsMethodsyStyles}>
          Standard 3€
        </Button>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, margin: '15px 0' }}
        >
          Your orders
        </Typography>
        <Box sx={boxCardsDetailsWrapper}>
          {['a', 'b'].map((item) => (
            <Card key={item} sx={detailsCardStyles}>
              <CardMedia
                component="img"
                sx={detailsCardMediaStyles}
                image="https://cdn.pixabay.com/photo/2021/11/03/12/28/forest-6765636_960_720.jpg"
                alt="green iguana"
                height="50px"
              />
              <CardContent sx={detailsCardContentStyles}>
                <Typography variant="h5" component="div">
                  Iphone 8
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={detailsCardContentTextStyles}
                >
                  Price: 130€
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={detailsCardContentTextStyles}
                >
                  Amount: 1
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box sx={detailsOrderBoxRight}>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, marginBottom: '10px' }}
        >
          Summary
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...detailsSummarySubTextStyles, marginBottom: '5px' }}
        >
          Delivery price: 5€
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={detailsSummarySubTextStyles}
        >
          Total price: 260€
        </Typography>
        <Button variant="contained" size="large" sx={detailsSummaryBtnStyles}>
          Checkout
        </Button>
      </Box>
    </SectionDetailsOrder>
  );
};

export default DetailsOrder;
