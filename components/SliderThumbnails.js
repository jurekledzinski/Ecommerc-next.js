import React, { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { WrapperSliderModalStyles } from '../muistyles/SliderThumbnails.styles';

import ModalPopUp from './ModalPopUp';
import SliderProductsModal from './SliderProductsModal';

import {
  mainSliderOptions,
  thumbsOptions,
} from '../muistyles/SliderThumbnails.styles';

const dataSlides = [
  {
    image:
      'https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg',
    alt: 'image',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg',
    alt: 'image',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg',
    alt: 'image',
  },
];

const SliderThumbnails = () => {
  const mainComponentSliderRef = useRef(null);
  const thumbnailComponentSliderRef = useRef(null);
  const [indexSlide, setIndexSlide] = useState(0);
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

  return (
    <div>
      <Splide
        options={mainSliderOptions}
        ref={mainComponentSliderRef}
        style={{ minHeight: '300px' }}
        onClick={handleOpenModalSlider}
      >
        {dataSlides.map((item, index) => (
          <SplideSlide key={index}>
            <img src={item.image} alt={item.alt} />
          </SplideSlide>
        ))}
      </Splide>
      <Splide options={thumbsOptions} ref={thumbnailComponentSliderRef}>
        {dataSlides.map((item, index) => (
          <SplideSlide key={index}>
            <img src={item.image} alt={item.alt} />
          </SplideSlide>
        ))}
      </Splide>
      <ModalPopUp openModal={open} handleClose={handleCloseModal}>
        <WrapperSliderModalStyles>
          <IconButton
            aria-label="delete"
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
