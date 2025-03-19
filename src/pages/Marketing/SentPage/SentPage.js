import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  styled,
  Paper,
  InputBase,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { CopyAll, FileDownload, Send } from "@mui/icons-material";
import { ButtonGroup, Stack } from "react-bootstrap";

const SentPage = () => {
  // Dữ liệu mẫu
  const campaigns = [
    {
      id: "65a0a15bc498b",
      name: "Nam",
      stats: {
        total: 3,
        success: 0,
        failed: 0,
        read: 0,
        clicked: 0,
      },
      sendTime: "09:18 12/01/2024",
    },
    {
      id: "65a0a15bc498b",
      name: "Nam",
      stats: {
        total: 3,
        success: 0,
        failed: 0,
        read: 0,
        clicked: 0,
      },
      sendTime: "09:18 12/01/2024",
    },
    {
      id: "65a0a15bc498b",
      name: "Nam",
      stats: {
        total: 3,
        success: 0,
        failed: 0,
        read: 0,
        clicked: 0,
      },
      sendTime: "09:18 12/01/2024",
    },
  ];

  const MyButton = styled(Button)({
    padding: "6px", // Điều chỉnh padding để nút vừa với icon
    minWidth: "auto", // Đảm bảo nút không có chiều rộng cố định
    width: "auto", // Để chiều rộng tự động điều chỉnh theo kích thước của icon
  });

  // Hàm render UI
  return (
    <Box>
      <Box>
        {/* header chứa title */}
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
                <Send variant="contained" size="large" />
              </MyButton>
              <MyButton
                variant="contained"
                color="primary"
                sx={{
                  ml: 1,
                }}
              >
                <Send variant="contained" size="large" />
              </MyButton>
            </ButtonGroup>
          </Box>
        </Card>

        {/* Card chứa các nút form tìm kiếm, sao chép, tải xuống và số lượng hiển thị */}
        <Card variant="outlined" sx={{ borderRadius: 2, padding: 2, mb: 2 }}>
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
      </Box>
      {/* content */}
      <Box sx={{ p: 2, backgroundColor: "var(--c_white)", minHeight: "100vh" }}>
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            sx={{
              mb: 2,
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ece9e6, #ffffff)", // Nền gradient
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              {/* Hiển thị ID */}
              <Typography
                variant="body2"
                sx={{ color: "#757575", fontWeight: "bold" }}
              >
                <strong>ID:</strong> {campaign.id}
              </Typography>

              {/* Hiển thị tên chiến dịch */}
              <Typography
                variant="h6"
                sx={{ mt: 1, fontWeight: "bold", color: "#333" }}
              >
                Tên người gửi: {campaign.name}
              </Typography>

              <Divider sx={{ my: 1 }} />

              {/* Hiển thị thống kê */}
              <Typography
                variant="body2"
                sx={{ color: "#616161", display: "flex", gap: 2 }}
              >
                <Box>
                  <strong>Tất cả:</strong> {campaign.stats.total}
                </Box>
                <Box>
                  <strong>Thành công:</strong> {campaign.stats.success}
                </Box>
                <Box>
                  <strong>Thất bại:</strong> {campaign.stats.failed}
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#616161", display: "flex", gap: 2, mt: 1 }}
              >
                <Box>
                  <strong>Đã đọc:</strong> {campaign.stats.read}
                </Box>
                <Box>
                  <strong>Bấm link:</strong> {campaign.stats.clicked}
                </Box>
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Hiển thị thời gian gửi */}
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "#333", fontStyle: "italic" }}
              >
                <strong>Thời gian gửi:</strong> {campaign.sendTime}
              </Typography>

              {/* Các nút hành động */}
              <Box
                sx={{
                  ml: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <MyButton variant="contained" color="warning">
                  <DeleteIcon />
                </MyButton>
              </Box>
            </CardContent>
          </Card>
        ))}
        {/* phân trang */}
        <Box>
          <Stack spacing={1}>
            <Pagination count={4} showFirstButton showLastButton />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SentPage;
