import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  styled,
  Paper,
  InputBase,
  Divider,
  Pagination,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Clear, Share } from "@mui/icons-material";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useRef } from "react";

import styles from "./Product.module.scss";
import Image from "~/Components/Images/Images";
import useDebounce from "~/hook/usedebounce";
import * as getProductService from "~/service/getProductService";
import * as getSearchProductService from "~/service/getSearchProductService";

const cx = classNames.bind(styles);

const itemPerPage = 10;

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSeachProduct, setInputSeachProduct] = useState("");
  const debounceValue = useDebounce(inputSeachProduct, 800);
  const inputSearchRef = useRef();
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultProduct = await getProductService.getProduct();
      setProducts(resultProduct.data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultSearchProduct =
        await getSearchProductService.getSearchProductService(debounceValue);
      setProducts(resultSearchProduct.data);
    };
    fetchAPI();
  }, [debounceValue]);

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
    marginLeft: "5px",
  });

  //handles Search
  const handleChangeSearch = (event) => {
    const value = event.target.value;

    if (!value.startsWith(" ")) {
      setInputSeachProduct(value);
    }
  };
  //clear input
  const handleClearInputSeach = () => {
    setInputSeachProduct("");
    inputSearchRef.current.focus();
  };
  //handle share
  const handleShare = async (link) => {
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
  // handle close notification
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopy(false);
  };

  //handle pagination
  const totalPage = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <Snackbar
          open={copy}
          autoHideDuration={2000}
          onClose={handleClose}
          sx={{ position: "fixed", top: "-680px", left: 0 }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Copy Save Success
          </Alert>
        </Snackbar>

        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            padding: 1,
            mb: 1,
            mt: 1,
            paddingBottom: 0,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Sản phẩm
            </Typography>
          </Box>
        </Card>

        {/* Card chứa các nút form tìm kiếm, sao chép, tải xuống và số lượng hiển thị */}
        <Card variant="outlined" sx={{ borderRadius: 2, padding: 2, mb: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              mt: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search sản phẩm"
              inputProps={{ "aria-label": "search" }}
              value={inputSeachProduct}
              onChange={handleChangeSearch}
              inputRef={inputSearchRef}
            />
            {!!inputSeachProduct && (
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
      </Box>

      <Box sx={{ padding: 1 }}>
        <Grid container spacing={1}>
          {products.length > 0 ? (
            currentItems.map((product) => (
              <Grid item xs={6} sm={6} md={6} key={product._id}>
                <Card sx={{ height: "100%" }}>
                  {/* Hình ảnh sản phẩm */}
                  <Image
                    src={product.src}
                    alt={product.name}
                    className={cx("img_product")}
                  />
                  <CardContent>
                    {/* Tên sản phẩm */}
                    <Typography variant="h6" fontWeight={"bold"}>
                      {product.name}
                    </Typography>
                    {/* Giá sản phẩm */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="red"
                          fontWeight="bold"
                          fontSize={14}
                        >
                          {product.price.toLocaleString()} đ
                        </Typography>
                        {/* Hoa hồng và số lượng */}
                        <Typography variant="body2" color="textSecondary">
                          Hoa hồng: {product.discount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Số lượng: {product.quantity}
                        </Typography>
                      </Box>
                      {/* Hành động */}
                      <Box>
                        <MyButton
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => handleShare(product.external_link)}
                        >
                          <Share />
                        </MyButton>
                      </Box>
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
        </Grid>
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
    </div>
  );
};

export default ProductCards;
