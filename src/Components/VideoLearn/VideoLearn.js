import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Paper,
  styled,
  Tab,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  ArrowCircleLeft,
  CancelRounded,
  CheckCircleRounded,
  ExpandMore,
  PlayCircle,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";

import styles from "./VideoLearn.module.scss";
import * as getVideoCourse from "~/service/getVideoCourse";
// import * as getCurrentLesson from "~/service/getCurrentLesson";

const cx = classNames.bind(styles);

function VideoLearn() {
  const [valueTab, setValueTab] = useState("1");
  const { courseId: idCourse, lessonId: idLesson } = useParams();
  const [videoCourses, setVideoCourses] = useState({});
  const [idVideo, setIdVideo] = useState();
  const videoUrl = videoCourses?.course?.lesson?.video;
  const embedUrl = videoUrl?.replace("watch?v=", "embed/").split("&")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [idLesson, idVideo]);

  // get all leson
  useEffect(() => {
    const fetchAPI = async () => {
      const resultVideoCourses = await getVideoCourse.getVideoCourse(
        idCourse,
        idLesson
      );
      setVideoCourses(resultVideoCourses);
    };
    fetchAPI();
  }, [idCourse, idLesson]);
  //lesson current
  useEffect(() => {
    if (!idVideo) return;
    const fetchAPI = async () => {
      const resultVideoCurrent = await getVideoCourse.getVideoCourse(
        idCourse,
        idVideo
      );
      setVideoCourses(resultVideoCurrent);
    };
    fetchAPI();
  }, [idCourse, idVideo]);

  const formatDuration = (duration) => {
    const hour = String(Math.floor(duration / 3600)).padStart(2, "0");
    const minute = String(Math.floor((duration % 3600) / 60)).padStart(2, "0");
    const second = String(Math.floor((duration % 3600) % 60)).padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  };

  const handleChangeTab = (e, value) => {
    setValueTab(value);
  };

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });

  return (
    <Box>
      {/* title courses */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 1,
          padding: 2,
          width: "100%",
          paddingBottom: 0,
          pl: 1,
        }}
      >
        <Paper
          sx={{
            mb: 2,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Typography variant="h5" fontWeight="bold" align="center">
            Video
          </Typography>
          <MyButton
            sx={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <a href="/ctv/daotao">
              <ArrowCircleLeft sx={{ color: "primary !important", fontSize: "32px" }} />
            </a>
          </MyButton>
        </Paper>
      </Card>

      {/* video */}
      <Box sx={{ width: "100%", height: "185px" }}>
        {embedUrl === undefined ? (
          "No data available"
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Video bài học"
            allowFullScreen
          ></iframe>
        )}
      </Box>

      {/* title courses */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 1,
          padding: 2,
          width: "100%",
          paddingBottom: 0,
          pl: 1,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ background: "aqua", borderRadius: 2 }}
          >
            #
            {videoCourses.course?.name === ""
              ? "No data"
              : videoCourses.course?.name}
          </Typography>
        </Box>
      </Card>

      {/* course and contents */}
      <Box className={cx("content")}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Bài học" value="1" />
              <Tab label="Nội dung" value="2" />
              {videoCourses?.course?.lesson?.document === "" ? null : (
                <Tab label="Tài liệu" value="3" />
              )}
            </TabList>
          </Box>
          {/* tab 1 */}
          <TabPanel value="1" sx={{ p: 1 }}>
            <Box>
              <Accordion
                // defaultExpanded
                sx={{ background: "var(--b_liner_2)" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {videoCourses?.data?.[0]?.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  {videoCourses?.data?.[0]?.lessons?.map((course, index) => (
                    <Box
                      className={cx("wrapper_lessons")}
                      key={index}
                      onClick={() => {
                        setIdVideo(course._id);
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        {videoCourses?.course?.lesson?._id === course._id ? (
                          <PlayCircle
                            color="error"
                            sx={{ mr: 1, marginBottom: "4px" }}
                          />
                        ) : (
                          ""
                        )}{" "}
                        {course?.name}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <AccessTime sx={{ mr: 1 }} />{" "}
                        <span style={{ paddingRight: "20px" }}>
                          {formatDuration(course?.duration)}
                        </span>{" "}
                        {course?.is_learned === true ? (
                          <CheckCircleRounded
                            color="success"
                            className={cx("check_complete")}
                          />
                        ) : (
                          <CancelRounded
                            color="error"
                            className={cx("check_complete")}
                          />
                        )}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </TabPanel>
          {/* tab 1 */}
          <TabPanel value="2">
            <Typography variant="body1">
              {videoCourses?.course?.lesson?.note === ""
                ? "Không có nội dung"
                : videoCourses?.course?.lesson?.note}
            </Typography>
          </TabPanel>
          {/* tab 3 */}
          <TabPanel value="3">
            {videoCourses.course?.lesson?.documents
              ? "Không có tài liệu"
              : videoCourses.course?.lesson?.documents?.map((item, index) => (
                  <Box
                    className={cx("wrapper_lessons")}
                    key={index}
                    component={"a"}
                    href={item.link}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default VideoLearn;
