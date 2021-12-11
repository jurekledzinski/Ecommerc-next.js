import React, { Fragment, forwardRef, useContext } from 'react';
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
  FormMsgInvetory,
  formControlLabelInventoryStyles,
  mainTitleInventoryStyles,
  subtitleInventoryBoxStyles,
  titleCardContentInventoryStyles,
} from '../muistyles/CheckInventory.styles';

import { HIDE_MODAL } from '../utils/constants';

import { StoreContext } from '../utils/store';

const CheckInventory = forwardRef((props, ref) => {
  const { stateInventory, stateLoginUser, dispatchModal } =
    useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;

  const createDefaultValues = () => {
    const defaultName = stateInventory.map((item) => item._id);
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

  const onSubmit = async (data) => {
    console.log(data, 'data form');
  };

  const handleBackToStore = () => {
    dispatchModal({ type: HIDE_MODAL });
  };

  const errorMessage = (error, idItem) => {
    return <FormMsgInvetory>{error[idItem].message}</FormMsgInvetory>;
  };

  console.log(errors);

  return (
    <Box sx={bowInventoryStyles} {...props} ref={ref}>
      <Typography variant="h4" sx={mainTitleInventoryStyles}>
        Inventory issues
      </Typography>
      <Typography variant="body1" sx={subtitleInventoryBoxStyles}>
        Some of the items in your cart became unavailable or they are less on
        stock.
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
