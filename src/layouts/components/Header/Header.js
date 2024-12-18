import React, { useState } from "react";
import classNames from "classnames/bind";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import logoVazoSale from "~/assets/images/vazo-sales.png";
import { RingIcon } from "~/Components/Icons/icons";
import { Wrapper as PopperWrapper } from "~/Components/Popper";
import Avatars from "~/Components/Avatars/Avatars";
import Image from "~/Components/Images/Images";
import Menu from "~/Components/Popper/Menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faWatchmanMonitoring } from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Xem hồ sơ",
    to: "/acount",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Cài đặt",
    to: "/setting/all",
  },
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: "Đăng xuất",
  },
];

function Header() {
  const [active,setActive] = useState('Tất cả')
  const [showContent, setShowContent] = useState([])

  const handleActive = (tab) => {
    setActive(tab)
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content")}>
          <div className={cx("header_left")}>
            <Image src={logoVazoSale} alt="logo" className={cx("icon_img")} />
          </div>

          <div className={cx("header_right")}>
            <Tippy
              render={(attrs) => (
                <div className={cx("calendars")} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <div className={cx("wrapper_notifi")}>
                      <div className={cx("title_notifi")}>Lịch trình</div>
                      <div className={cx("content_cal")}>
                        <div className={cx("title_cal")}>
                          <span className={cx("item_tile_cal", { activeCV: active === "Tất cả" })} onClick={()=> handleActive('Tất cả')}>Tất cả</span>
                          <span className={cx("item_tile_cal", { activeCV: active === "Sinh nhật" })} onClick={()=> handleActive('Sinh nhật')}>Sinh nhật</span>
                          <span className={cx("item_tile_cal", { activeCV: active === "Công việc" })} onClick={()=> handleActive('Công việc')}>Công việc</span>
                          <span className={cx("item_tile_cal", { activeCV: active === "Dịch vụ" })} onClick={()=> handleActive('Dịch vụ')}>Dịch vụ</span>                    
                        </div>
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
                <span className={cx("message_count")}>4</span>
              </span>
            </Tippy>

            <Tippy
              render={(attrs) => (
                <div className={cx("notifications")} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <div className={cx("wrapper_notifi")}>
                      <div className={cx("title_notifi")}>Thông báo</div>
                      <div className={cx("content_notifi")}>
                        <div className={cx("item_notifi")}>
                          <div className={cx("img_notifi")}>
                            <Avatars
                              src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/462899351_1602777614005302_5579485164047811493_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=D1Prf_kM7V4Q7kNvgFwTWSO&_nc_zt=24&_nc_ht=scontent.fhan14-4.fna&_nc_gid=AsLD8Wws0gk8Ncdf4VqwX0f&oh=00_AYAVrYVwv77sAgWuJ_ICTQlxFL7b-LnE4JcGGlPL0Aq1Mg&oe=675C91B1"
                              alt="logo"
                              className={cx("img_avatar")}
                            />
                          </div>
                          <div className={cx("info_notifi")}>
                            <div className={cx("name_notifi")}>
                              Nguyễn Văn A
                            </div>
                            <div className={cx("notifi")}>
                              Nhận được 855,000 tiền thưởng từ đơn hàng
                              6724834996735
                            </div>
                            <div className={cx("time_notifi")}>
                              <span className={cx("time_notifi")}>
                                {" "}
                                <span className={cx("icon_time_notifi")}>
                                  <FontAwesomeIcon
                                    icon={faWatchmanMonitoring}
                                  />
                                </span>
                                09:35
                              </span>
                              <span className={cx("day_notifi")}>
                                04/11/2024
                              </span>
                            </div>
                          </div>
                        </div>
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
                <span className={cx("noti_count")}>3</span>
              </span>
            </Tippy>

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
