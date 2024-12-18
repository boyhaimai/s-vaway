import React from "react";
import classNames from "classnames/bind";

import styles from "./DashBoard.module.scss";
import { Box, Button, Container } from "@mui/material";
import { pink } from "@mui/material/colors";

const cx = classNames.bind(styles);

function DashBoard() {
  return (
    <Container>
      <div className={cx("wrapper")}>DashBoard</div>
      <Button variant="contained">Contained</Button>
     <Box>
      <Button variant="outlined">Outlined</Button>
        <Button color="success"variant="text">
          Text
        </Button>
     </Box>
    </Container>
  );
}

export default DashBoard;
