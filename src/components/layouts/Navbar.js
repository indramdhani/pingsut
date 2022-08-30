/** @jsxImportSource @emotion/react */
import React, { Fragment } from "react";
import { AppBar, CssBaseline, Toolbar, Typography, Link } from "@mui/material";

function Title(props) {
  return (
    <Typography
      css={{
        flexGrow: 1,
      }}
      {...props}
    ></Typography>
  );
}

export const Navbar = () => {
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Title variant="h6">
            <Link underline="none" color="inherit" href="/">
              {process.env.REACT_APP_TITLE} <small>dengan AI</small>
            </Link>
          </Title>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
export default Navbar;
