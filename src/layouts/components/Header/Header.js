import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faWatchmanMonitoring } from "@fortawesome/free-brands-svg-icons";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import logoVazoSale from "~/assets/images/vazo-sales.png";
import { RingIcon } from "~/Components/Icons/icons";
import { Wrapper as PopperWrapper } from "~/Components/Popper";
import Avatars from "~/Components/Avatars/Avatars";
import Image from "~/Components/Images/Images";
import Menu from "~/Components/Popper/Menu/Menu";
import styles from "./Header.module.scss";
import * as getNotificationService from "~/service/getNotificationService";
import * as getAllScheduleService from "~/service/getAllSheduleService";
import * as getBirthdayService from "~/service/getBirthdayService";
import * as getWorkService from "~/service/getWorkService";
import * as getServiceSchedule from "~/service/getServiceSchedulesService";
import { Comment, Person } from "@mui/icons-material";

const cx = classNames.bind(styles);

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Xem hồ sơ",
    to: "/ctv/account/index",
  },
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: "Đăng xuất",
  },
];

function Header() {
  const [valueMenu, setValueMenu] = useState("1");
  const [notifications, setNotifications] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [works, setWorks] = useState([]);
  const [services, setServices] = useState([]);

  const today = new Date();
  const currentToday = today.toLocaleDateString("en-GB");

  //all schedules
  useEffect(() => {
    const fetchAPI = async () => {
      const resultAllSchedules =
        await getAllScheduleService.getAllScheduleService(currentToday);
      setSchedules(resultAllSchedules.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //birthdays
  useEffect(() => {
    const fetchAPI = async () => {
      const resultBirthday = await getBirthdayService.getBirthdayService(
        currentToday
      );
      setBirthdays(resultBirthday.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // //works
  useEffect(() => {
    const fetchAPI = async () => {
      const resultWork = await getWorkService.getWorkService(currentToday);
      setWorks(resultWork.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // //services
  useEffect(() => {
    const fetchAPI = async () => {
      const resultService = await getServiceSchedule.getServiceSchedulesService(
        currentToday
      );
      setServices(resultService.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //notifications
  useEffect(() => {
    const fetchAPI = async () => {
      const resultNotifications =
        await getNotificationService.getNotificationService();
      setNotifications(resultNotifications.data);
    };
    fetchAPI();
  }, []);

  const unreadCount = notifications.filter((item) => item.read === 0).length;
  const unscheduleCount = schedules.filter((item) => item.notify).length;

  const handleChange = (event, newValueMenu) => {
    setValueMenu(newValueMenu);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content")}>
          <div className={cx("header_left")}>
            <a href="/ctv">
            {/* <a href="/"> */}
              {" "}
              <Image src={logoVazoSale} alt="logo" className={cx("icon_img")} />
            </a>
          </div>

          <div className={cx("header_right")}>
            <div>
              <Tippy
                render={(attrs) => (
                  <div className={cx("calendars")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      <div className={cx("wrapper_notifi")}>
                        <div className={cx("title_notifi")}>Lịch trình</div>
                        <div className={cx("content_cal")}>
                          <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={valueMenu}>
                              <Box>
                                <TabList
                                  onChange={handleChange}
                                  aria-label="lab API tabs example"
                                  sx={{
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    borderBottom: "none",
                                    "& .MuiTabs-indicator": {
                                      // Ẩn thanh gạch dưới Tab mặc định
                                      display: "none",
                                    },
                                    "& .MuiTabs-flexContainer": {
                                      // wrap index nhấn
                                      flexWrap: "wrap",
                                      padding: "10px",
                                    },
                                    "& .MuiTab-root": {
                                      //tab nhấn
                                      borderRadius: "16px",
                                      border: "1px solid #e0e0e0",
                                      textTransform: "none",
                                      fontWeight: 500,
                                      padding: "0px 16px",
                                      backgroundColor: "white",
                                      minWidth: "unset",
                                      fontSize: "14px",
                                      marginRight: "10px",
                                      mb: 1,
                                    },
                                    "& .Mui-selected": {
                                      // handle khi tab được chọn
                                      backgroundColor: "black",
                                      color: "white !important",
                                    },
                                  }}
                                >
                                  <Tab label="Tất cả" value="1" />
                                  <Tab label="Sinh nhật" value="2" />
                                  <Tab label="Công việc" value="3" />
                                  <Tab label="Dịch vụ" value="4" />
                                </TabList>
                              </Box>

                              {/* Nội dung hiển thị khi chọn tab */}
                              <TabPanel value="1">
                                {schedules === 0 ? (
                                  schedules.map((schedule, index) => (
                                    <Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {" "}
                                        <Box
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            mb: 1,
                                          }}
                                        >
                                          <span className={cx("name")}>
                                            <Person
                                              fontSize="large"
                                              sx={{
                                                color: birthdays.status
                                                  ? birthdays.status.color
                                                  : "black",
                                              }}
                                              className={cx("icon_person")}
                                            />{" "}
                                            {schedule.lead.name}
                                            <div
                                              className={cx("dot_red")}
                                            ></div>
                                          </span>{" "}
                                          -{" "}
                                          <span className={cx("phone")}>
                                            {schedule.lead.phone}
                                          </span>
                                        </Box>
                                        <span className={cx("time_schuedule")}>
                                          {new Date(
                                            schedule.time_notify * 1000
                                          ).toLocaleTimeString()}
                                        </span>
                                      </Box>
                                      <p>
                                        <Comment
                                          sx={{ marginRight: "5px" }}
                                          fontSize="small"
                                          color="success"
                                        />
                                        <span
                                          className={cx("message")}
                                          dangerouslySetInnerHTML={{
                                            __html: schedule.desc,
                                          }}
                                        />
                                      </p>
                                    </Box>
                                  ))
                                ) : (
                                  <div className={cx("noti_none")}>
                                    Không có thông báo nào
                                  </div>
                                )}
                              </TabPanel>
                              {/* tab 2 */}
                              <TabPanel value="2">
                                {birthdays === "" ? (
                                  birthdays.map((schedule, index) => (
                                    <Box key={index}>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {" "}
                                        <Box
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            mb: 1,
                                          }}
                                        >
                                          <span className={cx("name")}>
                                            <Person
                                              fontSize="large"
                                              sx={{
                                                color: birthdays.status
                                                  ? birthdays.status.color
                                                  : "black",
                                              }}
                                            />{" "}
                                            {schedule.lead.name}
                                            <div
                                              className={cx("dot_red")}
                                            ></div>
                                          </span>{" "}
                                          -{" "}
                                          <span className={cx("phone")}>
                                            {schedule.lead.phone}
                                          </span>
                                        </Box>
                                        <span className={cx("time_schuedule")}>
                                          {new Date(
                                            schedule.time_notify * 1000
                                          ).toLocaleTimeString()}
                                        </span>
                                      </Box>
                                      <p>
                                        <Comment
                                          sx={{ marginRight: "5px" }}
                                          fontSize="small"
                                          color="success"
                                        />
                                        <span
                                          className={cx("message")}
                                          dangerouslySetInnerHTML={{
                                            __html: schedule.desc,
                                          }}
                                        />
                                      </p>
                                    </Box>
                                  ))
                                ) : (
                                  <div className={cx("noti_none")}>
                                    Không có thông báo nào
                                  </div>
                                )}
                              </TabPanel>
                              {/* tab 3 */}
                              <TabPanel value="3">
                                {works === "" ? (
                                  works.map((schedule, index) => (
                                    <Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {" "}
                                        <Box
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            mb: 1,
                                          }}
                                        >
                                          <span className={cx("name")}>
                                            <Person
                                              fontSize="large"
                                              sx={{
                                                color: birthdays.status
                                                  ? birthdays.status.color
                                                  : "black",
                                              }}
                                              className={cx("icon_person")}
                                            />{" "}
                                            {schedule.lead.name}
                                            <div
                                              className={cx("dot_red")}
                                            ></div>
                                          </span>{" "}
                                          -{" "}
                                          <span className={cx("phone")}>
                                            {schedule.lead.phone}
                                          </span>
                                        </Box>
                                        <span className={cx("time_schuedule")}>
                                          {new Date(
                                            schedule.time_notify * 1000
                                          ).toLocaleTimeString()}
                                        </span>
                                      </Box>
                                      <p>
                                        <Comment
                                          sx={{ marginRight: "5px" }}
                                          fontSize="small"
                                          color="success"
                                        />
                                        <span
                                          className={cx("message")}
                                          dangerouslySetInnerHTML={{
                                            __html: schedule.desc,
                                          }}
                                        />
                                      </p>
                                    </Box>
                                  ))
                                ) : (
                                  <div className={cx("noti_none")}>
                                    Không có thông báo nào
                                  </div>
                                )}
                              </TabPanel>
                              {/* tab 4 */}
                              <TabPanel value="4">
                                {services === "" ? (
                                  services.map((schedule, index) => (
                                    <Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {" "}
                                        <Box
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            mb: 1,
                                          }}
                                        >
                                          <span className={cx("name")}>
                                            <Person
                                              fontSize="large"
                                              sx={{
                                                color: birthdays.status
                                                  ? birthdays.status.color
                                                  : "black",
                                              }}
                                              className={cx("icon_person")}
                                            />{" "}
                                            {schedule.lead.name}
                                            <div
                                              className={cx("dot_red")}
                                            ></div>
                                          </span>{" "}
                                          -{" "}
                                          <span className={cx("phone")}>
                                            {schedule.lead.phone}
                                          </span>
                                        </Box>
                                        <span className={cx("time_schuedule")}>
                                          {new Date(
                                            schedule.time_notify * 1000
                                          ).toLocaleTimeString()}
                                        </span>
                                      </Box>
                                      <p>
                                        <Comment
                                          sx={{ marginRight: "5px" }}
                                          fontSize="small"
                                          color="success"
                                        />
                                        <span
                                          className={cx("message")}
                                          dangerouslySetInnerHTML={{
                                            __html: schedule.desc,
                                          }}
                                        />
                                      </p>
                                    </Box>
                                  ))
                                ) : (
                                  <div className={cx("noti_none")}>
                                    Không có thông báo nào
                                  </div>
                                )}
                              </TabPanel>
                            </TabContext>
                          </Box>
                        </div>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
                placement="bottom-end"
                trigger="click"
                interactive={true}
              >
                <span classNames={cx("calendar")}>
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className={cx("calendar_icon")}
                  />
                  <span className={cx("message_count")}>{unscheduleCount}</span>
                </span>
              </Tippy>
            </div>

            <div>
              <Tippy
                render={(attrs) => (
                  <div className={cx("notifications")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      <div className={cx("wrapper_notifi")}>
                        <div className={cx("title_notifi")}>Thông báo</div>
                        <div className={cx("content_notifi")}>
                          {notifications ? (
                            notifications.map((notificationn, index) => (
                              <a key={index} href={notificationn.href}>
                                <div className={cx("item_notifi")}>
                                  <div className={cx("img_notifi")}>
                                    <Avatars
                                      src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/462899351_1602777614005302_5579485164047811493_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=D1Prf_kM7V4Q7kNvgFwTWSO&_nc_zt=24&_nc_ht=scontent.fhan14-4.fna&_nc_gid=AsLD8Wws0gk8Ncdf4VqwX0f&oh=00_AYAVrYVwv77sAgWuJ_ICTQlxFL7b-LnE4JcGGlPL0Aq1Mg&oe=675C91B1"
                                      alt="logo"
                                      className={cx("img_avatar")}
                                    />
                                  </div>
                                  <div className={cx("info_notifi")}>
                                    {notificationn.read === 0 ? (
                                      <div className={cx("tb_item")}></div>
                                    ) : null}

                                    <div className={cx("notifi")}>
                                      {notificationn.message.trim()}
                                    </div>
                                    <div className={cx("time_notifi")}>
                                      <span className={cx("time_notifi")}>
                                        {" "}
                                        <span
                                          className={cx("icon_time_notifi")}
                                        >
                                          <FontAwesomeIcon
                                            icon={faWatchmanMonitoring}
                                          />
                                        </span>
                                        {new Date(
                                          notificationn.added_time * 1000
                                        )
                                          .toLocaleString("vi-VN")
                                          .trim()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))
                          ) : (
                            <div className={cx("notifi_empty")}>
                              <span>Không có thông báo nào</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
                placement="bottom-end"
                trigger="click"
                interactive={true}
              >
                <span classNames={cx("ring")}>
                  <RingIcon className={cx("ring-icon")} />
                  <span className={cx("noti_count")}>{unreadCount}</span>
                </span>
              </Tippy>
            </div>

            <Menu items={[MENU_ITEM]}>
              <Image
                // src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/462899351_1602777614005302_5579485164047811493_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=D1Prf_kM7V4Q7kNvgFwTWSO&_nc_zt=24&_nc_ht=scontent.fhan14-4.fna&_nc_gid=AsLD8Wws0gk8Ncdf4VqwX0f&oh=00_AYAVrYVwv77sAgWuJ_ICTQlxFL7b-LnE4JcGGlPL0Aq1Mg&oe=675C91B1"
                alt="user"
                src=""
                className={cx("avatar")}
                // fallback="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/467526382_2015953468923137_6192526598804235208_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=uWdkogrrLZMQ7kNvgHaZXJi&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=AtdKbtXvu5AyRw2faxp64W6&oh=00_AYB42yDbBve0XlHxbhpDExFYGgesRQSFnOxbSuo58s5z2A&oe=675D8DE3"
              />
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
