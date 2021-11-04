import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import {
  ImageElement,
  optionsSliderModal,
} from '../muistyles/SliderProductModal.styles';

const SliderProductsModal = ({ indexSlide }) => {
  return (
    <Splide options={{ ...optionsSliderModal, start: indexSlide }}>
      <SplideSlide>
        <ImageElement
          src="https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-8-front-1_QPZblGWggD.png"
          alt="Image 1"
        />
      </SplideSlide>
      <SplideSlide>
        <ImageElement
          src="https://ik.imagekit.io/mdklwracd5rti/Shoppy/Iphone-12-front_OD7tDwAb_zA.png"
          alt="Image 2"
        />
      </SplideSlide>
    </Splide>
  );
};

export default SliderProductsModal;
