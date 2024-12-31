import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Tab,
  Paper,
  InputBase,
  Divider,
  Chip,
  styled,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add,
  Circle,
  CopyAll,
  FileDownload,
  QrCode2,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ButtonGroup, Stack } from "react-bootstrap";

const Promotion = () => {
  const [promotion, setPromotion] = useState("1");
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 60) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (item, index) => {
    setPromotion(index);
  };
  const promotions = [
    { code: "TNBCRPHL", status: "Hoạt động", orders: 0, revenue: 0 },
    { code: "TNBCRPHL", status: "Hoạt động", orders: 0, revenue: 0 },
    { code: "TNBCRPHL", status: "Hoạt động", orders: 0, revenue: 0 },
  ];

  const promotionsProgram = [
    {
      nameProgram: "Landing page bán sản phẩm điền form",
      address: "demo.vazosales.xyz/s/c502-r432",
      qrCode: "https://via.placeholder.com/150",
      numberOrder: 10,
      sales: 1000000,
    },
    {
      nameProgram: "Landing page bán sản phẩm điền form",
      address: "demo.vazosales.xyz/s/c502-r432",
      qrCode: "https://via.placeholder.com/150",
      numberOrder: 10,
      sales: 1000000,
    },
    {
      nameProgram: "Landing page bán sản phẩm điền form",
      address: "demo.vazosales.xyz/s/c502-r432",
      qrCode: "https://via.placeholder.com/150",
      numberOrder: 10,
      sales: 1000000,
    },
  ];

  const MyButton = styled(Button)({
    padding: "6px", // Điều chỉnh padding để nút vừa với icon
    minWidth: "auto", // Đảm bảo nút không có chiều rộng cố định
    width: "auto", // Để chiều rộng tự động điều chỉnh theo kích thước của icon
  });

  const MyCard = styled(Card)({
    border: "2px solid rgba(255, 255, 255, 0.2)",
    color: " var(--c_white)",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#43cea2,#185a9d)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
  });

  return (
    <Box>
      {/* header chứa button thêm mới */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          padding: 1,
          width: "100%",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            Khuyến mãi
          </Typography>
          <MyButton variant="contained" color="primary">
            <Add variant="contained" size="large" />
          </MyButton>
        </Box>
      </Card>

      {/* Card chứa các nút form tìm kiếm, sao chép, tải xuống và số lượng hiển thị */}
      <Card variant="outlined" sx={{ borderRadius: 2, padding: 1 }}>
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

      {/* content chứa tab chương trình khuyến mãi và mã khuyến mãi */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={promotion}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: isFixed ? "fixed" : "static",
              top: isFixed ? "60px" : "auto", // Đặt đúng vị trí khi fixed
              zIndex: 9999,
              backgroundColor: "white", // Tránh bị che bởi nội dung khác
              width: "100%", // Đảm bảo không bị thu nhỏ
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chương trình khuyến mãi" value="1" sx={{width: "50%"}}/>
              <Tab label="Mã khuyến mãi" value="2" sx={{width: "50%"}}/>
            </TabList>
          </Box>

          <TabPanel value="1">
            <Grid container spacing={3} style={{ padding: "24px" }}>
              {promotionsProgram.length > 0 ? (
                promotionsProgram.map((promo) => (
                  <Grid item xs={12} sm={6} md={4} key={promo.id}>
                    <MyCard
                      variant="outlined"
                      sx={{
                        borderRadius: "12px",
                        boxShadow: 3,
                        padding: "16px",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="#fff"
                          gutterBottom
                          sx={{ textAlign: "center" }}
                        >
                          {promo.nameProgram}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          <strong>Địa chỉ: </strong>
                          <a
                            href={promo.address}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#e0e0e0",
                              textDecoration: "underline",
                            }}
                          >
                            {promo.address}
                          </a>
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          <strong>Mã QR:</strong>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "12px",
                          }}
                        >
                          <QrCode2
                            size="large"
                            sx={{ fontSize: "50px", color: "#fff" }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          <strong>Số đơn hàng: </strong> {promo.numberOrder}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          <strong>Doanh số: </strong> {promo.sales} đ
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "12px",
                          }}
                        >
                          <MyButton
                            variant="contained"
                            color="error"
                            sx={{
                              padding: "6px 12px",
                              background: "#e53935",
                            }}
                          >
                            <EditIcon />
                          </MyButton>
                          <MyButton
                            variant="contained"
                            color="warning"
                            sx={{
                              padding: "6px 12px",
                              background: "#ffb300",
                            }}
                          >
                            <DeleteIcon />
                          </MyButton>
                        </Box>
                      </CardContent>
                    </MyCard>
                  </Grid>
                ))
              ) : (
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="h6" color="textSecondary">
                    Không có dữ liệu, vui lòng tạo mới!
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* phân trang */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Stack spacing={2}>
                <Pagination count={4} showFirstButton showLastButton />
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3} style={{ padding: "24px" }}>
              {promotions.length ? (
                promotions.map((promotion, index) => (
                  <Grid item xs={12} key={index}>
                    <MyCard
                      sx={{
                        borderRadius: "12px",
                        padding: "16px",
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{
                            color: "#fff",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                          }}
                        >
                          Mã giảm giá: {promotion.code}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          Tình trạng:
                          <Chip
                            label={promotion.status}
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor:
                                promotion.status === "Còn hạn"
                                  ? "var(--c_green)"
                                  : "var(--c_red)",
                              color: "#fff",
                            }}
                          />
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          Số đơn hàng: {promotion.orders}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#e0e0e0", marginBottom: "8px" }}
                        >
                          Doanh số: {promotion.revenue} đ
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "16px",
                          }}
                        >
                          <MyButton
                            variant="contained"
                            color="error"
                            sx={{
                              padding: "6px 12px",
                              background: "#e53935",
                            }}
                          >
                            <EditIcon />
                          </MyButton>
                          <MyButton
                            variant="contained"
                            color="warning"
                            sx={{
                              marginLeft: "12px",
                              padding: "6px 12px",
                              background: "#ffb300",
                            }}
                          >
                            <DeleteIcon />
                          </MyButton>
                        </Box>
                      </CardContent>
                    </MyCard>
                  </Grid>
                ))
              ) : (
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="h6" color="textSecondary">
                    Không có dữ liệu, vui lòng tạo mới!
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Phân trang */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Stack spacing={2}>
                <Pagination count={4} showFirstButton showLastButton />
              </Stack>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Promotion;
