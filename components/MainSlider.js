import React, { useState } from 'react';

import { useRouter } from 'next//router';

import { Button, Typography } from '@mui/material';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import {
  buttonSlideStyles,
  ContentLeftBox,
  Image,
  LeftBoxSlide,
  optionsSlider,
  RightBoxSlide,
  titleSlideStyles,
  subtitleSlideStyles,
  WrapperContent,
  WrapperSlider,
} from '../muistyles/MainSlider.styles';

import { sliderData } from '../utils/data';

const MainSlider = () => {
  const router = useRouter();
  const [indexSlide, setIndexSlide] = useState(0);

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <WrapperSlider>
      <Splide
        options={optionsSlider}
        hasSliderWrapper
        onMoved={(e) => setIndexSlide(e.index)}
      >
        {sliderData.map((item, index) => (
          <SplideSlide key={item.id}>
            <WrapperContent>
              <LeftBoxSlide>
                <ContentLeftBox
                  className={indexSlide === index ? 'show-text' : 'hidden-text'}
                >
                  <Typography variant="h3" sx={titleSlideStyles}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={subtitleSlideStyles}>
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={buttonSlideStyles}
                    onClick={() => handleRedirect(item.redirect)}
                  >
                    Buy now
                  </Button>
                </ContentLeftBox>
              </LeftBoxSlide>
              <RightBoxSlide>
                <Image
                  className={indexSlide === index ? 'active' : 'hidden-image'}
                  src={item.image}
                  alt={item.alt}
                ></Image>
              </RightBoxSlide>
            </WrapperContent>
          </SplideSlide>
        ))}
      </Splide>
    </WrapperSlider>
  );
};

export default MainSlider;
