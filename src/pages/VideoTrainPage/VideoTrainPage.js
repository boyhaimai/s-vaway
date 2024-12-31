import React, { useState } from "react";
import { Box, Typography, Grid, Button, styled, Card, List } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ButtonGroup } from "react-bootstrap";
import { Add, ListAlt } from "@mui/icons-material";

const courses = [
  {
    id: 1,
    image: "https://sv2.vacdn.link/crm/34/61ad1deff425ea2a1bb3ca86ba733fb6.jpg",
    title: "Khóa đào tạo bán sản phẩm sữa hạt thuần chay",
    coach: "CEO - Nguyễn Thùy Duyên",
    lessons: 0,
    hours: 0,
    price: "Miễn phí",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x200", // Hình ảnh khác
    title: "Khóa học thiết kế giao diện UI/UX",
    coach: "Designer - Lê Minh Tùng",
    lessons: 10,
    hours: 20,
    price: "500,000 VND",
  },
];

const VideoTrainPage = () => {
  const [tabIndex, setTabIndex] = useState("1");

  const handleChange = (event, index) => {
    setTabIndex(index);
  };
  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });
  return (
    <Box>
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
            Đào tạo 
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
              <ListAlt variant="contained" size="large" />
            </MyButton>
          </ButtonGroup>
        </Box>
      </Card>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất cả khóa học" value="1" sx={{ width: "50%" }} />
            <Tab label="Khóa học của tôi" value="2" sx={{ width: "50%" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            {courses.map((course) => (
              <Box
                key={course.id}
                sx={{
                  border: "2px solid var(--theme_main)", // Viền xanh lá nổi bật
                  borderRadius: "16px", // Bo góc lớn hơn
                  overflow: "hidden",
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Hiệu ứng shadow đẹp mắt
                  padding: 3,
                  margin: "20px 0",
                  background: "linear-gradient(to bottom, #ffffff, #f1f8e9)", // Nền sáng nhẹ
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hiệu ứng hover
                  "&:hover": {
                    transform: "scale(1.02)", // Phóng to nhẹ khi hover
                    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {/* Hình ảnh */}
                <Box
                  component="img"
                  src={course.image}
                  alt={course.title}
                  sx={{
                    width: "100%",
                    height: "200px", // Đặt chiều cao cố định cho ảnh
                    objectFit: "cover", // Ảnh hiển thị đầy đủ và đẹp mắt
                    borderRadius: "12px",
                  }}
                />

                {/* Nội dung */}
                <Box mt={2}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ fontSize: "20px", color: "#2e7d32" }} // Màu chữ xanh lá nổi bật
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "14px", marginTop: "8px" }}
                  >
                    Coach: {course.coach}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "14px", marginTop: "4px" }}
                  >
                    {course.lessons} bài học - {course.hours} giờ
                  </Typography>
                </Box>

                {/* Nút hành động */}
                <Grid container spacing={1} mt={3}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                    >
                      {course.price}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                    >
                      Học ngay
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value="2">item 2</TabPanel>
      </TabContext>
    </Box>
  );
};

export default VideoTrainPage;
