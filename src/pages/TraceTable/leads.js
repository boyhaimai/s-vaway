import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  Chip,
  Drawer,
  styled,
  Tab,
  Card,
  Pagination,
  Divider,
  InputBase,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AttachMoney,
  Business,
  Cake,
  CalendarToday,
  Category,
  ChatBubbleOutline,
  CheckCircle,
  Clear,
  Cloud,
  CopyAll,
  Email,
  EventAvailable,
  Facebook,
  FileDownload,
  History,
  Label,
  LocationOn,
  Person,
  PersonAdd,
  Phone,
  Public,
  Search,
  ShoppingCart,
  TrackChanges,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./TraceTable.module.scss";
import zaloIcon from "~/assets/images/zalo.svg";
import Image from "~/Components/Images/Images";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRef } from "react";

import CustomerToday from "~/Components/TraceTable/CustomerToday";
import CustomerBuyed from "~/Components/TraceTable/CustomerBuyed";
import MyCustomer from "~/Components/TraceTable/MyCustomer";
import useDebounce from "~/hook/usedebounce";
import { useSearchParams } from "react-router-dom";
import * as getTraceTableService from "~/service/getTraceTableService";
import * as getSearchTraceTableService from "~/service/getSearchTraceTableService";
import * as getTraceTableHaveIdService from "~/service/getTraceTableHaveIdService";
import * as getQuantityTraceTableService from "~/service/getQuantityTraceTableService";

const cx = classNames.bind(styles);

const itemPerPage = 10;

