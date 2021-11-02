import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  boxButtonsStyles,
  btnRemoveStyles,
  boxTitleStyles,
  btnControlQtyStyles,
  cardContentStyles,
  cardTypographyStyles,
  cardMediaStyles,
  cardStyles,
  cardStylesTwo,
  cardStylesThree,
  cartTitleStyles,
  dividerStyles,
  gridContainerOneStyles,
  gridContainerTwoStyles,
  InputNumber,
  itemsTitleStyles,
  Section,
  subtitleStyles,
} from '../muistyles/Cart.styles';

import { headersCart } from '../utils/data';

const Cart = () => {
  return (
    <Section>
      <Box sx={boxTitleStyles}>
        <Typography variant="h6" sx={cartTitleStyles}>
          Shopping Cart
        </Typography>
        <Typography variant="h6" sx={itemsTitleStyles}>
          1 Item
        </Typography>
      </Box>
      <Divider variant="middle" sx={dividerStyles} />
      <Grid container spacing={1} sx={gridContainerOneStyles}>
        {headersCart.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Typography variant="subtitle1" sx={subtitleStyles}>
              {item}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <article>
        <Grid container spacing={0.5} sx={gridContainerTwoStyles}>
          <Grid item xs={3}>
            <Card sx={cardStyles}>
              <CardMedia
                component="img"
                height="40"
                image="/images/Iphone-8-front-1.png"
                alt="Iphone 8"
                sx={cardMediaStyles}
              />
              <CardContent sx={cardContentStyles}>
                <Typography variant="body2" sx={cardTypographyStyles}>
                  Iphone 8 Pro 128GB
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={cardStylesTwo}>
              <InputNumber type="number" value="1" readOnly />
              <Box sx={boxButtonsStyles}>
                <Button variant="contained" sx={btnControlQtyStyles}>
                  -
                </Button>
                <Button variant="contained" sx={btnControlQtyStyles}>
                  +
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={cardStyles}>
              <Typography variant="h6" sx={cardStylesThree}>
                125€
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={cardStyles}>
              <Typography variant="h6" sx={cardStylesThree}>
                125€
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" sx={btnRemoveStyles}>
          Remove item
        </Button>
        <Divider variant="middle" sx={dividerStyles} />
      </article>
    </Section>
  );
};

export default Cart;
