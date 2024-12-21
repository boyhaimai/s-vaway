import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  CurrencyExchange,
  Event,
  GroupAdd,
  Groups,
  ListAlt,
  LocalShipping,
  MonetizationOn,
  North,
  Person,
  PlayArrow,
  Star,
  StickyNote2,
} from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Image from "../Images/Images";

import styles from "./Detail.module.scss";
import top1Sales from "~/assets/images/top1_sales.png";
import top2Sales from "~/assets/images/top2_sales.png";

const cx = classNames.bind(styles);
function Detail() {
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Container className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("stats")}>
          {" "}
          <Typography variant="h5" className={cx("title")}>
            Thống kê nhanh hôm nay
          </Typography>
          <div className={cx("list_datas")}>
            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <MonetizationOn className={cx("icon_data")} />
                <p className={cx("name_data")}>
                  Doanh thu <North fontSize="large" />
                  <span className={cx("commission")}>0%</span>
                </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count", "icon_arow")} />
                <div className={cx("count_data")}>$200.000.000</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <ListAlt className={cx("icon_data")} />
                <p className={cx("name_data")}>
                  Đơn hàng <North fontSize="large" />
                  <span className={cx("commission")}>0%</span>
                </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count", "icon_arow")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <GroupAdd className={cx("icon_data")} />
                <p className={cx("name_data")}>Khách hàng</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <StickyNote2 className={cx("icon_data")} />
                <p className={cx("name_data")}>Data tích lũy</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Typography variant="h5" className={cx("title")}>
              Thống kê xuất nhập hàng
            </Typography>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <CurrencyExchange className={cx("icon_data")} />
                <p className={cx("name_data")}>Tổng doanh số nhập </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <LocalShipping className={cx("icon_data")} />
                <p className={cx("name_data")}>Tổng số lượng nhập </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <Groups className={cx("icon_data")} />
                <p className={cx("name_data")}>Tổng tuyến dưới</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>

            <Paper elevation={5} className={cx("data")}>
              <div className={cx("left_data")}>
                <Event className={cx("icon_data")} />
                <p className={cx("name_data")}>Doanh số hôm nay</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>0</div>
              </div>
            </Paper>
          </div>
        </div>
        <Paper elevation={5} className={cx("upline")}>
          <h3 className={cx("title_upline")}>
            <div className={cx("left_title")}>
              {" "}
              <Person fontSize="large" /> Tuyến trên{" "}
            </div>{" "}
            <PlayArrow fontSize="large" className={cx("icon_bottom_upline")} />
          </h3>
          <div className={cx("list_upline")}>
            <div className={cx("item_list_upline")}>
              <p className={cx("info_upline")}>
                <span>Tên</span>: Lê Thị Hiệp
              </p>
              <p className={cx("info_upline")}>
                <span> Số điện thoại</span>: 0971534292
              </p>
              <p className={cx("info_upline")}>
                <span>Zalo</span>: 0971534292
              </p>
              <p className={cx("info_upline")}>
                <span>Email</span>: lehiepth4@gmail.com
              </p>
            </div>
          </div>
        </Paper>
        <Paper elevation={5} className={cx("sales")}>
          <div className={cx("left_title", "title_sales")}>
            {" "}
            <Star fontSize="large" /> Doanh số{" "}
          </div>{" "}
          <FormControl fullWidth className={cx("select_date")}>
            <InputLabel id="demo-controlled-open-select-label">Ngày</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Không chọn</em>
              </MenuItem>
              <MenuItem value={10 / 2024}>10/2024</MenuItem>
              <MenuItem value={9 / 2024}>9/2024</MenuItem>
              <MenuItem value={8 / 2024}>8/2024</MenuItem>
            </Select>
          </FormControl>
          <Paper elevation={2} className={cx("content_sales")}>
            <div className={cx("item_sales")}>
              <div className={cx("left_content_sales")}>
                <Image
                  src={top1Sales}
                  alt="sales1"
                  className={cx("img_sales")}
                />
                Lê Thị Hiệp
              </div>
              <div className={cx("right_content_sales")}>9,230,000 đ</div>
            </div>
            <div className={cx("item_sales")}>
              <div className={cx("left_content_sales")}>
                <Image
                  src={top2Sales}
                  alt="sales2"
                  className={cx("img_sales")}
                />
                Việt Đức
              </div>
              <div className={cx("right_content_sales")}>1,540,000 đ</div>
            </div>
          </Paper>
        </Paper>
      </div>
    </Container>
  );
}

export default Detail;
