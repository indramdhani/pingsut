/** @jsxImportSource @emotion/react */
import React from "react";
import { useTheme } from "@mui/material/styles";

function Footer(props) {
  const theme = useTheme();
  return (
    <footer
      css={{
        marginTop: "auto",
        textAlign: "left",
        padding: theme.spacing(3, 2),
      }}
      {...props}
    />
  );
}
export default function StickyFooter() {
  return <Footer></Footer>;
}
