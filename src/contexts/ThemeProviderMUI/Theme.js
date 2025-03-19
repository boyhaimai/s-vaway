import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const Theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Màu chính
    },
    secondary: {
      main: "#ff4081", // Màu phụ
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            color: "yellow", // Màu số trang
            fontSize: "15px", // Làm số trang lớn hơn
            minWidth: "20px", // Kích thước tối thiểu của ô trang
            height: "20px", // Chiều cao để nút to hơn
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#ff4081", // Màu dấu "..."
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.MuiPaginationItem-previous, &.MuiPaginationItem-next, &.MuiPaginationItem-firstLast":
            {
              color: "#ff4081", // Màu của nút Prev & Next
              fontSize: "24px", // Tăng kích thước nút Prev/Next
              fontWeight: "bold",
              minWidth: "60px", // Nút lớn hơn
              height: "60px", // Chiều cao lớn hơn
              padding: "10px", // Tăng khoảng cách bên trong
            },
          "&.Mui-disabled": {
            color: "#ccc",
          },
        },
      },
    },
  },
});

export default Theme;
