import { extendTheme, theme } from "@chakra-ui/react";

const colors = {
  "main-bg": "#0e1012",
  "white-text": "#e8e8ea",
  "subtle-text": "#9b9b9b",
  "column-bg": "#16181d",
  "column-header-bg": "#1a1d23",
  "card-bg": "#242731",
  "card-border": "#2d313e",
};

const fonts = {
  heading: "Montserrat",
  text: "Montserrat",
};

export default extendTheme({
  ...theme,
  colors,
  fonts,
});
