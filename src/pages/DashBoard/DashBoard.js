import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  styled,
  Tab,
  Typography,
} from "@mui/material";
import { ChevronRight, Delete, Share } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRef } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import styles from "./DashBoard.module.scss";
import campaign from "~/assets/images/trophy.png";
import { PromotionIcon } from "~/Components/Icons/icons";
import config from "~/config";
import Image from "~/Components/Images/Images";
import * as getProductService from "~/service/getProductService";
import * as getProfileService from "~/service/getProfileService";
import * as getOrderConfirmedService from "~/service/getOrderConfirmed";
import * as getPaymentedService from "~/service/getPaymentedService";
import * as getCampaign from "~/service/getCampaign";
import * as getAllNoteService from "~/service/allNote";
import * as addNode from "~/service/addNodeService";
import * as deleteNote from "~/service/deleteNote";
import * as doneNote from "~/service/doneNote";
import * as getTuyenduoi from "~/service/getTuyenduoi";
import * as getDiscountProduct from "~/service/getDiscountProductService";
import * as getDetailDiscountProduct from "~/service/getDetailDiscountProductService";

const cx = classNames.bind(styles);

const itemPerPage = 10;
function DashBoard() {
  const [name, setName] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [inputNote, setInputNode] = useState("");
  const [complete, setComplete] = useState(Array(notes.length).fill(false));
  const [imageCampaign, setImageCampaign] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef();
  const [discounts, setDiscounts] = useState([]);
  const [tuyenDuoi, setTuyenDuoi] = useState([]);
  const [valueTabProduct, setValueTabProduct] = useState("1");
  const [discountEvents, setDiscountEvents] = useState([]);
  const [idDiscountEvents, setIdDiscountEvents] = useState(null);
  const [detaiDiscountProducts, setDetaiDiscountProducts] = useState([]);

  //call api all note
  useEffect(() => {
    const fetchAPI = async () => {
      const resultAllNote = await getAllNoteService.allNote();
      setNotes(resultAllNote);
    };
    fetchAPI();
  }, []);

  //call api product
  useEffect(() => {
    const fetchAPI = async () => {
      const resultProduct = await getProductService.getProduct();
      setProducts(resultProduct.data);
    };
    fetchAPI();
  }, []);

  //call api profile
  useEffect(() => {
    const fetchAPI = async () => {
      const resultName = await getProfileService.getProfileService();
      setName(resultName.data);
    };
    fetchAPI();
  }, []);

  //call api order confirmed
  useEffect(() => {
    const fetchAPI = async () => {
      const resultName =
        await getOrderConfirmedService.getOrderConfirmedService();
      setOrders(resultName.data);
    };
    fetchAPI();
  }, []);

  //call api paymented
  useEffect(() => {
    const fetchAPI = async () => {
      const resultDiscount = await getPaymentedService.getPaymentedService();
      setDiscounts(resultDiscount.data);
    };
    fetchAPI();
  }, []);

  //call api campaign
  useEffect(() => {
    const fetchAPI = async () => {
      const resultCampaign = await getCampaign.getCampaign();
      setImageCampaign(resultCampaign.data);
    };
    fetchAPI();
  }, []);

  //tuyen duoi
  useEffect(() => {
    const fetchAPI = async () => {
      const resultTuyenDuoi = await getTuyenduoi.getTuyenduoi();
      setTuyenDuoi(resultTuyenDuoi.data);
    };
    fetchAPI();
  }, []);

  //call API discount
  useEffect(() => {
    const fetchAPI = async () => {
      const resultDiscountEvent = await getDiscountProduct.getDiscountProduct();
      setDiscountEvents(resultDiscountEvent.data);
    };
    fetchAPI();
  }, []);

  //call API detail discount products
  useEffect(() => {
    const fetchAPI = async () => {
      const resultDetailDiscountProduct =
        await getDetailDiscountProduct.getDetailDiscountProduct(
          idDiscountEvents
        );
      setDetaiDiscountProducts(resultDetailDiscountProduct.data);
    };
    fetchAPI();
  }, [idDiscountEvents]);

  //tổng click
  const handleSumClick = imageCampaign.reduce(
    (acc, campaign) => acc + campaign.access.total,
    0
  );

  // tổng hoa hoa hồng
  const handleSumDiscount = discounts.reduce((sum, item) => {
    if (
      item.products &&
      item.products.length > 0 &&
      item.products[0].discount > 0
    ) {
      return sum + item.products[0].price / item.products[0].discount;
    }
    return sum;
  }, 0);

  //handle add
  const handleAdd = async () => {
    try {
      if (inputNote.trim() === "") return;
      const newNoteId = await addNode.addNode(inputNote);
      const newNote = {
        id: newNoteId, // ID trả về từ API
        user_id: "432", // Giả sử user_id là cố định
        message: inputNote, // Lấy message từ debounceValue
        added_time: Math.floor(Date.now() / 1000), // Thời gian hiện tại (timestamp)
        done: "0", // Trạng thái mặc định
      };
      setNotes((prevNotes) => [...prevNotes, newNote]); // Cập nhật ngay lập tức
      setInputNode("");
      inputRef.current.focus();
    } catch (error) {
      console.log("Lỗi khi thêm ghi chú:", error);
    }
  };

  //handle remove
  const handRemoveNote = async (id) => {
    try {
      await deleteNote.deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.log(err, "err");
    }
  };

  //handle done
  useEffect(() => {
    setComplete(notes.map((note) => note.done === "1")); // Nếu done="1" => true (đã hoàn thành)
  }, [notes]);

  const toggleComplete = async (id, index) => {
    try {
      const currenDone = notes[index]?.done === "1";
      setNotes((prevNotes) =>
        prevNotes.map((note, i) =>
          i === index ? { ...note, done: currenDone ? "0" : "1" } : note
        )
      );
      await doneNote.doneNote(id, currenDone ? 0 : 1);
    } catch (err) {
      console.log(err, "err");
    }
  };

  // handle change tab
  const handleChangeTabProduct = (event, newValue) => {
    setValueTabProduct(newValue);
  };

  //handle share products
  const handleShare = async (link, pro) => {
    if (!link && link.trim() === "") return alert("Link is empty");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Link",
          text: "link product",
          url: link,
        });
      } catch (error) {
        console.error("Error sharing the link:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(link);
        alert("Link đã được copy vào clipboard");
      } catch (err) {
        console.error("Error copying the link:", err);
        alert("Failed to copy the link. Please try manually.");
      }
    }
  };

  // phân trang
  const totalPage = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  // customize button
  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
    marginLeft: "5px",
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title_stats")}>
          <Typography variant="h5" className={cx("title")}>
            Xin chào ,<span> {name.name}</span>!
          </Typography>
          <p className={cx("description_title")}>
            Sau đây là những gì đang diễn ra tại cửa hàng của bạn ngày hôm nay.
          </p>
        </div>
        <NavLink to={config.routes.detail} alt=" " className={cx("detail")}>
          Chi tiết <ChevronRight fontSize="large" />
        </NavLink>
        <div className={cx("total")}>
          <span key={campaign.id}>
            <p>{handleSumClick}</p>Click
          </span>

          <span>
            <p>{orders.length}</p>Đơn hàng
          </span>
          <span>
            Hoa hồng ước tính
            <p className={cx("total_discount")}>
              {handleSumDiscount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </span>
        </div>
        <div className={cx("campaign")}>
          <NavLink to={config.routes.campaign}>
            <span>
              <img className={cx("img_campaign")} src={campaign} alt=" "></img>
            </span>
            <p>Chiến dịch</p>
          </NavLink>
          <NavLink to={config.routes.orders}>
            <span>
              <PromotionIcon />
            </span>
            <p>Đơn hàng</p>
          </NavLink>
        </div>
      </div>

      {/* note */}
      <Box className={cx("wrapper_box")}>
        <Typography variant="h6" sx={{ mb: -2 }}>
          <Badge badgeContent={notes.length} color="error" sx={{ mr: 1.5 }}>
            <NotificationsIcon color="action" fontSize="large" />
          </Badge>
          Ghi nhớ nhanh
        </Typography>
        <Box className={cx("input_box")} sx={{ mt: 3 }}>
          <TextField
            value={inputNote}
            fullWidth
            label="Nhập tên công việc"
            onChange={(e) => setInputNode(e.target.value)}
            inputRef={inputRef}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
            onClick={handleAdd}
          >
            <SendIcon />
          </Button>
        </Box>
        <Box>
          <ul className={cx("wrap_item_note")}>
            {notes?.map((item, index) => (
              <li
                className={cx("item_note", { completed: complete[index] })}
                key={index}
              >
                <Typography onClick={() => toggleComplete(item.id, index)}>
                  {" "}
                  {item.message}
                </Typography>
                <IconButton>
                  <Delete
                    color="error"
                    onClick={() => handRemoveNote(item.id)}
                  />
                </IconButton>
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <div className={cx("content")}>
        {/* slider campaign */}
        <div className={cx("slider_product")}>
          <Carousel controls={false}>
            <Carousel.Item>
              <Box
                component={"a"}
                href={imageCampaign[0]?.home_url}
                target="_blank"
              >
                <Box className={cx("box_slider")}>
                  <Image
                    className={cx("img_slider")}
                    src={imageCampaign[0]?.home_logo}
                    alt="First slide"
                  />
                </Box>
              </Box>
            </Carousel.Item>
            <Carousel.Item>
              <Box
                component={"a"}
                href={imageCampaign[1]?.home_url}
                target="_blank"
              >
                <Box className={cx("box_slider")}>
                  <Image
                    className={cx("img_slider")}
                    src={imageCampaign[1]?.home_logo}
                    alt="First slide"
                  />
                </Box>
              </Box>
            </Carousel.Item>
            <Carousel.Item>
              <Box
                component={"a"}
                href={imageCampaign[2]?.home_url}
                target="_blank"
              >
                <Box className={cx("box_slider")}>
                  <Image
                    className={cx("img_slider")}
                    src={imageCampaign[2]?.home_logo}
                    alt="First slide"
                  />
                </Box>
              </Box>
            </Carousel.Item>
          </Carousel>
        </div>

        <Box className={cx("content_product")}>
          {/* Products */}
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              backgroundColor: "var(--bg_color)",
              paddingBottom: "20px",
              borderRadius: "12px",
            }}
          >
            <TabContext value={valueTabProduct}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTabProduct}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTab-root": {
                      color: "black", // Màu tab bình thường
                      fontWeight: "bold",
                      fontSize: "12px",
                    },
                    "& .Mui-selected": {
                      color: "red", // Màu tab khi active
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Tab
                    label="Tất cả sản phẩm"
                    className={cx("tab_products")}
                    value="1"
                  />
                  <Tab
                    label="Sản phẩm khuyến mãi"
                    className={cx("tab_products")}
                    value="2"
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                {/* Tất cả sản phẩm */}
                <div className={cx("list_product")}>
                  <Grid container spacing={1}>
                    {products.length > 0 ? (
                      currentItems.map((product, index) => (
                        <Grid item xs={6} key={index}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Image
                              className={cx("img_product")}
                              src={product.src}
                              alt="product"
                            />

                            <CardContent
                              sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                variant="h6"
                                component="h2"
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "1rem",
                                  mb: 1,
                                }}
                              >
                                {product.name}
                              </Typography>

                              <Typography
                                variant="body1"
                                sx={{
                                  mt: "auto",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                  color: "#FF4500",
                                }}
                              >
                                {product.price.toLocaleString("vi-VN")}
                              </Typography>

                              <Box
                                sx={{
                                  alignItems: "center",
                                  mt: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ marginBottom: "5px" }}
                                  >
                                    Còn:{product.quantity} | Biến thể:
                                    {product.variant}
                                  </Typography>
                                  <>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#FF4500",
                                        display: "block",
                                      }}
                                    >
                                      Tỷ lệ hoa hồng: {product.discount}%
                                    </Typography>
                                  </>
                                </Box>

                                {/* Nút share */}
                                <MyButton
                                  variant="contained"
                                  size="small"
                                  color="warning"
                                  onClick={() =>
                                    handleShare(product.external_link)
                                  }
                                >
                                  <Share />
                                </MyButton>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <CircularProgress sx={{ color: "black" }} />
                      </Box>
                    )}
                  </Grid>
                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ p: "5px" }}>
                {/* Sản phẩm khuyến mãi */}
                <Box>
                  {discountEvents.map((discountEvent, index) => (
                    <Box>
                      <Accordion
                        key={index}
                        sx={{
                          borderRadius: "10px",
                          mb: 2,
                          backgroundImage: "var(--b_liner_2)",
                        }}
                        onClick={() => setIdDiscountEvents(discountEvent._id)}
                      >
                        <AccordionSummary
                          aria-controls="panel1-content"
                          id="panel1-header"
                          sx={{
                            p: "10px",
                          }}
                        >
                          <Box sx={{ width: "100%" }}>
                            <Image
                              className={cx("img_discount")}
                              src={discountEvent.src}
                              alt={discountEvent.name}
                            />
                            <Typography
                              variant="h4"
                              gutterBottom
                              fontSize={"16px"}
                              fontWeight={"bold"}
                            >
                              {discountEvent.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              gutterBottom
                              fontSize={"12px"}
                            >
                              {discountEvent.desc}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                              fontSize={"12px"}
                            >
                              Ngày hết hạn:{" "}
                              {new Date(
                                discountEvent.time * 1000
                              ).toLocaleDateString("vi-VN")}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={1}>
                            {detaiDiscountProducts.items?.map(
                              (product, index) => (
                                <Grid item xs={6} key={index}>
                                  <Box
                                    component={"a"}
                                    href={detaiDiscountProducts.url}
                                    target="_blank"
                                  >
                                    <Card
                                      sx={{
                                        height: "100%",
                                        marginBottom: "30px",
                                        position: "relative",
                                      }}
                                    >
                                      <Image
                                        style={{ height: "85px" }}
                                        src={product?.image}
                                        alt={product?.text}
                                      />
                                      <CardContent>
                                        <Typography
                                          gutterBottom
                                          variant="h6"
                                          component="div"
                                          fontSize={"14px"}
                                          fontWeight={"bold"}
                                        >
                                          {product?.text}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          fontSize={"12px"}
                                        >
                                          <s>
                                            {(product?.price_compare).toLocaleString(
                                              "vi-VN"
                                            )}
                                          </s>{" "}
                                          <Typography
                                            component={"span"}
                                            sx={{
                                              color: "var(--C_red_light)",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {" "}
                                            {(product?.price).toLocaleString(
                                              "vi-VN"
                                            )}
                                          </Typography>
                                        </Typography>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={() =>
                                            handleShare(
                                              detaiDiscountProducts.url
                                            )
                                          }
                                          target="_blank"
                                          style={{
                                            position: "absolute",
                                            bottom: "20px",
                                            right: "50%",
                                            transform: "translateX(50%)",
                                            width: "80%",
                                          }}
                                        >
                                          <Share />
                                        </Button>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>

        {/* Phân trang */}
        <Box
          sx={{
            mt: 1,
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
      </div>
    </div>
  );
}

export default DashBoard;
