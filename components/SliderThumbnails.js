import React, { useContext, useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

import { StoreContext } from '../utils/store';

import ModalPopUp from './ModalPopUp';
import SliderProductsModal from './SliderProductsModal';

import {
  boxOverlayImageStyles,
  mainSliderOptions,
  thumbsOptions,
  WrapperSliderThumbNails,
  WrapperSlideMainThumbNails,
  WrapperSliderModalStyles,
} from '../muistyles/SliderThumbnails.styles';

const SliderThumbnails = () => {
  const mainComponentSliderRef = useRef(null);
  const thumbnailComponentSliderRef = useRef(null);
  const { stateDetailsProduct } = useContext(StoreContext);
  const { imagesSlider, name } = stateDetailsProduct;
  const [indexSlide, setIndexSlide] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModalSlider = (e) => {
    setIndexSlide(e.index);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (mainComponentSliderRef.current && thumbnailComponentSliderRef.current) {
      mainComponentSliderRef.current.sync(
        thumbnailComponentSliderRef.current.splide
      );
    }
  }, []);

  const handleOnLoadImage = (e) => {
    setTimeout(() => setIsLoad(true), 500);
  };

  return (
    <div>
      <Splide
        options={mainSliderOptions}
        ref={mainComponentSliderRef}
        onClick={handleOpenModalSlider}
      >
        {imagesSlider
          ? imagesSlider.map((item, index) => (
              <SplideSlide key={index}>
                <WrapperSlideMainThumbNails>
                  <img
                    src={item}
                    srcSet={`${item}?tr=w-305,h-250,cm-pad_resize,bg-transparent`}
                    sizes="150px"
                    alt={name}
                    onLoad={handleOnLoadImage}
                  />
                  {!isLoad && (
                    <Box sx={boxOverlayImageStyles}>
                      <CircularProgress sx={{ color: '#0074d9' }} size={40} />
                    </Box>
                  )}
                </WrapperSlideMainThumbNails>
              </SplideSlide>
            ))
          : null}
      </Splide>
      <Splide options={thumbsOptions} ref={thumbnailComponentSliderRef}>
        {imagesSlider
          ? imagesSlider.map((item, index) => (
              <SplideSlide key={index}>
                <WrapperSliderThumbNails>
                  <img
                    src={item}
                    alt={name}
                    srcSet={`${item}?tr=h-80, 80h`}
                    sizes="80px"
                    onLoad={handleOnLoadImage}
                  />
                  {!isLoad && (
                    <Box sx={boxOverlayImageStyles}>
                      <CircularProgress sx={{ color: '#0074d9' }} size={20} />
                    </Box>
                  )}
                </WrapperSliderThumbNails>
              </SplideSlide>
            ))
          : null}
      </Splide>
      <ModalPopUp openModal={open} handleClose={handleCloseModal}>
        <WrapperSliderModalStyles>
          <IconButton
            aria-label="Cancel"
            sx={{
              position: 'absolute',
              top: { xs: '-3px', sm: '-30px' },
              right: '5px',
              zIndex: 1,
            }}
            onClick={handleCloseModal}
          >
            <CancelIcon
              sx={{ color: 'white', fontSize: { xs: '25px', sm: '30px' } }}
            />
          </IconButton>
          <SliderProductsModal indexSlide={indexSlide} />
        </WrapperSliderModalStyles>
      </ModalPopUp>
    </div>
  );
};

export default SliderThumbnails;
