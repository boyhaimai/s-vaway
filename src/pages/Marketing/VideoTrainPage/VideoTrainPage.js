import React, { useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  styled,
  Card,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Image from "~/Components/Images/Images";
import style from "./videoTrainPage.module.scss";
import * as getCoursesService from "~/service/getCoursesService";
import * as getCourseStudied from "~/service/getCourseStudied";
import * as getMyLesson from "~/service/getMyLesson";
import * as getBuyCourse from "~/service/getBuyCourse";
import { CancelRounded, CheckCircle, ErrorRounded } from "@mui/icons-material";

const cx = classNames.bind(style);

const VideoTrainPage = () => {
  const [tabIndex, setTabIndex] = useState("1");
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [idMyCourses, setIdMyCourses] = useState([]);
  const [myLessons, setMyLessons] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageMyCourse, setCurrentPageMyCourse] = useState(1);
  const [buyCourses, setBuyCourses] = useState([]);
  const [notifiBuyCourse, setNotifiBuyCourse] = useState(null);

  //get all courses
  useEffect(() => {
    const fetchAPI = async () => {
      const resultCourses = await getCoursesService.getCoursesService();
      setCourses(resultCourses.data);
    };
    fetchAPI();
  }, []);

  // get my courses
  useEffect(() => {
    const fetchAPI = async () => {
      const resultCoursesStudies = await getCourseStudied.getCourseStudied();
      setMyCourses(resultCoursesStudies.data);
    };
    fetchAPI();
  }, []);

  // get all my lessons
  useEffect(() => {
    const fetchAPI = async () => {
      const resultMyLesson = await getMyLesson.getMyLesson(idMyCourses);
      setMyLessons(resultMyLesson);
    };
    fetchAPI();
  }, [idMyCourses]);

  const handleChange = (event, index) => {
    setTabIndex(index);
  };

  const handleClickGetIdCourse = (idCourse, idLesson) => {
    navigate(`/ctv/elearning/${idCourse}/${idLesson}`);
  };

  const handleClickPushIdCourse = (idCourse) => {
    setIdMyCourses(idCourse);
    navigate(`/ctv/elearning/${idCourse}/${myLessons.course?._id}`);
  };

  const itemPerPage = 10;

  const totalPage = Math.ceil(courses.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = courses.slice(startIndex, endIndex);

  const totalPageMyCourse = Math.ceil(myCourses.length / itemPerPage);
  const startIndexMyCourse = (currentPageMyCourse - 1) * itemPerPage;
  const endIndexMyCourse = startIndexMyCourse + itemPerPage;
  const currentItemsMyCourse = myCourses.slice(
    startIndexMyCourse,
    endIndexMyCourse
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleClickBuyCourse = (idCourse, lessonId) => {
    const fetchAPI = async () => {
      const resultBuyCourse = await getBuyCourse.getBuyCourse(idCourse);
      setBuyCourses(resultBuyCourse);
      setNotifiBuyCourse(null);
    };
    fetchAPI();

    if (buyCourses.success === true) {
      navigate(`/ctv/elearning/${idCourse}/${lessonId}`);
    }
  };

  useEffect(() => {
    if (buyCourses.success !== undefined) {
      setTimeout(() => {
        setBuyCourses([]);
      }, 2000);
    }
  }, [buyCourses]);

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });

  const formatDuration = (duration) => {
    const hour = String(Math.floor(duration / 3600)).padStart(2, "0");
    const minute = String(Math.floor((duration % 3600) / 60)).padStart(2, "0");
    const second = String(Math.floor((duration % 3600) % 60)).padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  };

  return (
    <Box>
      {buyCourses.success === false ? (
        <Box className={cx("box_copy")}>
          <ErrorRounded sx={{ color: "var(--c_red)", fontSize: "40px" }} />
          <Typography component={"p"} fontSize="14px">
            Bạn không đủ điểm để mua khóa học này
          </Typography>{" "}
          <br />
        </Box>
      ) : buyCourses === true ? (
        <Box className={cx("box_copy")}>
          <CheckCircle sx={{ color: "var(--c_green)", fontSize: "40px" }} />
          <Typography component={"p"} fontSize="14px">
            Đổi điểm thành công
          </Typography>{" "}
          <br />
        </Box>
      ) : null}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          padding: 1,
          paddingBottom: 0,
          m: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold" fontSize={"20px"}>
            Đào tạo
          </Typography>
        </Box>
      </Card>

      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              "& .MuiTab-root": {
                fontSize: "12.5px", // Tăng kích thước font của các tab
                fontWeight: "bold",
              },
            }}
          >
            <Tab label="Tất cả khóa học" value="1" sx={{ width: "50%" }} />
            <Tab label="Khóa học của tôi" value="2" sx={{ width: "50%" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            {courses.length > 0 ? (
              currentItems.map((course) => (
                <Box key={course._id} className={cx("course_item")}>
                  {/* Hình ảnh */}
                  <Image
                    src={course.thumbnail}
                    alt={course.name}
                    className={cx("img_video")}
                  />

                  {/* Nội dung */}
                  <Box sx={{ m: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "16px", color: "#2e7d32" }} // Màu chữ xanh lá nổi bật
                    >
                      {course.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "14px", marginTop: "8px" }}
                    >
                      Coach: {course.coaching}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "14px", marginTop: "4px" }}
                    >
                      {course.lesson} bài học -{" "}
                      {formatDuration(course.duration)} giờ
                    </Typography>
                  </Box>

                  {/* Nút hành động */}
                  <Grid
                    container
                    spacing={1}
                    sx={{ margin: "10px", mb: 2, width: "auto" }}
                  >
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color={course.is_need_buy === 1 ? "error" : "success"}
                        fullWidth
                        className={cx("btn_buy")}
                      >
                        {course.is_need_buy === 1
                          ? `${course.point} điểm`
                          : "Miễn phí"}
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color={course.is_need_buy === 0 ? "success" : "primary"}
                        fullWidth
                        className={cx("btn_buy")}
                        onClick={() => {
                          if (course.is_need_buy === 0) {
                            handleClickGetIdCourse(
                              course._id,
                              course.lesson_id
                            );
                          } else {
                            setNotifiBuyCourse(course._id);
                          }
                        }}
                      >
                        {course.is_need_buy === 0 ? "Học ngay" : "Mua ngay"}
                      </Button>
                    </Grid>
                  </Grid>
                  {notifiBuyCourse === course._id && (
                    <Box className={cx("notify")}>
                      <ErrorRounded
                        fontSize="large"
                        color="warning"
                        sx={{ fontSize: "50px", mt: 2 }}
                      />
                      <Typography variant="h4">
                        Đổi điểm mua khóa học
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "var(--c_text_phu)" }}
                      >
                        Bạn có muốn dùng {course.point} điểm để mua khoá học
                        Demo sản phẩm thanh toán luôn?
                      </Typography>

                      <Box pb={2}>
                        <MyButton onClick={() => setNotifiBuyCourse(false)}>
                          <CancelRounded
                            color="error"
                            className={cx("btn_notify")}
                          />
                        </MyButton>
                        <MyButton
                          onClick={() =>
                            handleClickBuyCourse(course._id, course.lesson_id)
                          }
                        >
                          <CheckCircle
                            color="success"
                            className={cx("btn_notify")}
                          />
                        </MyButton>
                      </Box>
                    </Box>
                  )}
                </Box>
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
          </Box>

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
        </TabPanel>
        {/* tab 2 */}
        <TabPanel value="2">
          <Box>
            {currentItemsMyCourse.map((course) => (
              <Box
                key={course._id}
                className={cx("course_item")}
                onClick={() => {
                  handleClickPushIdCourse(course._id);
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {/* Hình ảnh */}
                  <Image
                    src={course.thumbnail}
                    alt={course.name}
                    className={cx("img_video")}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={cx("time_course")}
                  >
                    {formatDuration(course.duration)}
                  </Typography>
                </Box>

                {/* Nội dung */}
                <Box mt={2}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className={cx("title_course")}
                  >
                    {course.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={totalPageMyCourse}
              page={currentPageMyCourse}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default VideoTrainPage;
