import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FileUpload } from "@mui/icons-material";
import {
  Autocomplete,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
// import Quill from "quill";
// import TableModule from "quill-table-ui";
import "react-quill/dist/quill.snow.css";
import Image from "../Images/Images";

// Đăng ký module bảng vào Quill

const storage = ["Không quản lý kho", "Quản lý kho"];
const category = ["Danh mục có sẵn", "Đồ ăn"];
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "video", "image"],
    ["clean"],
    // ["table"],
  ],
};

function ItemProduct() {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("1");
  const [selectStorages, setSelectStorages] = useState(false);
  const [text, setText] = useState("");

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const creUrl = URL.createObjectURL(file);
      setImage(creUrl);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeStorage = (value) => {
    console.log(value, "value");

    if (value === "Quản lý kho") {
      setSelectStorages(true);
    } else {
      setSelectStorages(false);
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Thông tin" value="1" sx={{ width: "25%" }} />
            <Tab label="Biến thể" value="2" sx={{ width: "25%" }} />
            <Tab label="Item Three" value="3" sx={{ width: "25%" }} />
            <Tab label="Item Three" value="4" sx={{ width: "25%" }} />
          </TabList>
        </Box>
        {/* tab 1 */}
        <TabPanel value="1">
          <Box>
            <Box textAlign={"center"}>
              {image ? <Image src={image} alt="upload" /> : ""}

              <IconButton>
                <FileUpload fontSize="large" sx={{ ml: "40%" }} />{" "}
                <Input
                  type="file"
                  onChange={handleImageUpload}
                  sx={{ opacity: 0 }}
                ></Input>
              </IconButton>
            </Box>
            {/* input */}
            <Box sx={{ mb: 1 }}>
              <Typography>Tên sản phẩm:(*)</Typography>
              <TextField fullWidth label="Nhập tên sản phẩm" sx={{ mt: 2 }} />
            </Box>

            {/* input */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ width: "48%" }}>
                <Typography>Giá bán:(*)</Typography>
                <TextField
                  label="Nhập tên sản phẩm"
                  sx={{ mt: 2, width: "100%" }}
                />
              </Box>
              <Box sx={{ width: "48%" }}>
                <Typography>Giá so sánh:</Typography>
                <TextField
                  label="Nhập tên sản phẩm"
                  sx={{ mt: 2, width: "100%" }}
                />
              </Box>
            </Box>

            {/* input */}
            <Box sx={{ mb: 1 }}>
              <Typography>Giá nhập:</Typography>
              <TextField fullWidth label="Giá nhập sản phẩm" sx={{ mt: 2 }} />
            </Box>

            {/* input */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ width: "48%" }}>
                <Typography>Hoa hồng:</Typography>
                <TextField label="Hoa hồng" sx={{ mt: 2, width: "100%" }} />
              </Box>
              <Box sx={{ width: "48%" }}>
                <Typography>SKU:</Typography>
                <TextField label="SKU" sx={{ mt: 2, width: "100%" }} />
              </Box>
            </Box>

            {/* input */}
            <Box sx={{ mb: 1 }}>
              <Typography>Khối lượng:</Typography>
              <TextField fullWidth label="Khối lượng(gram)" sx={{ mt: 2 }} />
            </Box>

            {/* input */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ width: "48%" }}>
                <Typography>Đường dẫn:</Typography>
                <TextField label="https://" sx={{ mt: 2, width: "100%" }} />
              </Box>
              <Box sx={{ width: "48%" }}>
                <Typography>Danh mục:</Typography>
                <Autocomplete
                  disablePortal
                  options={category}
                  sx={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>

            {/* input */}
            <Box
              sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ width: "48%" }}>
                <Typography sx={{ mb: 1 }}>Quản lý kho:</Typography>
                <Autocomplete
                  disablePortal
                  options={storage}
                  onChange={(event, value) => handleChangeStorage(value)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              {selectStorages === true ? (
                <Box sx={{ width: "48%" }}>
                  <Typography>Số lượng:</Typography>
                  <TextField label="Số lượng" sx={{ mt: 1, width: "100%" }} />
                </Box>
              ) : (
                ""
              )}
            </Box>

            {/* input */}
            <Box>
              <Typography>Mô tả:</Typography>
              <ReactQuill
                value={text}
                onChange={setText}
                modules={modules}
                formats={[
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "script",
                  "color",
                  "background",
                  "list",
                  "align",
                  "blockquote",
                  "code-block",
                  "link",
                  "video",
                  "image",
                  "table", // Cho phép sử dụng bảng
                ]}
                theme="snow"
              />
            </Box>
          </Box>
        </TabPanel>
        {/* end tab 1 */}
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}

export default ItemProduct;
