import React, { useEffect, useState } from "react";
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
  Stack,
  Pagination,
  styled,
} from "@mui/material";
import {
  Add,
  AddCircle,
  ArrowDropDown,
  ArrowDropUp,
  Circle,
  CopyAll,
  CreateNewFolder,
  Delete,
  Edit,
  FileDownload,
  QrCode2,
  RemoveCircle,
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames/bind";

import styles from "./campaign.module.scss";
import Image from "~/Components/Images/Images";
import { ButtonGroup } from "react-bootstrap";

const cx = classNames.bind(styles);

const campaigns = [
  {
    id: 1,
    name: "Landing page bán sản phẩm điền form",
    date: "1/0",
    month: "1/0",
    totalCustomers: 11 / 1,
    url: "https://demo.vazosales.xyz/s/c502-r432",
    urlImg:
      "https://sv2.vacdn.link/crm/34/c4c30b2c97438bbc74748d03eefc83cd.jpg",
    qrCodeImage: "https://via.placeholder.com/150", // Thay bằng link QR code thực tế
  },
  {
    id: 2,
    name: " Webinar thanh toán SP",
    date: "15/12/2024",
    month: "Tháng 12",
    totalCustomers: 89,
    urlImg:
      "https://sv2.vacdn.link/crm/34/c4c30b2c97438bbc74748d03eefc83cd.jpg",
    url: "https://demo.vazosales.xyz/s/c503-r433",
    qrCodeImage: "https://via.placeholder.com/150",
  },
];

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
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  },
});

