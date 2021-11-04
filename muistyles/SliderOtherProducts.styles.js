export const wrapperSliderOtherProductsStyles = {
  margin: '20px 24px 20px 24px',
};

export const optionsSliderOtherProducts = {
  perPage: 4,
  perMove: 1,
  width: '1200px',
  height: 350,
  gap: 10,
  breakpoints: {
    412: {
      perPage: 1,
    },
    600: {
      perPage: 2,
    },
    900: {
      perPage: 3,
    },
  },
  classes: {
    pagination: 'splide__pagination splide__other-rated',
    page: 'splide__pagination__page splide__other-rated-btn',
  },
};

export const titlrTopRateStyles = {
  marginBottom: '20px',
  color: (theme) => theme.palette.text.primary,
  fontFamily: 'Oswald,sans-serif',
  textTransform: 'uppercase',
};

export const cardActionTopRatedStyles = {
  padding: '20px',
};

export const cardMediaTopRateStyles = {
  objectFit: 'contain',
  maxWidth: '100%',
};

export const titleContentTopRatesOneStyles = {
  fontFamily: 'Oswald,sans-serif',
  textTransform: 'uppercase',
};

export const ratingTopRateSliderStyles = {
  margin: '5px 0',
};

export const titleContentTopRatesTwoStyles = {
  marginBottom: '10px',
  fontFamily: 'Oswald,sans-serif',
  textTransform: 'uppercase',
};
