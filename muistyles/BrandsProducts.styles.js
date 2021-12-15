export const containerBrandsStyles = {
  paddingTop: (theme) => theme.spacing(3),
  paddingBottom: (theme) => theme.spacing(3),
};

export const brandTitleStyles = {
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontSize: '1.6rem',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 500,
};

export const imageBrandsStyles = {
  height: '180px',
  objectFit: 'contain',
  padding: '20px',
};

export const boxBrandStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
};

export const linkBrandStyles = {
  textDecoration: 'none',
};

export const cardContentBrandsStyles = {
  width: '100%',
  padding: 'initial',
  '&.MuiCardContent-root:last-child': {
    padding: 'initial',
  },
};

export const cardActionBrandsStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '250px',
};

export const loaderBrandsImageStyles = {
  position: 'absolute',
  top: 'calc(50% - 10px)',
  left: 'calc(50% - 10px)',
  transform: 'translate(-50%,-50%)',
};
