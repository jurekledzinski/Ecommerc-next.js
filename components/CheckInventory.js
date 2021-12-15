import React, {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import {
  boxApplyChangeInventoryStyles,
  bowInventoryStyles,
  boxBtnsInventoryWrapperStyles,
  boxCardContentInventoryStyles,
  boxCardMediaInventoryStyles,
  cardInventoryStyles,
  cardMediaInventoryStyles,
  boxCheckInventoryWrapStyles,
  FormMsgInvetory,
  formControlLabelInventoryStyles,
  mainTitleInventoryStyles,
  subtitleInventoryBoxStyles,
  titleCardContentInventoryStyles,
} from '../muistyles/CheckInventory.styles';

import SnackBarMessage from './SnackBarMessage';

import { HIDE_MODAL } from '../utils/constants';

import { controlCart, controlInventory } from '../helpers/carthelpers';

import { StoreContext } from '../utils/store';

const CheckInventory = forwardRef((props, ref) => {
  const {
    stateCart,
    stateInventory,
    stateLoginUser,
    dispatchCart,
    dispatchModal,
    disptachProductsBrand,
    dispatchDetailsProduct,
  } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);
  const addedAmountToCart = 1;
  const flagTemp = false;
  const removeProductFlag = true;

  const createCopyCart = () => {
    const copyCart = {
      ...stateCart,
      products: stateCart.products.map((item1) => ({
        ...item1,
        imagesSlider: item1.imagesSlider.map((item2) => item2),
        details: item1.details.map((item3) => ({ ...item3 })),
      })),
    };

    return copyCart;
  };

  const createDefaultValues = () => {
    const defaultName = stateInventory.map((item) => item?._id);
    const newDef = defaultName.reduce((ac, cu) => ({ ...ac, [cu]: '' }), {});
    return newDef;
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: createDefaultValues(),
  });

  const updateCart = (data) => {
    const copyCart = createCopyCart();
    const dataForm = Object.keys(data).reduce((arr, key) => {
      const singleItem = { id: key, value: Number(data[key]) };
      return [...arr, singleItem];
    }, []);

    const updateCopyCart = {
      ...copyCart,
      products: copyCart.products.map((item1) => {
        const singleItem = stateInventory.find(
          (item2) => item1._id === item2._id
        );

        return {
          ...item1,
          originalStock: Boolean(singleItem) && singleItem.onStock,
        };
      }),
    };

    const toRemoveItems = updateCopyCart.products.filter((item) => {
      const noInStock = dataForm.find(
        (item2) => item._id === item2.id && item2.value === 0
      );
      if (Boolean(noInStock)) return item._id === noInStock.id;
    });

    if (toRemoveItems.length > 0) {
      const isInventory = true;
      toRemoveItems.forEach((item) => {
        controlCart(
          item,
          item._id,
          copyCart,
          dispatchCart,
          addedAmountToCart,
          flagTemp,
          removeProductFlag,
          disptachProductsBrand,
          dispatchDetailsProduct,
          isInventory,
          item.originalStock
        );
      });
    }

    const changedStockItems = updateCopyCart.products.filter((item) => {
      const inStock = dataForm.find(
        (item2) => item._id === item2.id && item2.value !== 0
      );
      if (Boolean(inStock)) return item._id === inStock.id;
    });

    if (changedStockItems.length > 0) {
      changedStockItems.forEach((item) => {
        controlInventory(
          item,
          item._id,
          dispatchCart,
          item.amount - item.onStock - item.originalStock
        );
      });
    }
  };

  const modalHide = () => {
    setSuccessMsg('Cart updated');
    idTimeout1.current = setTimeout(
      () => dispatchModal({ type: HIDE_MODAL }),
      500
    );
  };

  const onSubmit = async (data) => {
    if (!Boolean(tokenAccess)) {
      updateCart(data);
      modalHide();
    } else {
      updateCart(data);
      modalHide();
    }
  };

  const handleBackToStore = () => {
    dispatchModal({ type: HIDE_MODAL });
  };

  const errorMessage = (error, idItem) => {
    return <FormMsgInvetory>{error[idItem].message}</FormMsgInvetory>;
  };

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
    };
  }, []);

  return (
    <Box sx={bowInventoryStyles} {...props} ref={ref}>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Typography variant="h4" sx={mainTitleInventoryStyles}>
        Inventory issues
      </Typography>
      <Typography variant="body1" sx={subtitleInventoryBoxStyles}>
        Some of the items in your cart became unavailable or they are less on
        stock.
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={boxCheckInventoryWrapStyles}>
          {stateInventory.map((item, index) => {
            if (item.onStock !== 0) {
              return (
                <Fragment key={index}>
                  {errors[item?._id] && errorMessage(errors, item._id)}
                  <Card key={index} sx={cardInventoryStyles}>
                    <Box sx={boxCardMediaInventoryStyles}>
                      <CardMedia
                        component="img"
                        image={item.imagesSlider[0]}
                        alt={item.name}
                        sx={cardMediaInventoryStyles}
                      />
                    </Box>
                    <Box sx={boxCardContentInventoryStyles}>
                      <Typography
                        variant="h6"
                        sx={titleCardContentInventoryStyles}
                      >
                        {item.name}
                      </Typography>
                      <FormControl component="fieldset">
                        <Controller
                          name={item._id}
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: `Please choose option for ${item.name}`,
                            },
                          }}
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              aria-label="gender"
                              name={item.name}
                            >
                              <FormControlLabel
                                value={item.onStock}
                                control={<Radio size="small" />}
                                label={`Reduce quantity to ${item.onStock}`}
                                sx={formControlLabelInventoryStyles}
                              />
                              <FormControlLabel
                                value={0}
                                control={<Radio size="small" />}
                                label="Remove item from order"
                                sx={formControlLabelInventoryStyles}
                              />
                            </RadioGroup>
                          )}
                        />
                      </FormControl>
                    </Box>
                  </Card>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={index}>
                  {errors[item?._id] && errorMessage(errors, item._id)}
                  <Card key={index} sx={cardInventoryStyles}>
                    <Box sx={boxCardMediaInventoryStyles}>
                      <CardMedia
                        component="img"
                        image={item.imagesSlider[0]}
                        alt={item.name}
                        sx={cardMediaInventoryStyles}
                      />
                    </Box>
                    <Box sx={boxCardContentInventoryStyles}>
                      <Typography
                        variant="h6"
                        sx={titleCardContentInventoryStyles}
                      >
                        {item.name}
                      </Typography>
                      <FormControl component="fieldset">
                        <Controller
                          name={item._id}
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: `Please choose option for ${item.name}`,
                            },
                          }}
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              aria-label="gender"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value={item.onStock}
                                control={<Radio size="small" />}
                                label="Remove item from order"
                                sx={formControlLabelInventoryStyles}
                              />
                            </RadioGroup>
                          )}
                        />
                      </FormControl>
                    </Box>
                  </Card>
                </Fragment>
              );
            }
          })}
        </Box>
        <Box sx={boxBtnsInventoryWrapperStyles}>
          {Object.keys(errors).length === 0 && (
            <Button
              variant="contained"
              sx={boxApplyChangeInventoryStyles}
              type="submit"
            >
              Apply changes
            </Button>
          )}
          <Button variant="contained" onClick={handleBackToStore}>
            Back to store
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default CheckInventory;
