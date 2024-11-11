import React, { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { StoreContext } from '../utils/store';

import {
  boxLeftRightOrderPaidStyles,
  boxWrapperContentOrdersPaidStyles,
  boxPaidOrderWrapperTitlesStyles,
  boxPaidOrdersWrapperStyles,
  cardContentItemAmountOrderPaidStyles,
  cardContentItemNameOrderPaidStyles,
  cardContentPriceOrderPaidStyles,
  cardContentWrapperOrderPaidStyles,
  cardOrderPaidStyles,
  iconNoOrdersPaidStyles,
  iconTickOrdersPaidStyles,
  dateOrderPaidTitleStyles,
  deliveredOrderPaidTitleStyles,
  mediaCardOrderPaidStyles,
  orderPaidDetailsTextStyles,
  orderPaidIdTitleStyles,
  SectionPaidOrdersUser,
  titleOrderPaidIconsStyles,
  titlePaidOrdersStyles,
  titleShippingOrdersPaidStyles,
} from '../muistyles/PaidOrdersUser.styles';

const PaidOrdersUser = () => {
  const { stateOrdersUser } = useContext(StoreContext);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <SectionPaidOrdersUser>
      <Typography sx={titlePaidOrdersStyles} variant="h4">
        User Orders
      </Typography>
      {stateOrdersUser && stateOrdersUser.length > 0
        ? stateOrdersUser.map((item, index) => (
            <Box key={index} sx={boxPaidOrdersWrapperStyles}>
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                >
                  <Box sx={boxPaidOrderWrapperTitlesStyles}>
                    <Typography sx={orderPaidIdTitleStyles}>
                      Order: {item.orderId}
                    </Typography>
                    <Typography sx={dateOrderPaidTitleStyles}>
                      Date paid: {new Date(item.datePay).toLocaleString()}
                    </Typography>
                    <Typography sx={deliveredOrderPaidTitleStyles}>
                      Delivered:{' '}
                      {item.isDelivered ? (
                        <CheckCircleOutlineIcon sx={iconTickOrdersPaidStyles} />
                      ) : (
                        <DoNotDisturbIcon sx={iconNoOrdersPaidStyles} />
                      )}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={boxWrapperContentOrdersPaidStyles}>
                    <Box sx={boxLeftRightOrderPaidStyles}>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          marginBottom: '5px',
                        }}
                      >
                        Shipping address:
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        {item.name} {item.surname}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        {item.street}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        {item.city} {item.zipCode}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        {item.country}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          margin: '5px 0',
                        }}
                      >
                        Delivery details:
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        Delivery method: {item.deliveryMethod}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        Delivery time: {item.timeDelivery}{' '}
                        {`${item.timeDelivery > 1 ? 'days' : 'day'}`}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        Delivery price: {item.deliveryPrice.toFixed(2)}€
                      </Typography>
                      <Typography sx={titleOrderPaidIconsStyles}>
                        Order delivered:
                        {item.isDelivered ? (
                          <CheckCircleOutlineIcon
                            sx={iconTickOrdersPaidStyles}
                          />
                        ) : (
                          <DoNotDisturbIcon sx={iconNoOrdersPaidStyles} />
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          margin: '5px 0',
                        }}
                      >
                        Payment details:
                      </Typography>
                      <Typography sx={titleOrderPaidIconsStyles}>
                        Order paid:
                        {item.isPaid ? (
                          <CheckCircleOutlineIcon
                            sx={iconTickOrdersPaidStyles}
                          />
                        ) : (
                          <DoNotDisturbIcon sx={iconNoOrdersPaidStyles} />
                        )}
                      </Typography>
                      <Typography sx={orderPaidDetailsTextStyles}>
                        Payment method: {item.paymentMethod}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          margin: '5px 0',
                        }}
                      >
                        Terms shop:
                      </Typography>
                      <Typography sx={titleOrderPaidIconsStyles}>
                        Terms shop accepted:
                        {item.termsConditions ? (
                          <CheckCircleOutlineIcon
                            sx={iconTickOrdersPaidStyles}
                          />
                        ) : (
                          <DoNotDisturbIcon sx={iconNoOrdersPaidStyles} />
                        )}
                      </Typography>
                    </Box>
                    <Box sx={boxLeftRightOrderPaidStyles}>
                      <Typography
                        variant="h6"
                        sx={titleShippingOrdersPaidStyles}
                      >
                        Ordered items:
                      </Typography>
                      <Box>
                        {item?.cart?.products.map((item1, index) => (
                          <Card key={index} sx={cardOrderPaidStyles}>
                            <CardMedia
                              sx={mediaCardOrderPaidStyles}
                              component="img"
                              image={item1.imagesSlider[0]}
                              alt="image"
                            />
                            <CardContent sx={cardContentWrapperOrderPaidStyles}>
                              <Typography
                                variant="h6"
                                sx={{
                                  ...cardContentItemNameOrderPaidStyles,
                                }}
                              >
                                {item1.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  ...cardContentItemNameOrderPaidStyles,
                                  ...cardContentItemAmountOrderPaidStyles,
                                }}
                              >
                                Amount: {item1.amount - item1.onStock}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  ...cardContentItemNameOrderPaidStyles,
                                  ...cardContentPriceOrderPaidStyles,
                                }}
                              >
                                Price: {item1.price}€
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          fontWeight: '400',
                        }}
                      >
                        Summary:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          fontWeight: '300',
                        }}
                      >
                        Total amount in cart: {item.cart.totalCartAmount}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          fontWeight: '300',
                        }}
                      >
                        Delivery price: {item.deliveryPrice.toFixed(2)}€
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          ...titleShippingOrdersPaidStyles,
                          fontWeight: '300',
                        }}
                      >
                        Total price:{' '}
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{
                            ...titleShippingOrdersPaidStyles,
                            fontWeight: '400',
                          }}
                        >
                          {(
                            item.cart.totalCartPrice + item.deliveryPrice
                          ).toFixed(2)}
                          €
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))
        : null}
    </SectionPaidOrdersUser>
  );
};

export default PaidOrdersUser;
