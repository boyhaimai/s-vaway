import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import {
  CheckCircle,
  Clear,
  CopyAll,
  Inventory,
  Key,
  Phone,
  Search,
} from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";

import * as getOrderPendingService from "~/service/getOrderPendingService";
import * as getSearchOrderPendingService from "~/service/getSearchOrderPendingService";
import Image from "~/Components/Images/Images";
import styles from "~/pages/Business/Orders/Order.module.scss";
import { useRef } from "react";
import useDebounce from "~/hook/usedebounce";

const cx = classNames.bind(styles);

function Pending() {
  const [orderPending, setOrderPending] = useState([]);
  const [drawerOpenOrder, setDrawerOpenOrder] = useState(false);
  const [textSearchOrderPending, setTextSearchOrderPending] = useState("");
  const inputSearchRef = useRef();
  const debounceValue = useDebounce(textSearchOrderPending, 800);
  const [notifyCopySuccess, setNotifyCopySuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultOrderPending =
        await getOrderPendingService.getOrderPendingService();
      setOrderPending(resultOrderPending.data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultSearchOrderPending =
        await getSearchOrderPendingService.getSearchOrderPendingService(
          debounceValue
        );
      setOrderPending(resultSearchOrderPending.data);
    };
    fetchAPI();
  }, [debounceValue]);

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    if (!value.startsWith(" ")) {
      setTextSearchOrderPending(value);
    }
  };

  const handleClearInputSeach = () => {
    setTextSearchOrderPending("");
    inputSearchRef.current.focus();
  };

  const handleCopyOrderCode = (orderCode) => {
    if (orderCode) {
      navigator.clipboard.writeText(orderCode);
      setNotifyCopySuccess(true);
      setTimeout(() => setNotifyCopySuccess(false), 2000);
    }
  };

  const itemPerPage = 10;

  const totalPage = Math.ceil(orderPending.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = orderPending.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {notifyCopySuccess && (
        <Box className={cx("box_copy")}>
          <CheckCircle sx={{ color: "var(--c_green)", fontSize: "30px" }} />
          <Typography component={"p"} fontSize="14px">
            Copy thành công
          </Typography>{" "}
          <br />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" fontSize={"16px"}>
          Danh sách đơn hàng chờ xử lý
        </Typography>
        <IconButton onClick={() => setDrawerOpenOrder(true)} color="primary">
          <Search />
        </IconButton>
      </Box>
      {orderPending.length > 0 ? (
        currentItems.map((order, index) => (
          <Accordion
            key={index}
            sx={{ mb: 2, borderRadius: "8px", overflow: "hidden" }}
          >
            <AccordionSummary
              aria-controls={`panel-content-${order._id}`}
              id={`panel-header-${order._id}`}
              sx={{ background: "var(--b_liner_2)", pl: 1, pr: 1 }}
            >
              <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
                <Typography variant="h6" fontWeight="bold" fontSize={"14px"}>
                  {order.products[0].name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mt={1}
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" fontSize={"12px"}>
                    Mã đơn:{" "}
                    <Typography
                      component={"span"}
                      color={order.added_time ? "success" : "error"}
                    >
                      {order.products[0]._id}
                    </Typography>
                    <CopyAll
                      fontSize="small"
                      sx={{ ml: "5px" }}
                      color="primary"
                      onClick={() => handleCopyOrderCode(order.products[0]._id)}
                    />
                  </Typography>
                  <Box mt={2}>
                    <Chip
                      label={order.status.name}
                      size="small"
                      sx={{
                        mr: 1,
                        backgroundColor: `${order.status.color}`,
                        color: "white",
                      }}
                    />
                  </Box>
                </Stack>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                  fullWidth
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    Số tiền:{" "}
                    <span style={{ color: "#2e7d32" }}>
                      {order.products[0].price.toLocaleString()}đ
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    Hoa hồng:{" "}
                    <span style={{ color: "#d32f2f" }}>
                      {(order.products[0].discount
                        ? order.products[0].price / order.products[0].discount
                        : "không có hóa hồng"
                      ).toLocaleString()}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ height: "200px", overflow: "scroll" }}>
              <Box>
                <Stack mb={1}>
                  <Image
                    src={order.products[0].image}
                    className={cx("img_order")}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    mt={1}
                    onClick={() => handleCopyOrderCode(order.name)}
                  >
                    {order.name}{" "}
                    <CopyAll
                      fontSize="small"
                      sx={{ ml: "5px" }}
                      color="primary"
                    />
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mt={1}
                  mb={1}
                >
                  <Phone sx={{ color: "var(--theme_main)" }} />
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    onClick={() => handleCopyOrderCode(order.phone)}
                  >
                    SĐT: {order.phone}{" "}
                    <CopyAll
                      fontSize="small"
                      sx={{ ml: "5px" }}
                      color="primary"
                    />
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Inventory sx={{ color: "var(--theme_main)" }} />
                  <Typography variant="body1">
                    Số lượng:{" "}
                    <Typography
                      component={"span"}
                      color={order.products[0].qty !== 0 ? "success" : "error"}
                    >
                      {order.products[0].qty}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <DiscountIcon color="action" sx={{ color: "var(--c_red)" }} />
                  <Typography variant="body1">
                    Giảm giá:{" "}
                    <Typography
                      component={"span"}
                      color={order.products[0].discount ? "success" : "error"}
                    >
                      {order.products[0].discount === 0
                        ? "Không giảm giá"
                        : order.products[0].discount}
                      %
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <PersonAddIcon sx={{ color: "var(--theme_main)" }} />
                  <Typography variant="body1">
                    Được thêm vào lúc:{" "}
                    <Typography
                      component={"span"}
                      color={order.added_time ? "success" : "error"}
                    >
                      {new Date(order.added_time * 1000).toLocaleString(
                        "vi-VN"
                      )}
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <GroupIcon
                    color="action"
                    sx={{ color: "var(--theme_main)" }}
                  />
                  <Typography variant="body1">
                    Người giới thiệu:{" "}
                    <Typography
                      component={"span"}
                      color={order.afft ? "success" : "error"}
                    >
                      {order.aff ? "Không có người giới thiệu" : order.aff.name}
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Key
                    sx={{
                      transform: "rotate(130deg)",
                      color: "var(--c_yellow)",
                    }}
                  />
                  <Typography variant="body1">
                    Mã kích hoạt:{" "}
                    <Typography
                      component={"span"}
                      color={
                        order.fields.fields_ma_kich_hoat ? "success" : "error"
                      }
                    >
                      {order.fields.fields_ma_kich_hoat
                        ? order.fields.fields_ma_kich_hoat
                        : "Không có mã kích hoạt"}
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
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
      {/* Drawer for Filters */}
      <Drawer
        anchor="bottom"
        open={drawerOpenOrder}
        onClose={() => setDrawerOpenOrder(false)}
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
              placeholder="Nhập tên,sđt,ghi chú"
              inputProps={{ "aria-label": "search" }}
              value={textSearchOrderPending}
              onChange={handleChangeSearch}
              inputRef={inputSearchRef}
            />
            {!!textSearchOrderPending && (
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
              <SearchIcon onClick={() => setDrawerOpenOrder(false)} />
            </IconButton>
          </Paper>
          <Box mt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setDrawerOpenOrder(false)}
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
  );
}

export default Pending;
