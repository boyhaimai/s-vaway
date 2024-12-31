import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import { Badge, Button, Container, Paper, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./DashBoard.module.scss";
import campaign from "~/assets/images/trophy.png";
import { PromotionIcon } from "~/Components/Icons/icons";
import config from "~/config";
import Shoppe1 from "~/assets/images/example_shoppe_1.png";
import Shoppe2 from "~/assets/images/example_shoppe_2.png";
import Shoppe3 from "~/assets/images/example_shoppe_3.png";
import img_product from "~/assets/images/panel_product.jpg";
import Image from "~/Components/Images/Images";

const cx = classNames.bind(styles);

function DashBoard() {
  return (
    <Container>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("title_stats")}>
            <Typography variant="h5" className={cx("title")}>
              Xin chào ,<span> Anna</span>!
            </Typography>
            <p className={cx("description_title")}>
              Sau đây là những gì đang diễn ra tại cửa hàng của bạn ngày hôm
              nay.
            </p>
          </div>
          <NavLink to={config.routes.detail} alt=" " className={cx("detail")}>
            Chi tiết <ChevronRight fontSize="large" />
          </NavLink>
          <div className={cx("total")}>
            <span>
              <p>0</p>Click
            </span>
            <span>
              <p>0</p>Đơn hàng
            </span>
            <span>
              {" "}
              <p>đ0</p>Hoa hồng ước tính
            </span>
          </div>
          <div className={cx("campaign")}>
            <NavLink to={config.routes.campaign}>
              <span>
                <img
                  className={cx("img_campaign")}
                  src={campaign}
                  alt=" "
                ></img>
              </span>
              <p>Chiến dịch</p>
            </NavLink>
            <NavLink to={config.routes.promotion}>
              <span>
                <PromotionIcon />
              </span>

              <p>Khuyến mãi</p>
            </NavLink>
          </div>
        </div>

        <Box className={cx("wrapper_box")}>
          <Typography variant="h6" sx={{ mb: -2 }}>
            <Badge badgeContent={4} color="error" sx={{ mr: 1.5 }}>
              <NotificationsIcon color="action" fontSize="large" />
            </Badge>
            Ghi nhớ nhanh
          </Typography>
          <Box className={cx("input_box")} sx={{ mt: 3 }}>
            <TextField fullWidth label="Nhập tên công việc" id="name" />
            <Button color="primary" variant="contained" sx={{ ml: 1 }}>
              <SendIcon />
            </Button>
          </Box>
        </Box>

        <div className={cx("content")}>
          <div className={cx("slider_product")}>
            <Carousel controls={false}>
              <Carousel.Item>
                <Image
                  className={cx("img_slider")}
                  src={Shoppe1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className={cx("img_slider")}
                  src={Shoppe2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className={cx("img_slider")}
                  src={Shoppe3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className={cx("content_product")}>
            <h6 className={cx("intro_product")}>Sản phẩm</h6>
            <div className={cx("list_product")}>
              <Paper elevation={2} className={cx("product")}>
                <Image
                  className={cx("img_product")}
                  src={img_product}
                  alt="product"
                />
                <Typography variant="h6" className={cx("title_product")}>
                  Kem chống nắng đa năng thế hệ mới Sunflex
                </Typography>
                <div className={cx("price")}>
                  <span>đ</span>500.000
                </div>
                <div className={cx("kho")}>Còn 500</div>
                <div className={cx("kind")}>Biến thể 2</div>
                <div className={cx("percent")}>Tỷ lệ hoa hồng 10%</div>
              </Paper>
              <Paper elevation={2} className={cx("product")}>
                <Image
                  className={cx("img_product")}
                  src={img_product}
                  alt="product"
                />
                <Typography variant="h6" className={cx("title_product")}>
                  Kem chống nắng đa năng thế hệ mới Sunflex
                </Typography>
                <div className={cx("price")}>đ500.000</div>
                <div className={cx("kho")}>Còn 500</div>
                <div className={cx("kind")}>Biến thể 2</div>
                <div className={cx("percent")}>Tỷ lệ hoa hồng 10%</div>
              </Paper>
              <Paper elevation={2} className={cx("product")}>
                <Image
                  className={cx("img_product")}
                  src={img_product}
                  alt="product"
                />
                <Typography variant="h6" className={cx("title_product")}>
                  Kem chống nắng đa năng thế hệ mới Sunflex
                </Typography>
                <div className={cx("price")}>đ500.000</div>
                <div className={cx("kho")}>Còn 500</div>
                <div className={cx("kind")}>Biến thể 2</div>
                <div className={cx("percent")}>Tỷ lệ hoa hồng 10%</div>
              </Paper>
              <Paper elevation={2} className={cx("product")}>
                <Image
                  className={cx("img_product")}
                  src={img_product}
                  alt="product"
                />
                <Typography variant="h6" className={cx("title_product")}>
                  Kem chống nắng đa năng thế hệ mới Sunflex
                </Typography>
                <div className={cx("price")}>đ500.000</div>
                <div className={cx("kho")}>Còn 500</div>
                <div className={cx("kind")}>Biến thể 2</div>
                <div className={cx("percent")}>Tỷ lệ hoa hồng 10%</div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
