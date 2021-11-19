import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  boxCardsWrapper,
  boxBtnsDeliveryStyles,
  btnsDeliveryStyles,
  btnPaymentStyles,
  btnPlaceOrderStyles,
  cardContentDeliveryStyles,
  cardContentTextStyles,
  cardDeliveryStyles,
  cardMediaDeliveryStyles,
  placeOrderBoxLeft,
  placeOrderBoxRight,
  SectionPlaceOrderShip,
  summaryPlaceOrderTextStyles,
  titlePlaceOrderStyles,
} from '../muistyles/PlaceOrder.styles';

const PlaceOrder = () => {
  return (
    <SectionPlaceOrderShip>
      <Box sx={placeOrderBoxLeft}>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Select method payment
        </Typography>
        <Box sx={{ margin: '15px 0' }}>
          <Button variant="contained" size="large" sx={btnPaymentStyles}>
            Credit Card
          </Button>
        </Box>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Select method delivery
        </Typography>
        <Box sx={boxBtnsDeliveryStyles}>
          <Button variant="contained" size="large" sx={btnsDeliveryStyles}>
            Standard 3€
          </Button>
          <Button variant="outlined" size="large" sx={btnsDeliveryStyles}>
            Next Day 5€
          </Button>
          <Button variant="outlined" size="large" sx={btnsDeliveryStyles}>
            Abroad 8€
          </Button>
        </Box>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Your orders
        </Typography>
        <Box sx={boxCardsWrapper}>
          {['a', 'b', 'c', 'd'].map((item) => (
            <Card key={item} sx={cardDeliveryStyles}>
              <CardMedia
                component="img"
                sx={cardMediaDeliveryStyles}
                image="https://cdn.pixabay.com/photo/2021/11/03/12/28/forest-6765636_960_720.jpg"
                alt="green iguana"
                height="50px"
              />
              <CardContent sx={cardContentDeliveryStyles}>
                <Typography variant="h5" component="div">
                  Iphone 8
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={cardContentTextStyles}
                >
                  Price: 130€
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={cardContentTextStyles}
                >
                  Amount: 1
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Box sx={placeOrderBoxRight}>
        <Typography
          variant="h4"
          sx={{ ...titlePlaceOrderStyles, marginBottom: '10px' }}
        >
          Summary
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...summaryPlaceOrderTextStyles, marginBottom: '5px' }}
        >
          Delivery price: 5€
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={summaryPlaceOrderTextStyles}
        >
          Total price: 260€
        </Typography>
        <Button variant="contained" size="large" sx={btnPlaceOrderStyles}>
          Place order
        </Button>
      </Box>
    </SectionPlaceOrderShip>
  );
};

export default PlaceOrder;
