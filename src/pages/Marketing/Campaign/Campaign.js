import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Divider,
  Collapse,
  Tabs,
  Tab,
  Pagination,
  styled,
  CircularProgress,
} from "@mui/material";
import { CheckCircle, CheckRounded, Clear, CopyAll } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames/bind";

import styles from "./campaign.module.scss";
import Image from "~/Components/Images/Images";
import * as getCampaign from "~/service/getCampaign";
import * as searchCampaign from "~/service/searchCampaign";
import { QRCodeCanvas } from "qrcode.react";
import useDebounce from "~/hook/usedebounce";
import DocumentCampaign from "~/Components/Campaign/ItemDocumentCampaign";

const cx = classNames.bind(styles);

const MyButton = styled(Button)({
  padding: "6px",
  minWidth: "auto",
  width: "auto",
});

const MyCard = styled(Card)({
  border: "2px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
});
const itemPerPage = 10;
const Campaign = () => {
  const [expanded, setExpanded] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  // const [activeCampaign, setActiveCampaign] = useState({});
  const [renderCampaign, setRenderCampaign] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const refInputSearch = useRef();
  const debounceValue = useDebounce(searchText, 800);

  // campaign
  useEffect(() => {
    const fetchAPI = async () => {
      const resultCampaign = await getCampaign.getCampaign();
      setRenderCampaign(resultCampaign.data);
    };
    fetchAPI();
  }, []);

  // searchCampaign
  useEffect(() => {
    const fetchAPI = async () => {
      const resultCampaign = await searchCampaign.searchCampaign(debounceValue);
      setRenderCampaign(resultCampaign.data);
    };
    fetchAPI();
  }, [debounceValue]);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id); // Toggle expand
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCopyLink = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setOpenSnackbar(true);
      setTimeout(() => setOpenSnackbar(false), 2000);
    }
  };
  // const handleShortLink = () => {};

  const handleChangeInputSeach = (e) => {
    //handleSearch input
    const valueInputSeach = e.target.value;

    if (!valueInputSeach.startsWith(" ")) {
      setSearchText(valueInputSeach);
    }
  };

  const handleClearInputSeach = () => {
    //handleclear input search
    setSearchText("");
    refInputSearch.current.focus();
  };

  const totalPage = Math.ceil(renderCampaign.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = renderCampaign.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 1, position: "relative" }}>
      {/* tb copy success */}
      {openSnackbar && (
        <Box
          sx={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Nền đen mờ 70%
            color: "#fff",
            padding: "0px 20px",
            borderRadius: "8px",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 9999,
            width: "150px",
            height: "90px",
            opacity: 0.6,
          }}
        >
          <CheckCircle sx={{ color: "var(--c_green)", fontSize: "30px" }} />
          <Typography component={"p"} fontSize="14px">
            Copy thành công
          </Typography>{" "}
          <br />
        </Box>
      )}

      {/* Card chứa các nút thêm mới và tạo thư mục */}

      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          padding: 1,
          width: "100%",
          mb: 2,
          paddingBottom: 0,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Chiến dịch
          </Typography>
        </Box>
      </Card>
      {/* Hộp thoại add thư mục */}

      {/* Card chứa các nút form tìm kiếm, sao chép, tải xuống và số lượng hiển thị */}
      <Card variant="outlined" sx={{ borderRadius: 2, padding: 2, mb: 2 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Chiến Dịch"
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={handleChangeInputSeach}
            inputRef={refInputSearch}
          />
          {!!searchText && (
            <IconButton
              type="button"
              sx={{
                p: "10px",
                background: "var(--theme_background)",
                borderRadius: "50%",
              }}
              aria-label="search"
              onClick={handleClearInputSeach}
            >
              <Clear size="large" color="black" />
            </IconButton>
          )}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Card>

      {/* Danh sách chiến dịch */}
      <Grid container spacing={2}>
        {renderCampaign.length > 0 ? (
          currentItems.map((campaign) => (
            <Grid item xs={12} key={campaign.id}>
              <MyCard
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  p: 0,
                }}
              >
                {/* Header */}
                {/* ảnh */}
                <Box onClick={() => handleExpand(campaign.id)}>
                  <Image
                    src={campaign.home_logo}
                    alt={campaign.name}
                    className={cx("campaign_image")}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        mr: "5px",
                        ml: 1,
                        mt: 3,
                        mb: 3,
                      }}
                    >
                      {campaign.name}
                    </Typography>
                  </Box>
                </Box>

                {/* Phần chi tiết ,nột dung chiến dịch*/}
                <Collapse
                  in={expanded === campaign.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <Divider />
                  <CardContent>
                    {/* tab chính */}
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="campaign-tabs"
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{
                        maxWidth: "100%", // Giới hạn chiều rộng của Tabs
                        overflowX: "auto", // Cho phép cuộn ngang
                        WebkitOverflowScrolling: "touch", // Cho phép cuộn mượt mà trên thiết bị di động
                      }}
                    >
                      <Tab
                        label="Link giới thiệu"
                        sx={{ width: "50%", padding: "6px 12px" }}
                      />
                      <Tab
                        label="Thông số"
                        sx={{ width: "50%", padding: "6px 12px" }}
                      />
                    </Tabs>

                    {/* Tab Nội dung */}
                    {tabValue === 0 && (
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 2,
                            marginTop: 2,
                          }}
                        >
                          <TextField
                            sx={{ width: "90%" }}
                            value={campaign.home_url}
                            InputProps={{
                              readOnly: true,
                            }}
                            size="small"
                            onClick={() => handleCopyLink(campaign.home_url)}
                          />
                          <Box>
                            {openSnackbar ? (
                              <MyButton
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                  marginLeft: 1,
                                }}
                                className={cx("btn_copy")}
                              >
                                <CheckRounded />
                              </MyButton>
                            ) : (
                              <MyButton
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{
                                  marginLeft: 1,
                                }}
                                onClick={() =>
                                  handleCopyLink(campaign.home_url)
                                }
                                className={cx("btn_copy")}
                              >
                                <CopyAll />
                              </MyButton>
                            )}
                          </Box>
                        </Box>

                        {/* QR Code */}
                        <Box
                          sx={{
                            marginBottom: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            align="left"
                            size={150}
                            sx={{ marginBottom: 1, fontWeight: "bold" }}
                          >
                            Mã QR: Copy mã bên trên và chia sẻ
                          </Typography>
                          <QRCodeCanvas value={campaign.home_url} />
                        </Box>
                        <Box
                          sx={{
                            marginBottom: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            align="left"
                            size={150}
                            sx={{ marginBottom: 1, mt: 1, fontWeight: "bold" }}
                          >
                            Giới thiệu:
                            <Typography ml={1} mt={1} component={"p"}>
                              {campaign.description
                                ? campaign.description
                                : "Không có giới thiệu"}
                            </Typography>
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ marginTop: 2 }}>
                            <Card
                              variant="outlined"
                              sx={{
                                borderRadius: 2,
                                padding: 1,
                                width: "100%",
                                mb: 2,
                                paddingBottom: 0,
                                mt: 1,
                              }}
                            >
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="h5" fontWeight="bold">
                                  Tài liệu
                                </Typography>
                              </Box>
                            </Card>
                            <DocumentCampaign idCampaign={campaign.id} />
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {tabValue === 1 && (
                      <Box sx={{ flexGrow: 1, padding: 3 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Card
                              sx={{
                                minWidth: 200,
                                backgroundImage: "var(--b_liner_2)",
                                color: "black",
                                mb: 1,
                              }}
                            >
                              <CardContent sx={{ textAlign: "center" }}>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h6"
                                  gutterBottom
                                >
                                  Truy cập hôm nay
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h4"
                                >
                                  {" "}
                                  {campaign.access.today}/
                                  {campaign.customer.today}
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="body2"
                                >
                                  Lượt truy cập / Khách hàng
                                </Typography>
                              </CardContent>
                            </Card>
                            <Card
                              sx={{
                                minWidth: 200,
                                backgroundImage: "var(--b_liner_2)",
                                color: "black",
                                mb: 1,
                              }}
                            >
                              <CardContent sx={{ textAlign: "center" }}>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h6"
                                  gutterBottom
                                >
                                  Truy cập tháng này
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h4"
                                >
                                  {" "}
                                  {campaign.access.today}/
                                  {campaign.customer.month}
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="body2"
                                >
                                  Lượt truy cập / Khách hàng
                                </Typography>
                              </CardContent>
                            </Card>
                            <Card
                              sx={{
                                minWidth: 200,
                                backgroundImage: "var(--b_liner_2)",
                                color: "black",
                                mb: 1,
                              }}
                            >
                              <CardContent sx={{ textAlign: "center" }}>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h6"
                                  gutterBottom
                                >
                                  Tổng truy cập
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="h4"
                                >
                                  {" "}
                                  {campaign.access.total}/
                                  {campaign.customer.total}
                                </Typography>
                                <Typography
                                  className={cx("thongso")}
                                  variant="body2"
                                >
                                  Lượt truy cập / Khách hàng
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {/* Hết tab Nội dung  */}
                  </CardContent>
                </Collapse>
              </MyCard>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,              
             
            }}
          >
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        )}
        {/* phân trang */}
        <Box
          sx={{
            mt: 2,
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Campaign;
