import { useState, useEffect, useRef } from "react";
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
  TextField,
  CircularProgress,
} from "@mui/material";
import { Clear, Close, Download, Loop, Save, Share } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";

import Image from "~/Components/Images/Images";
import styles from "./CreateImagePage.module.scss";
import useDebounce from "~/hook/usedebounce";
import * as getCreateImageService from "~/service/getCreateImageService";
import * as getSearchImageService from "~/service/getSearchImageService";
import * as getSelectedImageService from "~/service/getSelectedImageCreate";

const cx = classNames.bind(styles);

const itemPerPage = 10;
const CreateImagePage = () => {
  const [images, setImages] = useState([]);
  const [idImage, setIdImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [detaiCreatedImage, setDetaiCreatedImage] = useState(false);
  const [resultCreatedImage, setResultCreatedImage] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchImages, setSearchImages] = useState("");
  const debounceValue = useDebounce(searchImages, 800);
  const inputSearchRef = useRef();
  const stageRef = useRef(null);

  //call API Image
  useEffect(() => {
    const fetchAPI = async () => {
      const resultImage = await getCreateImageService.getCreateImage();
      setImages(resultImage.data);
    };
    fetchAPI();
  }, []);

  //call API Search Image
  useEffect(() => {
    const fetchAPI = async () => {
      const resultSearchImage =
        await getSearchImageService.getSearchImageService(debounceValue);
      setImages(resultSearchImage.data);
    };

    fetchAPI();
  }, [debounceValue]);

  //call API Selected Image
  useEffect(() => {
    const fetchAPI = async () => {
      const resultSelectedImage =
        await getSelectedImageService.getSelectedImageService(idImage);
      setSelectedImage(resultSelectedImage.data);
    };
    fetchAPI();
  }, [idImage]);

  //handle Search Image
  const handleChangeSearch = (event) => {
    const value = event.target.value;

    if (!value.startsWith(" ")) {
      setSearchImages(value);
    }
  };

  const handleClearInputSeach = () => {
    setSearchImages("");
    inputSearchRef.current.focus();
  };

  //handle pagination
  const totalPage = Math.ceil(images.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = images.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  //close modal
  const handleCloseModal = () => {
    setDetaiCreatedImage(false);
    setResultCreatedImage(false);
    setFormData({});
  };

  //handle download
  const handleDownload = () => {
    if (!stageRef.current) {
      console.error("Stage reference is not available.");
      return;
    }

    try {
      const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "Image_canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  //handle share
  const handleShare = async () => {
    if (!stageRef.current) return;

    const canvas = stageRef.current.toCanvas({ pixelRatio: 2 });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "canvas_Image.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: "Share Image",
            text: "Check out this amazing image I created with S-Vaway!",
            files: [file],
          });
        } catch (error) {
          console.error("Error sharing the image:", error);
        }
      } else {
        alert("Your browser does not support sharing files.");
      }
    }, "image/png");
  };

  //mine
  const MyCard = styled(Card)({
    color: " var(--c_white)",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#43cea2,#185a9d)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
  });

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });
  ///////////////////////////////////////////////////////////////////////
  //handle create Image
  const handleClickCreateImage = (id) => {
    setIdImage(id);
    setDetaiCreatedImage(true);
  };

  const handleClickResultImage = () => {
    setResultCreatedImage(true);
    setDetaiCreatedImage(false);
  };

  const handleClickReCreateImage = () => {
    setFormData({});
    setDetaiCreatedImage(true);
    setResultCreatedImage(false);
  };

  const handleChangeFormInput = (e, input, formId) => {
    const { type, name, files, value } = e.target;

    setFormData((prevState) => {
      // Lấy dữ liệu hiện tại của form dựa trên formId
      const currentFormData = prevState[formId] || {};

      // Nếu là trường ảnh, lưu URL của ảnh
      if (type === "file") {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);
        return {
          ...prevState,
          [formId]: {
            ...currentFormData,
            [name]: imageUrl, // Lưu URL ảnh vào formData
          },
        };
      } else {
        // Nếu là trường text, lưu giá trị nhập vào
        return {
          ...prevState,
          [formId]: {
            ...currentFormData,
            [name]: value, // Lưu giá trị text vào formData
          },
        };
      }
    });
  };

  const aspectRatio =
    selectedImage.configs?.height / selectedImage.configs?.width;

  // Đặt kích thước của Stage
  const stageWidth = window.innerWidth; // Chiều rộng của Stage (100%)
  const stageHeight = stageWidth * aspectRatio; // Chiều cao tự động điều chỉnh

  // Tính toán scale để điều chỉnh các phần tử trong Layer
  const scale = stageWidth / selectedImage.configs?.width;

  ////////////////////////////////////////////////////////////////////////////////////

  const backgroundImage = new window.Image();
  backgroundImage.crossOrigin = "anonymous"; // Cho phép vẽ lên canvas mà không bị lỗi CORS
  backgroundImage.src = selectedImage.configs?.background;

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
          paddingBottom: 0,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Tạo ảnh
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
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm khách hàng"
            inputProps={{ "aria-label": "search" }}
            value={searchImages}
            onChange={handleChangeSearch}
            inputRef={inputSearchRef}
          />
          {!!searchImages && (
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

      {/* layer create image */}
      {detaiCreatedImage ? (
        <Box className={cx("modal")}>
          <Box
            sx={{
              background: "var(--c_white)",
              borderRadius: 2,
              pb: 1,
            }}
          >
            {/* title detail Image */}
            <Box className={cx("wrapper_modal")}>
              <Typography variant="h5" fontWeight="bold" sx={{ m: 1 }}>
                Tạo ảnh {selectedImage.name}
              </Typography>
              <MyButton
                variant="contained"
                color="error"
                onClick={handleCloseModal}
                sx={{ mr: 1, p: "10px", borderRadius: "50%" }}
              >
                <Close />
              </MyButton>
            </Box>
            {/* content detail create image */}
            <Box sx={{ m: 1 }}>
              <Paper sx={{ p: 2 }}>
                {selectedImage?.configs?.texts?.map((input, index) => (
                  <Box key={index}>
                    <Typography variant="h6" mb={1} mt={1}>
                      {input?.label}
                    </Typography>
                    <TextField
                      type={input.type === "image" ? "file" : "text"} // Xác định kiểu input
                      name={input.label} // Tên trường (dùng để lưu vào formData)
                      placeholder={input.placeholder} // Placeholder từ API
                      inputProps={
                        input.type === "image" ? { accept: "image/*" } : {} // Chỉ chấp nhận file ảnh nếu type là 'image'
                      }
                      onChange={(e) =>
                        handleChangeFormInput(e, input, selectedImage.id)
                      } // Truyền formId vào đây
                      variant="outlined"
                      size="large"
                      fullWidth
                    />
                  </Box>
                ))}
              </Paper>
            </Box>
            <Box sx={{ width: "100%", padding: 2, height: "255px" }}>
              <Image
                style={{ borderRadius: "10px", width: "100%", height: "100%" }}
                src={selectedImage?.configs?.background}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <MyButton
                sx={{ fontSize: "15px" }}
                onClick={handleClickResultImage}
              >
                <Save sx={{ fontSize: "25px", mr: 1 }} color="primary" /> Tạo
              </MyButton>
            </Box>
          </Box>
        </Box>
      ) : resultCreatedImage ? (
        // layer result create image
        <Box className={cx("modal")}>
          <Box
            sx={{
              background: "var(--c_white)",
              borderRadius: 2,
              pb: 1,
            }}
          >
            {/* Header của modal */}
            <Box className={cx("wrapper_modal")}>
              <Typography variant="h5" fontWeight="bold">
                Tạo ảnh {selectedImage.name}
              </Typography>
              <MyButton
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                <Close size="large" onClick={handleCloseModal} />
              </MyButton>
            </Box>
            {/* Canvas để render ảnh */}
            <Stage width={stageWidth} height={stageHeight} ref={stageRef}>
              <Layer>
                {/* Render ảnh nền */}
                <KonvaImage
                  image={backgroundImage}
                  width={stageWidth}
                  height={stageHeight}
                />

                {/* Render các phần tử từ API */}
                {selectedImage.configs?.texts.map((item, index) => {
                  const {
                    type,
                    position,
                    align,
                    style,
                    font,
                    fontStyle,
                    rounded,
                    size,
                  } = item;
                  const x = Number(position.x) * scale;
                  let y = Number(position.y) * scale;

                  const inputValue =
                    formData[selectedImage.id]?.[item.label] ||
                    item.placeholder; // Lấy dữ liệu từ form

                  const width = Number(size?.width) * scale;

                  if (type === "text") {
                    const fontSize = parseInt(font) * scale;
                    y = y - fontSize / 1;
                    return (
                      <Text
                        key={index}
                        text={inputValue} // Hiển thị nội dung từ form
                        x={x}
                        y={y}
                        fontSize={parseInt(font) * scale}
                        fontFamily={font.split(" ")[1]}
                        fontStyle={fontStyle}
                        fill={style}
                        align={align}
                      />
                    );
                  } else if (type === "image") {
                    const uploadedImage = new window.Image();
                    uploadedImage.crossOrigin = "anonymous"; // Tránh lỗi CORS
                    uploadedImage.src = inputValue;

                    return (
                      <KonvaImage
                        key={index}
                        x={x}
                        y={y}
                        width={Number(item.size?.width) * scale}
                        height={Number(item.size?.height) * scale}
                        image={uploadedImage} // Ảnh do user upload
                        cornerRadius={rounded === "true" ? width / 2 : 0}
                      />
                    );
                  }

                  return null;
                })}
              </Layer>
            </Stage>

            {/* Các nút tải xuống và tạo lại */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <MyButton sx={{ fontSize: "15px" }} onClick={handleDownload}>
                <Download sx={{ fontSize: "25px", mr: 1 }} color="primary" />
              </MyButton>
              <MyButton
                sx={{ fontSize: "15px" }}
                onClick={handleClickReCreateImage}
              >
                <Loop sx={{ fontSize: "25px", mr: 1 }} color="primary" />
              </MyButton>
              <MyButton sx={{ fontSize: "15px" }} onClick={handleShare}>
                <Share sx={{ fontSize: "25px", mr: 1 }} color="primary" />
              </MyButton>
            </Box>
          </Box>
        </Box>
      ) : null}

      {images.length > 0 ? (
        currentItems.map((item) => (
          <MyCard
            // sx={{padding: 0}}
            key={item.id}
            onClick={() => handleClickCreateImage(item.id)}
          >
            <CardContent sx={{ padding: 0 }}>
              <Image
                src={item.image}
                alt={item.name}
                className={cx("img_banner")}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 10px 0 10px",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      color: "#6a1b9a",
                    }}
                  >
                    #{item.id} - {item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="var(--c_white)"
                    sx={{
                      fontSize: "10px",
                      mt: 1,
                    }}
                  >
                    {item.desc || "Không có mô tả"}
                  </Typography>
                </Box>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    className={cx("btn_create_image")}
                    onClick={() => handleClickCreateImage(item.id)}
                    sx={{ ml: 1 }}
                  >
                    Tạo ảnh
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </MyCard>
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

      {/* phân trang */}
      <Box
        sx={{
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
};

export default CreateImagePage;