const Leads = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [texrSearchAllTraceTable, setTexrSearchAllTraceTable] = useState("");
  const [valueTab, setValueTab] = useState("1");
  const [traceTables, setTraceTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const inputSearchRef = useRef();
  const debounceValue = useDebounce(texrSearchAllTraceTable, 800);
  const [searchParam] = useSearchParams();
  const leadId = searchParam.get("lead_id");
  const [notifyCopySuccess, setNotifyCopySuccess] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let result;
        if (leadId) {
          const res =
            await getTraceTableHaveIdService.getTraceTableHaveIdService(leadId);
          result = res.data;
        } else {
          const resultTraceTable =
            await getTraceTableService.getTraceTableService();
          result = resultTraceTable.data;
        }
        setTraceTables(result); // Chỉ cập nhật state của Leads
      } catch (err) {
        console.error("Error fetching Leads data:", err);
      }
    };
    fetchAPI();
  }, [leadId]); // Dependency array chỉ chạy khi leadId thay đổi

  useEffect(() => {
    if (!debounceValue || leadId) return; // Không gọi API nếu debounceValue rỗng hoặc có leadId
    const fetchAPI = async () => {
      try {
        const resultSearchTraceTable =
          await getSearchTraceTableService.getSearchTraceTableService(
            debounceValue
          );
        setTraceTables(resultSearchTraceTable.data); // Chỉ cập nhật state của Leads
      } catch (err) {
        console.error("Error searching Leads data:", err);
      }
    };
    fetchAPI();
  }, [debounceValue, leadId]); // Dependency array chỉ chạy khi debounceValue hoặc leadId thay đổi
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setTexrSearchAllTraceTable(value);

      if (value === "") {
        const fetchAPI = async () => {
          try {
            const resultTraceTable =
              await getTraceTableService.getTraceTableService();
            setTraceTables(resultTraceTable.data);
          } catch (err) {
            console.error("Error fetching Leads data:", err);
          }
        };
        fetchAPI();
      }
    }
  };

  const handleClearInputSeach = () => {
    setTexrSearchAllTraceTable("");
    inputSearchRef.current.focus();

    const fetchAPI = async () => {
      try {
        const resultTraceTable =
          await getTraceTableService.getTraceTableService();
        setTraceTables(resultTraceTable.data);
      } catch (err) {
        console.error("Error fetching Leads data:", err);
      }
    };
    fetchAPI();
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // handle select quantity
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const resultQuantity =
        await getQuantityTraceTableService.getQuantityTraceTableService(
          quantity
        );
      setTraceTables(resultQuantity.data);
    };
    fetchAPI();
  }, [quantity]);

  const totalPage = Math.ceil(traceTables.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = traceTables.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCopyOrderCode = (orderCode) => {
    if (orderCode) {
      navigator.clipboard.writeText(orderCode);
      setNotifyCopySuccess(true);
      setTimeout(() => setNotifyCopySuccess(false), 2000);
    }
  };

  const MyTypography = styled(Typography)({
    fontSize: "12px",
    marginTop: "10px",
  });

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });

  return (
    <Box>
      {/* Thông báo Copy Thành Công */}
      {notifyCopySuccess && (
        <Box className={cx("box_copy")}>
          <CheckCircle sx={{ color: "var(--c_green)", fontSize: "30px" }} />
          <Typography component={"p"} fontSize="14px">
            Copy thành công
          </Typography>{" "}
          <br />
        </Box>
      )}
      <Box sx={{ m: 1 }}>
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
              Bảng lưu vết
            </Typography>
          </Box>
        </Card>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              variant="scrollable"
              fullWidth
            >
              <Tab className={cx("tab_title")} label="Tất cả" value="1" />
              <Tab
                className={cx("tab_title")}
                label="Khách hôm nay"
                value="2"
              />
              <Tab className={cx("tab_title")} label="Khách đã mua" value="3" />
              <Tab
                className={cx("tab_title")}
                label="Khách của tôi"
                value="4"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              width="100%"
              maxWidth="400px"
              gap={1}
              sx={{
                backgroundColor: "white",
                padding: "15px 12px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Nút Copy */}
              <MyButton
                variant="contained"
                color="primary"
                sx={{
                  minWidth: "40px",
                  padding: "6px",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <CopyAll fontSize="small" />
              </MyButton>

              {/* Nút Download */}
              <MyButton
                variant="contained"
                color="primary"
                sx={{
                  minWidth: "40px",
                  padding: "6px",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <FileDownload />
              </MyButton>

              {/* Dropdown số lượng hiển thị */}
              <Box flexGrow={1} minWidth="120px" ml={1}>
                <FormControl fullWidth size="small">
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                      fontWeight: "600",
                      color: "text.primary",
                    }}
                  >
                    Số lượng hiển thị
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="Số lượng hiển thị"
                    onChange={handleQuantityChange}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                      "& .MuiSelect-select": {
                        padding: "8px 12px",
                      },
                    }}
                  >
                    {[20, 40, 60, 80, 100].map((num) => (
                      <MenuItem
                        key={num}
                        value={num}
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ minHeight: "auto" }}>
              {/* Header */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold" fontSize={"16px"}>
                  Danh sách tất cả khách hàng
                </Typography>
                <IconButton
                  onClick={() => {
                    setDrawerOpen(true);
                    setTimeout(() => inputSearchRef.current.focus(), 0); // Đảm bảo Drawer mở trước khi focus
                  }}
                  color="primary"
                >
                  <Search />
                </IconButton>
              </Box>

              {/* Customer List */}
              {traceTables.length > 0 ? (
                currentItems.map((traceTable) => (
                  <Accordion key={traceTables._id} sx={{ mb: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${traceTable._id}-content`}
                      id={`panel${traceTable._id}-header`}
                      sx={{ backgroundImage: "var(--b_liner_2)" }}
                    >
                      <Box display="flex" alignItems="center" width="100%">
                        <Box flex="1">
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            fontSize={"14px"}
                          >
                            {traceTable.status.map((colorStatus, i) => (
                              <Person
                                key={i}
                                sx={{
                                  fontSize: "18px",
                                  mr: 1,
                                  color: colorStatus.color || "black",
                                }}
                              />
                            ))}

                            {traceTable.name}
                            <CopyAll
                              fontSize="small"
                              sx={{ ml: "5px" }}
                              color="primary"
                              onClick={() =>
                                handleCopyOrderCode(traceTable.name)
                              }
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ height: "200px", overflow: "scroll" }}>
                        <MyTypography
                          color="text.secondary"
                          onClick={() => handleCopyOrderCode(traceTable.phone)}
                        >
                          <Phone sx={{ fontSize: "18px", color: "#1877F2" }} />{" "}
                          <span className={cx("title")}>SĐT:</span>{" "}
                          {traceTable.phone}
                          <CopyAll
                            fontSize="small"
                            sx={{ ml: "5px" }}
                            color="primary"
                          />
                        </MyTypography>
                        <MyTypography
                          color="text.secondary"
                          onClick={() => handleCopyOrderCode(traceTable.email)}
                        >
                          <Email sx={{ fontSize: "18px", color: "#1877F2" }} />{" "}
                          <span className={cx("title")}>Email:</span>{" "}
                          {traceTable.email}
                          {traceTable.email && (
                            <CopyAll
                              fontSize="small"
                              sx={{ ml: "5px" }}
                              color="primary"
                            />
                          )}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <Cloud
                            sx={{ fontSize: "18px", color: "#1877F2", mr: 1 }}
                          />
                          <span className={cx("title")}>Nguồn Data: </span>
                          {traceTable.source ? " " : traceTable.source}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <CalendarToday
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />{" "}
                          <span className={cx("title")}>Lịch chăm sóc: </span>
                          {traceTable.reminders.map((reminder, i) => (
                            <span key={i}>{reminder.desc}</span>
                          ))}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <ChatBubbleOutline
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />{" "}
                          <span className={cx("title")}>
                            {" "}
                            Nội dung tư vấn:{" "}
                          </span>
                          <Phone
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />{" "}
                          {traceTable.note.map((notee, i) => (
                            <span key={i}>
                              (
                              {new Date(notee.added_time * 1000).toLocaleString(
                                "vi-VN"
                              )}
                              ) {notee.content} <br />
                            </span>
                          ))}
                        </MyTypography>

                        <MyTypography color="text.secondary">
                          <Label
                            sx={{ fontSize: "18px", color: "var(--c_orange)" }}
                          />{" "}
                          <span className={cx("title")}>Tags:</span>{" "}
                          {Object.values(traceTable.tags).map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag.name}
                              size="small"
                              sx={{
                                color: "white",
                                backgroundColor: tag.color,
                                mb: 1,
                              }}
                            />
                          ))}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <EventAvailable
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />{" "}
                          <span className={cx("title")}> Được thêm lúc:</span>{" "}
                          {traceTable.added_time}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <History
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />
                          <span className={cx("title")}>
                            Hoạt động lần cuối:{" "}
                          </span>
                          {new Date(traceTable.last_time).toLocaleString(
                            "vi-VN"
                          )}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <PersonAdd
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />
                          <span className={cx("title")}>
                            {" "}
                            Người giới thiệu:
                          </span>{" "}
                          {traceTable.users.name} {traceTable.users.phone}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <AttachMoney
                            sx={{ fontSize: "18px", color: "var(--c_green)" }}
                          />{" "}
                          <span className={cx("title")}>Số tiền chi: </span>{" "}
                          {traceTable.money.toLocaleString("vi-VN")}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <LocationOn sx={{ fontSize: "18px", color: "red" }} />
                          <span className={cx("title")}> Địa chỉ : </span>
                          {traceTable.address.detail}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <Cake sx={{ fontSize: "18px", color: "#1877F2" }} />
                          <span className={cx("title")}> Sinh nhật:</span>{" "}
                          {traceTable.birthdate}
                        </MyTypography>
                        <MyTypography color="text.secondary">
                          <Business
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />
                          <span className={cx("title")}> Công ty:</span>{" "}
                          {traceTable.company}
                        </MyTypography>

                        <MyTypography color="text.secondary">
                          <Facebook
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />{" "}
                          <span className={cx("title")}>Facebook:</span>{" "}
                          {traceTable.facebook}
                        </MyTypography>

                        <MyTypography color="text.secondary">
                          <Image className={cx("zalo_icon")} src={zaloIcon} />
                          <span className={cx("title")}>Zalo:</span>{" "}
                          {traceTable.zalo}
                        </MyTypography>

                        <MyTypography color="text.secondary">
                          <Public sx={{ fontSize: "18px", color: "#1877F2" }} />
                          <span className={cx("title")}> Website:</span>{" "}
                          {traceTable.website}
                        </MyTypography>

                        <Box sx={{ ml: 1 }}>
                          <MyTypography color="text.secondary">
                            <TrackChanges
                              sx={{ fontSize: "18px", color: "#1877F2" }}
                            />{" "}
                            <span className={cx("title")}>(Utm) Nguồn:</span>{" "}
                            {traceTable.utm.source}
                          </MyTypography>
                          <MyTypography color="text.secondary">
                            <TrackChanges
                              sx={{ fontSize: "18px", color: "#1877F2" }}
                            />{" "}
                            <span className={cx("title")}>
                              (Utm) Chiến dịch:
                            </span>{" "}
                            {traceTable.utm.campaign}
                          </MyTypography>
                          <MyTypography color="text.secondary">
                            <TrackChanges
                              sx={{ fontSize: "18px", color: "#1877F2" }}
                            />{" "}
                            <span className={cx("title")}>(Utm) Kênh:</span>{" "}
                            {traceTable.utm.medium}
                          </MyTypography>
                          <MyTypography color="text.secondary">
                            <TrackChanges
                              sx={{ fontSize: "18px", color: "#1877F2" }}
                            />{" "}
                            <span className={cx("title")}>(Utm) Từ khóa:</span>{" "}
                            {traceTable.utm.term}
                          </MyTypography>
                          <MyTypography color="text.secondary">
                            <TrackChanges
                              sx={{ fontSize: "18px", color: "#1877F2" }}
                            />{" "}
                            <span className={cx("title")}>(Utm) Nội dung:</span>
                            {""}
                            {traceTable.utm.content}
                          </MyTypography>
                        </Box>
                        <MyTypography color="text.secondary">
                          <ShoppingCart
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />
                          <span className={cx("title")}>Số lượng: </span>{" "}
                          {traceTable.fields_san_pham}
                        </MyTypography>

                        <MyTypography color="text.secondary">
                          <Category
                            sx={{ fontSize: "18px", color: "#1877F2" }}
                          />
                          <span className={cx("title")}>Sản phẩm:</span>{" "}
                          {traceTable.fields_so_luong}
                        </MyTypography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : texrSearchAllTraceTable ? (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Không tìm thấy kết quả
                  </Typography>
                </Box>
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

              {/* Drawer for Filters */}
              <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: "100%", p: 2 }}>
                  <Typography variant="h6" mb={2}>
                    Tìm kiếm
                  </Typography>
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
                      placeholder="Tìm khách hàng"
                      inputProps={{ "aria-label": "search" }}
                      value={texrSearchAllTraceTable}
                      onChange={handleChangeSearch}
                      inputRef={inputSearchRef}
                    />
                    {!!texrSearchAllTraceTable && (
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

                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon onClick={() => setDrawerOpen(false)} />
                    </IconButton>
                  </Paper>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setDrawerOpen(false)}
                    >
                      Tìm kiếm
                    </Button>
                  </Box>
                </Box>
              </Drawer>
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
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <CustomerToday />
          </TabPanel>
          <TabPanel value="3">
            <CustomerBuyed />
          </TabPanel>
          <TabPanel value="4">
            <MyCustomer />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Leads;
