import Link from "next/link";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";

import { brandsPhoneData } from "../uitils/data";

import {
  brandBoxesStyles,
  brandTitleStyles,
  containerBrandsStyles,
} from "../muistyles/BrandsProducts.styles";

const BrandsProducts = () => {
  return (
    <main>
      <Grid container spacing={2} sx={containerBrandsStyles}>
        {brandsPhoneData.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card sx={{ height: "150px" }}>
              <Link href={item.url} passHref>
                <a style={{ textDecoration: "none" }}>
                  <CardActionArea>
                    <Box sx={brandBoxesStyles[index]}>
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt="img"
                          style={{
                            width: item.name === "Xiaomi" ? "70px" : "40px",
                            height: item.name === "Xiaomi" ? "70px" : "40px",
                            marginRight: "5px",
                          }}
                        />
                      )}
                      <Typography variant="h3" sx={brandTitleStyles}>
                        {item.name}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </a>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default BrandsProducts;
