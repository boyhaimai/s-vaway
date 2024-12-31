import React from "react";
import classNames from "classnames/bind";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CardActions,
  styled,
  Paper,
  InputBase,
  Divider,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "~/Components/Images/Images";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./CreateImagePage.module.scss";
import {
  Add,
  Circle,
  CopyAll,
  CreateNewFolder,
  FileDownload,
  Share,
} from "@mui/icons-material";
import { ButtonGroup, Stack } from "react-bootstrap";

const cx = classNames.bind(styles);

const CreateImagePage = () => {
  const rows = [
    {
      id: 512,
      name: "Banner 03",
      imgBanner:
        "https://sv2.vacdn.link/crm/34/9448aee9ef3593aade1f399f4b65a8e6.jpg",
      description: "",
    },
    {
      id: 511,
      name: "Banner 02",
      imgBanner:
        "https://sv2.vacdn.link/crm/34/698668f9e692bdda5733d7f8ad2aee36.jpg",
      description: "",
    },
    {
      id: 510,
      name: "Banner 01",
      imgBanner:
        "https://sv2.vacdn.link/crm/34/3816ab4942322f0d122d9edd78f4a564.png",
      description: "",
    },
    {
      id: 508,
      name: "DANH THIẾP ĐIỆN TỬ",
      imgBanner:
        "https://sv2.vacdn.link/crm/34/f51b8d7659df0ae9b2c1b81b91548e90.jpg",
      description: "",
    },
    {
      id: 346,
      name: "Giấy mời ngày hội MG BĐS 2024",
      imgBanner:
        "https://sv2.vacdn.link/crm/34/c1487edd4c58cf1cb4ac144c84b3095a.jpg",
      description: "Điền thông tin theo mẫu",
    },
  ];

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

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        padding: 2,
      }}
    >
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
      {rows.map((row) => (
        <MyCard key={row.id} sx={{ pb: 1 }}>
          <CardContent>
            <Image
              src={row.imgBanner}
              alt={row.name}
              className={cx("img_banner")}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                color: "#6a1b9a",
              }}
            >
              #{row.id} - {row.name}
            </Typography>

            <Typography
              variant="body2"
              color="var(--c_white)"
              sx={{
                fontSize: "10px",
              }}
            >
              {row.description || "Không có mô tả"}
            </Typography>
          </CardContent>
          <CardActions>
            <MyButton variant="contained" color="error">
              <EditIcon />
            </MyButton>
            <MyButton variant="contained" color="warning" sx={{ ml: 1 }}>
              <DeleteIcon />
            </MyButton>
            <MyButton
              variant="contained"
              sx={{ ml: 1, background: "var(--c_yellow)" }}
            >
              <Share />
            </MyButton>
            <Button
              variant="contained"
              size="small"
              sx={{
                background: "linear-gradient(45deg, #66bb6a, #43a047)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(45deg, #43a047, #2e7d32)",
                },
              }}
            >
              Tạo ảnh
            </Button>
          </CardActions>
        </MyCard>
      ))}
      {/* phân trang */}
      <Box>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Pagination count={4} showFirstButton showLastButton />
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateImagePage;
