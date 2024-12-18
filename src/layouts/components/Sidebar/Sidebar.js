import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import styles from "./Sidebar.module.scss";
import dashboardIcon from "~/assets/images/dashboard.png";
import wallettIcon from "~/assets/images/wallet.png";
import userIcon from "~/assets/images/user.png";
import treeIcon from "~/assets/images/tuyến_dưới.png";
import { themeContext } from "~/Components/ThemeProvider/ThemeProvider";
import config from "~/config";
import marketingIcon from "~/assets/images/marketing.png";
import { Wrapper as PopperWrapper } from "~/Components/Popper";
// import settingIcon from "~/assets/images/setting.png";
// import dashboard_wIcon from "~/assets/images/dashboard_w.png";
// import wallett_wIcon from "~/assets/images/wallet_w.png";
// import user_wIcon from "~/assets/images/user_w.png";
// import setting_wIcon from "~/assets/images/setting_w.png";

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);
  const contextTheme = useContext(themeContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleTheme = (e) => {
    if (e.target.checked) {
      contextTheme.setDarkMode();
    } else {
      contextTheme.setLightMode();
    }
  };
  const handleHideMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderDashboard = (attrs) =>
    showMenu === false ? (
      <div className={cx("link_tippy")} tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.dashboard}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Tổng quan</span>
            </div>
          </NavLink>
        </PopperWrapper>
      </div>
    ) : (
      ""
    );

  const rendercampaign = (attrs) =>
    showMenu === false ? (
      <div className={cx("link_tippy")} tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.campaign}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Chiến dịch </span>
            </div>
          </NavLink>

          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.promotion}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Khuyến Mãi </span>
            </div>
          </NavLink>

          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.create_image}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Tạo ảnh online </span>
            </div>
          </NavLink>

          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.sent}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Gửi Zalo hoặc Email</span>
            </div>
          </NavLink>

          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.document}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Tài liệu bán hàng </span>
            </div>
          </NavLink>

          <NavLink
            className={(nav) => cx("item-link", { active: nav.isActive })}
            to={config.routes.video_train}
          >
            <div className={cx("p")}>
              <span classNames={cx("title")}>Video đào tạo </span>
            </div>
          </NavLink>
        </PopperWrapper>
      </div>
    ) : (
      ""
    );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <div className={cx("tab")}>
          <Tippy
            render={renderDashboard}
            placement="right"
            appendTo={"parent"}
            trigger="click"
            interactive={true}
          >
            <div
              className={cx("tab-items", { tabActive: activeTab === 0 })}
              onClick={() => setActiveTab(0)}
            >
              <span className={cx("i_icon")}>
                <img src={dashboardIcon} alt="dashboard-link" />
              </span>
              <h4>Tổng Quan</h4>
            </div>
          </Tippy>

          <Tippy
            render={rendercampaign}
            placement="right"
            appendTo={"parent"}
            trigger="click"
            interactive={true}
          >
            <div
              className={cx("tab-items", { tabActive: activeTab === 1 })}
              onClick={() => setActiveTab(1)}
            >
              <span className={cx("i_icon")}>
                <img src={marketingIcon} alt="marketing-link" />
              </span>
              <h4>Marketing</h4>
            </div>
          </Tippy>
          <div
            className={cx("tab-items", { tabActive: activeTab === 2 })}
            onClick={() => setActiveTab(2)}
          >
            <span className={cx("i_icon")}>
              <img src={wallettIcon} alt="wallet-link"></img>
            </span>
            <h4>Kinh Doanh</h4>
          </div>
          <div
            className={cx("tab-items", { tabActive: activeTab === 3 })}
            onClick={() => setActiveTab(3)}
          >
            <NavLink to={config.routes.tracetable} alt="Bảng lưu vết">
              <span className={cx("i_icon")}>
                <img src={userIcon} alt="user-link"></img>
              </span>
              <h4>Bảng Lưu Viết</h4>
            </NavLink>
          </div>
          <div
            className={cx("tab-items", { tabActive: activeTab === 4 })}
            onClick={() => setActiveTab(4)}
          >
            <NavLink to={config.routes.downline} alt="Tuyến dưới">
              <span className={cx("i_icon")}>
                <img src={treeIcon} alt="tree-link"></img>
              </span>
              <h4>Tuyến Dưới</h4>
            </NavLink>
          </div>
        </div>
        <div className={cx("cover")}>
          <div className={cx("container")}>
            <input type="checkbox" id={styles.check} onChange={toggleTheme} />
            <label htmlFor={styles.check} className={cx("dark-mode")}></label>
          </div>
        </div>
        <div className={cx("icon-hide")} onClick={handleHideMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>

      {/* Tab Contents */}
      <aside className={cx("menu_item", { showMenu: showMenu })}>
        <nav className={cx("list-link")}>
          <div className={cx("tab-pane", { tabActive: activeTab === 0 })}>
            <div className={cx("title-tab")}>
              <span>Dashboard</span>
            </div>
            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.dashboard}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Tổng quan</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>
          </div>

          <div className={cx("tab-pane", { tabActive: activeTab === 1 })}>
            <div className={cx("title-tab")}>
              <span>Marketing</span>
            </div>
            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.campaign}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Chiến dịch</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>

            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.promotion}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Khuyến mãi</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>

            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.create_image}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Tạo ảnh online</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>

            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.sent}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Gửi Zalo hoặc Email</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>

            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.document}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Tài liệu bán hàng </span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>

            <NavLink
              className={(nav) => cx("item-link", { active: nav.isActive })}
              href="index"
              to={config.routes.video_train}
            >
              <div className={cx("p")}>
                <span>
                  <span classNames={cx("title")}>Video đào tạo</span>
                  <span className={cx("icon-arrow")}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </span>
              </div>
            </NavLink>
          </div>

        </nav>
      </aside>
      {showMenu === true && <div className={cx("overlay")}></div>}
    </div>
  );
}

export default Sidebar;
