import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { tabelWrapperStyles } from '../muistyles/DetailsAndReviews.styles';

import TableDetailsProduct from './TableDetailsProduct';
import ReviewsProduct from './ReviewsProduct';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <>
      {value === index && (
        <Box
          sx={{ pt: 2 }}
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {children}
        </Box>
      )}
    </>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const MoreDetailsProduct = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: { xs: '24px 12px', sm: '24px' } }}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Product details" {...a11yProps(0)} />
            <Tab label="Reviews" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h5"
                sx={{
                  textTransform: 'uppercase',
                  fontFamily: 'Oswald,sans-serif',
                }}
              >
                Specification
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableDetailsProduct />
            </AccordionDetails>
          </Accordion>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReviewsProduct />
        </TabPanel>
      </Box>
    </Box>
  );
};
export default MoreDetailsProduct;