const Campaign = () => {
  const [expanded, setExpanded] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState({});

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id); // Toggle expand
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle campaign actions
  const handleDelete = (id) => {
    console.log(`Xóa chiến dịch ${id}`);
    // Thực hiện gọi API để xóa chiến dịch
  };

  useEffect(() => {
    const initialStates = {};
    campaigns.forEach((campaign) => {
      initialStates[campaign.id] = false; // Tạm thời tất cả đều là false
    });
    setActiveCampaign(initialStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns]);

  const handleActivate = (id) => {
    setActiveCampaign((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    console.log(`Kích hoạt chiến dịch ${id}`);
  };

  const handleDeactivate = (id) => {
    setActiveCampaign((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    console.log(`Tạm dừng chiến dịch ${id}`);
  };

  return (
    <Box sx={{ padding: 1 }}>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Chiến dịch
          </Typography>
          <ButtonGroup>
            <MyButton variant="contained" color="primary">
              <Add variant="contained" size="large" />
            </MyButton>
            <MyButton
              variant="contained"
              color="primary"
              sx={{
                ml: 1,
              }}
            >
              <CreateNewFolder variant="contained" size="large" />
            </MyButton>
          </ButtonGroup>
        </Box>
      </Card>

      {/* Card chứa các nút form tìm kiếm, sao chép, tải xuống và số lượng hiển thị */}
      <Card variant="outlined" sx={{ borderRadius: 2, padding: 2, mb: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              padding: 2,
              textAlign: "left",
              border: "1px solid var(--c_text_phu_2)",
              borderRadius: 2,
              marginBottom: 2,
              width: "100%",
            }}
          >
            <Circle size="large" sx={{ mr: 1 }} />
            Tạm dừng
          </Typography>
        </Box>

        <ButtonGroup>
          <MyButton variant="outlined" sx={{ mr: 1 }}>
            <CopyAll size="large" />
          </MyButton>

          <MyButton variant="outlined" sx={{ mr: 1 }}>
            <FileDownload size="large" />
          </MyButton>

          <Button variant="outlined">Số lượng hiển thị</Button>
        </ButtonGroup>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Chiến Dịch"
            inputProps={{ "aria-label": "search" }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Card>

      {/* Danh sách chiến dịch */}
      <Grid container spacing={2}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} key={campaign.id}>
            <MyCard
              variant="outlined"
              sx={{
                padding: 2,
              }}
            >
              {/* Header */}
              {/* ảnh */}
              <Image
                src={campaign.urlImg}
                alt={campaign.name}
                className={cx("campaign_image")}
              />
              {/* 3 button thao tác */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: 16,
                      mr: "5px",
                      ml: 2,
                    }}
                  >
                    {activeCampaign[campaign.id] ? (
                      <RemoveCircle
                        size="small"
                        color="error"
                        className={cx("icon_remote")}
                        onClick={() => handleDeactivate(campaign.id)}
                      />
                    ) : (
                      <AddCircle
                        size="small"
                        color="success"
                        className={cx("icon_add")}
                        onClick={() => handleActivate(campaign.id)}
                      />
                    )}{" "}
                    {campaign.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 600, fontSize: 12 }}
                  >
                    Ngày: {campaign.date} | Tháng: {campaign.month}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 600, fontSize: 12 }}
                  >
                    Tổng khách: {campaign.totalCustomers}
                  </Typography>
                </Box>

                <MyButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleExpand(campaign.id)}
                  sx={{
                    padding: "6px", // Điều chỉnh padding để nút vừa với icon
                    mb: 7,
                  }}
                >
                  {expanded === campaign.id ? (
                    <ArrowDropUp size="large" />
                  ) : (
                    <ArrowDropDown size="large" />
                  )}
                </MyButton>
              </Box>

              {/* xóa, sửa chiến dịch */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  marginBottom: 2,
                }}
              >
                <MyButton
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => handleDelete(campaign.id)}
                  sx={{
                    fontSize: 10,
                  }}
                >
                  <Delete size="large" />
                </MyButton>

                <MyButton variant="contained" color="error" size="small">
                  <Edit size="large" />
                </MyButton>
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
                    scrollable
                    scrollButtons="auto" // Cho phép cuộn tự động khi các tab vượt quá không gian
                    sx={{
                      maxWidth: "100%", // Giới hạn chiều rộng của Tabs
                      overflowX: "auto", // Cho phép cuộn ngang
                      WebkitOverflowScrolling: "touch", // Cho phép cuộn mượt mà trên thiết bị di động
                    }}
                  >
                    <Tab
                      label="Giới thiệu"
                      sx={{ minWidth: 80, padding: "6px 12px" }}
                    />
                    <Tab
                      label="Link giới thiệu"
                      sx={{ minWidth: 80, padding: "6px 12px" }}
                    />
                    <Tab
                      label="Tài liệu"
                      sx={{ minWidth: 80, padding: "6px 12px" }}
                    />
                    <Tab
                      label="Tạo ảnh marketing"
                      sx={{ minWidth: 80, padding: "6px 12px" }}
                    />
                  </Tabs>

                  {/* Tab Nội dung */}
                  {tabValue === 0 && (
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Đây là phần Giới thiệu chiến dịch.
                    </Typography>
                  )}
                  {tabValue === 1 && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 2,
                          marginTop: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          value={campaign.url}
                          InputProps={{
                            readOnly: true,
                          }}
                          size="small"
                        />
                        <MyButton
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            marginLeft: 1,
                          }}
                        >
                          <CopyAll />
                        </MyButton>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ marginLeft: 1, fontSize: "6px" }}
                        >
                          Rút ngắn link
                        </Button>
                      </Box>

                      {/* QR Code */}
                      <Box
                        sx={{
                          marginBottom: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1" align="left">
                          QRCODE giới thiệu:
                        </Typography>
                        <QrCode2 sx={{ fontSize: 150 }} />
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Copy mã bên trên và chia sẻ
                      </Typography>
                    </>
                  )}

                  {tabValue === 2 && (
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Đây là phần Tài liệu liên quan đến chiến dịch.
                    </Typography>
                  )}
                  {tabValue === 3 && (
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      Đây là phần Tạo ảnh marketing cho chiến dịch.
                    </Typography>
                  )}
                  {/* Hết tab Nội dung  */}
                </CardContent>
              </Collapse>
            </MyCard>
          </Grid>
        ))}
        {/* phân trang */}
        <Box>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Pagination count={4} showFirstButton showLastButton />
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Campaign;
