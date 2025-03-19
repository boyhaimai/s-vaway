import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  GroupAdd,
  ListAlt,
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
import { styled } from "@mui/system";

import styles from "./Detail.module.scss";
import top1Sales from "~/assets/images/top1_sales.png";
import top2Sales from "~/assets/images/top2_sales.png";
import { useEffect } from "react";
import * as getOrders from "~/service/getOrderMoney";
import * as getLeads from "~/service/getLeadData";
import * as getProfileMoney from "~/service/getProfileDetailService";
import * as getRank from "~/service/getRank";

const cx = classNames.bind(styles);
function Detail() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.toLocaleDateString("en-DG");
  const defaultDate = `${currentMonth
    .toString()
    .padStart(2, "0")}/${currentYear}`;

  const months = [];
  for (let year = 2024; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === currentYear && month > currentMonth) break;
      months.push(`${month.toString().padStart(2, "0")}/${year}`);
    }
  }

  const [selectRank, setSelectRank] = useState(defaultDate);
  const [ranking, setRanking] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeStats, setActiveStats] = useState("");
  const [activeUpline, setActiveUpline] = useState("");
  const [resultOrders, setResultsOrders] = useState([]);
  const [resultLeads, setResultsLeads] = useState([]);
  const [profileMoney, setProfileMoney] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const startDate = currentDate;
      const endDate = startDate;
      const resultLead = await getLeads.getLeadData(startDate, endDate);
      const resultOrder = await getOrders.getOrderMoney(startDate, endDate);
      setResultsLeads(resultLead || {});
      setResultsOrders(resultOrder || {});
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultProfileMoney = await getProfileMoney.getProfileMoney();
      setProfileMoney(resultProfileMoney.data.ref || {});
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultRank = await getRank.getRank(selectRank);
      setRanking(resultRank.data?.money || {});
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectRank]);

  const handleChangeSelect = (event) => {
    setSelectRank(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const MyPaper = styled(Paper)({
    background: "linear-gradient(135deg,#43cea2,#185a9d)",
    color: " var(--c_white)",
    borderBottom: " 2px solid red",
    borderRadius: " 13px",
  });

  return (
    <Container className={cx("wrapper")}>
      <div className={cx("inner")}>
        {/* Thống kê */}
        <div className={cx("stats")}>
          <Typography variant="h5" className={cx("title", "title_im_ex")}>
            Thống kê nhanh ngày {resultOrders.label}
          </Typography>

          <div className={cx("list_datas")}>
            <MyPaper
              elevation={5}
              className={cx("data", { active: activeStats === 1 })}
              onClick={() => setActiveStats(1)}
            >
              <div className={cx("left_data")}>
                <MonetizationOn className={cx("icon_data")} />
                <p className={cx("name_data")}>
                  Doanh thu <North fontSize="large" />
                  <span className={cx("commission")}>0%</span>
                </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count", "icon_arow")} />
                <div className={cx("count_data")}>
                  {resultOrders?.data?.money} đ
                </div>
              </div>
            </MyPaper>

            <MyPaper
              className={cx("data", { active: activeStats === 2 })}
              elevation={5}
              onClick={() => setActiveStats(2)}
            >
              <div className={cx("left_data")}>
                <ListAlt className={cx("icon_data")} />
                <p className={cx("name_data")}>
                  Đơn hàng <North fontSize="large" />
                  <span className={cx("commission")}>0%</span>
                </p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count", "icon_arow")} />
                <div className={cx("count_data")}>
                  {resultOrders?.data?.orders}{" "}
                </div>
              </div>
            </MyPaper>

            <MyPaper
              elevation={5}
              className={cx("data", { active: activeStats === 3 })}
              onClick={() => setActiveStats(3)}
            >
              <div className={cx("left_data")}>
                <GroupAdd className={cx("icon_data")} />
                <p className={cx("name_data")}>Khách hàng</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>{resultLeads?.newLeads} </div>
              </div>
            </MyPaper>

            <MyPaper
              elevation={5}
              className={cx("data", { active: activeStats === 4 })}
              onClick={() => setActiveStats(4)}
            >
              <div className={cx("left_data")}>
                <StickyNote2 className={cx("icon_data")} />
                <p className={cx("name_data")}>Data tích lũy</p>
              </div>
              <div className={cx("right_data")}>
                <PlayArrow className={cx("icon_count")} />
                <div className={cx("count_data")}>
                  {resultLeads?.totalLeads}
                </div>
              </div>
            </MyPaper>
          </div>
        </div>

        {/* Tuyến trên  */}
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
              <p
                className={cx("info_upline", {
                  active_upline: activeUpline === 1,
                })}
                onClick={() => setActiveUpline(1)}
              >
                <span>Tên</span>: {profileMoney.name}
              </p>
              <p
                className={cx("info_upline", {
                  active_upline: activeUpline === 2,
                })}
                onClick={() => setActiveUpline(2)}
              >
                <span> Số điện thoại</span>: {profileMoney.phone}
              </p>
              <p
                className={cx("info_upline", {
                  active_upline: activeUpline === 3,
                })}
                onClick={() => setActiveUpline(3)}
              >
                <span>Zalo</span>: {profileMoney.phone}
              </p>
              <p
                className={cx("info_upline", {
                  active_upline: activeUpline === 4,
                })}
                onClick={() => setActiveUpline(4)}
              >
                <span>Email</span>: {profileMoney.email}
              </p>
            </div>
          </div>
        </Paper>

        {/* Top doanh số */}
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
              value={selectRank}
              label="selectMonth"
              onChange={handleChangeSelect}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Không chọn</em>
              </MenuItem>
              {months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Paper elevation={2} className={cx("content_sales")}>
            {ranking.map((rank, index) => (
              <div
                className={cx("item_sales")}
                onClick={() => setActiveUpline(5)}
                key={rank.user.id}
              >
                <div className={cx("left_content_sales")}>
                  {index === 0 && (
                    <Image
                      src={top1Sales}
                      alt="Top 1"
                      className={cx("img_sales")}
                    />
                  )}
                  {index === 1 && (
                    <Image
                      src={top2Sales}
                      alt="Top 2"
                      className={cx("img_sales")}
                    />
                  )}
                  {rank.user.name}
                </div>
                <div className={cx("right_content_sales")}>
                  {rank.value.toLocaleString("vi-VN")} {rank.symbol}
                </div>
              </div>
            ))}
          </Paper>
        </Paper>
      </div>
    </Container>
  );
}

export default Detail;
