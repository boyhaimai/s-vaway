import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Paper,
  InputBase,
  Divider,
  Chip,
  styled,
  Pagination,
  TextField,
  Autocomplete,
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add,
  Close,
  CopyAll,
  FileDownload,
  QrCode2,
  Save,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonGroup } from "react-bootstrap";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import classNames from "classnames/bind";

import styles from "./Promotion.module.scss";
import Image from "~/Components/Images/Images";
const cx = classNames.bind(styles);

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

const discount = [
  { title: "Giảm giá theo %" },
  { title: "Giảm giá theo số tiền " },
];

const tags = [
  { title: "Sinh nhật" },
  { title: "Chiến dịch" },
  { title: "Khác" },
];

const indexCode = [
  "Ăn uống",
  "Giải trí",
  "Mua sắm",
  "Giáo dục",
  "Du lịch",
  "Sức khỏe",
  "Làm đẹp",
  "Khác",
];

const citys = [
  { title: "Hà Nội" },
  { title: "Hà Giang" },
  { title: "Cao Bằng" },
  { title: "Bắc Cạn" },
  { title: "Tuyên Quang" },
];

const Promotion = () => {
  const [promotion, setPromotion] = useState("1");
  const [addDiscount, setAddDiscount] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tabValue, setTabValue] = useState("1");
  const [temporary, setTemporary] = useState("");
  const [selectDay, setSelectDay] = useState("");
  const [hideCalendar, setHideCalendar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [valueInputCode, setValueInputCode] = useState(indexCode[0]);
  const [inputValueCode, setInputValueCode] = useState("");

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

  const handleChangeTabPromotion = (promotion, index) => {
    setPromotion(index);
  };
  const handleChangeTabCreatePromotion = (create, index) => {
    setTabValue(index);
  };

  const handleConfirmDays = () => {
    setSelectDay(temporary.format("YYYY/MM/DD"));
    setHideCalendar(false);
  };

  const handleChangeDays = (newDate) => {
    setTemporary(newDate);
  };

  const handleHideDay = () => {
    setHideCalendar(true);
  };


  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
  };
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
            <Add
              variant="contained"
              size="large"
              onClick={() => setAddDiscount(true)}
            />
          </MyButton>
        </Box>
      </Card>
      {/* tab add discount */}
      {addDiscount === true && (
        <Box className={cx("wrraper_add_discount")}>
          <Box className={cx("tab_add_discount")}>
            {/* title */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: "var(--theme_main)",
                color: "var(--c_white)",
                padding: 1,
                borderRadius: "16px 16px 0 0",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Thư mục
              </Typography>
              <MyButton
                variant="contained"
                color="primary"
                onClick={() => setAddDiscount(false)}
              >
                <Close size="large" />
              </MyButton>
            </Box>
            {/* input */}
            <Box sx={{ p: 1 }}>
              <Card variant="outlined" sx={{ mt: 1 }}>
                <CardContent>
                  <Typography>Số lượng mã khuyến mãi({"<="}100)(*)</Typography>
                  <TextField fullWidth size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Box>

            {/* tab data */}
            <Box sx={{ p: 1 }}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  {/* tab 1 */}
                  <TabContext value={tabValue}>
                    {/* list tab */}
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChangeTabCreatePromotion}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        sx={{ width: "100%" }}
                      >
                        <Tab
                          label="Giá trị khuyến mãi"
                          value="1"
                          sx={{ width: "25%" }}
                        />
                        <Tab
                          label="Yêu cầu sử dụng"
                          value="2"
                          sx={{ width: "25%" }}
                          onClick={() => {
                          }}
                        />
                        <Tab
                          label="Giới hạn khuyến mãi"
                          value="3"
                          sx={{ width: "25%" }}
                        />
                        <Tab
                          label="Công khai mã"
                          value="4"
                          sx={{ width: "25%" }}
                        />
                      </TabList>
                    </Box>
                    {/* tab 1 */}
                    <TabPanel value="1">
                      <Card variant="outlined" sx={{ mt: 1 }}>
                        <CardContent>
                          {/* input */}
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ width: "20%" }}>
                              Giá trị giảm giá: (*)
                            </Typography>
                            <TextField
                              sx={{ width: "60%", ml: 2 }}
                              size="small"
                            />
                          </Box>
                          {/* input */}
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Typography sx={{ width: "20%" }}>
                              Kiểu giảm giá: (*)
                            </Typography>
                            <Autocomplete
                              sx={{ width: "60%", ml: 2 }}
                              freeSolo
                              options={discount.map((option) => option.title)}
                              renderInput={(params) => (
                                <TextField {...params} label="Giảm giá theo" />
                              )}
                              size="small"
                            />
                          </Box>
                          {/* input */}
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Typography sx={{ width: "20%" }}>
                              Giảm giá tối đa: (*)
                            </Typography>
                            <TextField
                              sx={{ width: "60%", ml: 2 }}
                              size="small"
                            />
                          </Box>
                          {/* input */}
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Typography sx={{ width: "20%" }}>
                              Kiểu giảm giá: (*)
                            </Typography>
                            <Autocomplete
                              sx={{ width: "60%", ml: 2 }}
                              freeSolo
                              options={tags.map((option) => option.title)}
                              renderInput={(params) => (
                                <TextField {...params} label="Tag" />
                              )}
                              size="small"
                            />
                          </Box>

                          {/* calendar */}
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Typography sx={{ width: "20%" }}>
                              Thời gian kết thúc: (*)
                            </Typography>
                            <TextField
                              sx={{ width: "60%", ml: 2 }}
                              size="small"
                              value={selectDay}
                              onFocus={handleHideDay}
                            />
                          </Box>
                          {hideCalendar && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={["DateCalendar"]}
                                sx={{
                                  position: "absolute",
                                  top: "243px",
                                  right: "20px",
                                  background: "var(--b_liner)",
                                  zIndex: 1,
                                  height: "340px",
                                }}
                              >
                                <DemoItem>
                                  <DateCalendar
                                    defaultValue={dayjs("2025-01-01")}
                                    views={["year", "month", "day"]}
                                    onChange={handleChangeDays}
                                  />
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleConfirmDays}
                                    sx={{ zIndex: 11, bottom: "50px" }}
                                  >
                                    {" "}
                                    Xác nhận chọn ngày
                                  </Button>
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                          )}
                        </CardContent>
                      </Card>
                    </TabPanel>
                    {/* tab 2 */}
                    <TabPanel value="2">
                      {/* input */}
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ width: "20%" }}>
                          Chi tiêu tối thiểu:
                        </Typography>
                        <TextField sx={{ width: "60%", ml: 2 }} size="small" />
                      </Box>
                      {/* input */}
                      <Box sx={{ display: "flex", mt: 1 }}>
                        <Typography sx={{ width: "20%" }}>
                          Chi tiêu tối đa:
                        </Typography>
                        <TextField sx={{ width: "60%", ml: 2 }} size="small" />
                      </Box>
                    </TabPanel>
                    {/* tab 3 */}
                    <TabPanel value="3" >
                      {/* input */}
                      <Box sx={{ display: "flex", mt: 1 }}>
                        <Typography sx={{ width: "20%" }}>
                          Chi tiêu tối đa:
                        </Typography>
                        <TextField sx={{ width: "60%", ml: 2 }} size="small" />
                      </Box>
                    </TabPanel>
                    {/* tab 4 */}
                    <TabPanel value="4" >
                      <Accordion expanded={isChecked}>
                        <AccordionSummary
                          expanded={false}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          style={{
                            pointerEvents: "none",
                            borderBottom: "1px solid var(--c_text_phu)",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={handleChecked}
                                style={{ pointerEvents: "auto" }}
                              />
                            }
                            label={
                              <Typography component="span">
                                Công khai mã
                              </Typography>
                            }
                          />
                        </AccordionSummary>
                        {isChecked && (
                          <AccordionDetails>
                            <Box sx={{ mt: 1 }}>
                              <Typography mb={1}>Tỉnh thành sử dụng</Typography>
                              <Autocomplete
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                options={citys}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Thành phố"
                                    placeholder="City"
                                  />
                                )}
                                sx={{ width: "100%" }}
                              />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography mb={1}>Danh mục</Typography>
                              <Autocomplete
                                value={valueInputCode}
                                onChange={(event, newValue) => {
                                  setValueInputCode(newValue);
                                }}
                                inputValue={inputValueCode}
                                onInputChange={(event, newInputValue) => {
                                  setInputValueCode(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={indexCode}
                                sx={{ width: "100%" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Chọn danh mục"
                                  />
                                )}
                              />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography mb={1} align="center">
                                Ảnh đại diện
                              </Typography>
                              <Image src=" " />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography mb={1}>
                                Tên chương trình(*)
                              </Typography>
                              <TextField
                                size="small"
                                fullWidth
                                placeholder=" Chương trình"
                              />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography mb={1}>
                                Mô tả chương trình:(*)
                              </Typography>
                              <TextField
                                size="large"
                                fullWidth
                                placeholder="Mô tả chương trình(điều kiện sử dụng )"
                              />
                            </Box>
                          </AccordionDetails>
                        )}
                      </Accordion>
                      {/* button save */}
                      <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            float: "right",
                          }}
                        >
                          <Save size="large" sx={{ mr: 1 }} /> Lưu
                        </Button>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      )}

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
              backgroundColor: "white", // Tránh bị che bởi nội dung khác
              width: "100%", // Đảm bảo không bị thu nhỏ
            }}
          >
            <TabList
              onChange={handleChangeTabPromotion}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Chương trình khuyến mãi"
                value="1"
                sx={{ width: "50%" }}
              />
              <Tab
                label="Mã khuyến mãi"
                value="2"
                sx={{ width: "50%", textAlign: "center", paddingRight: "60px" }}
              />
            </TabList>
          </Box>
          {/* tab trang chính 1 */}
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
          {/* tab trang chính 2 */}
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
