import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const SliderThumbnails = () => {
  const mainComponentSliderRef = useRef(null);
  const thumbnailComponentSliderRef = useRef(null);

  const mainOptions = {
    type: 'fade',
    fixedHeight: '300px',
    pagination: false,
    arrows: false,
    cover: true,
  };

  const thumbsOptions = {
    rewind: true,
    fixedWidth: '33.2%',
    fixedHeight: '100px',
    isNavigation: true,
    focus: 'center',
    focus: 'center',
    pagination: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      600: {
        fixedWidth: '33.2%',
        fixedHeight: '100px',
      },
    },
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
        options={mainOptions}
        ref={mainComponentSliderRef}
        style={{ minHeight: '300px' }}
      >
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg"
            alt=""
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg"
            alt=""
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg"
            alt=""
          />
        </SplideSlide>
      </Splide>
      <Splide options={thumbsOptions} ref={thumbnailComponentSliderRef}>
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg"
            alt=""
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg"
            alt=""
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg"
            alt=""
          />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default SliderThumbnails;
// https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg
