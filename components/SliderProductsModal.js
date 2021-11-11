import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import { StoreContext } from '../utils/store';

import {
  ImageElement,
  optionsSliderModal,
} from '../muistyles/SliderProductModal.styles';

const SliderProductsModal = ({ indexSlide }) => {
  const { stateDetailsProduct } = useContext(StoreContext);
  const { imagesSlider, name } = stateDetailsProduct;

  return (
    <Splide options={{ ...optionsSliderModal, start: indexSlide }}>
      {imagesSlider
        ? imagesSlider.map((item, index) => (
            <SplideSlide key={index}>
              <ImageElement
                src={item}
                srcSet={`${item}?tr=w-350 350w`}
                sizes="350px"
                alt={name}
              />
            </SplideSlide>
          ))
        : null}
    </Splide>
  );
};

export default SliderProductsModal;
