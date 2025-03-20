import React, { useState } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import styles from "./Sidebar.module.scss";
import dashboardIcon from "~/assets/images/dashboard.png";
import wallettIcon from "~/assets/images/wallet.png";
import userIcon from "~/assets/images/user.png";
// import treeIcon from "~/assets/images/tuyến_dưới.png";
import config from "~/config";
import marketingIcon from "~/assets/images/marketing.png";
import { Wrapper as PopperWrapper } from "~/Components/Popper";

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);

  const rendercampaign = (attrs) => (
    <div className={cx("link_tippy","marketing")} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.campaign}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>🤝</span> Chiến dịch
            </span>
          </div>
        </NavLink>

        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.create_image}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>✏️</span>
              Tạo ảnh online{" "}
            </span>
          </div>
        </NavLink>

        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.document}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>📄</span>
              Tài liệu bán hàng{" "}
            </span>
          </div>
        </NavLink>

        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.video_train}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>🎓</span>
              Video đào tạo{" "}
            </span>
          </div>
        </NavLink>
      </PopperWrapper>
    </div>
  );

  const renderBusiness = (attrs) => (
    <div className={cx("link_tippy")} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.products}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>🛍️</span>
              Sản phẩm{" "}
            </span>
          </div>
        </NavLink>

        <NavLink
          className={(nav) => cx("item-link", { active: nav.isActive })}
          to={config.routes.orders}
        >
          <div className={cx("p")}>
            <span className={cx("title")}>
              <span className={cx("icon_sideBar")}>📦</span>
              Đơn hàng
            </span>
          </div>
        </NavLink>
      </PopperWrapper>
    </div>
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <div className="wrapper_tab">
          <div className={cx("tab")}>
            <div
              className={cx("tab-items", { tabActive: activeTab === 1 })}
              onClick={() => setActiveTab(1)}
            >
              <NavLink to={config.routes.dashboard} alt="Dashboard">
                <span className={cx("i_icon")}>
                  <img src={dashboardIcon} alt="dashboard-link" />
                </span>
              </NavLink>
            </div>

            <Tippy
              render={rendercampaign}
              placement="top"
              trigger="click"
              appendTo={"parent"}
              interactive={true}
              popperOptions={{
                modifiers: [
                  {
                    name: "offset",
                    options: { offset: [0, 150] }, // Dịch len 10px
                  },
                ],
              }}
            >
              <div
                className={cx("tab-items", { tabActive: activeTab === 2 })}
                onClick={() => setActiveTab(2)}
              >
                <span className={cx("i_icon")}>
                  <img src={marketingIcon} alt="marketing-link" />
                </span>
              </div>
            </Tippy>

            <Tippy
              render={renderBusiness}
              placement="top"
              trigger="click"
              interactive={true}
              popperOptions={{
                modifiers: [
                  {
                    name: "offset",
                    options: { offset: [0, 50] }, // Dịch len 10px
                  },
                ],
              }}
            >
              <div
                className={cx("tab-items", { tabActive: activeTab === 3 })}
                onClick={() => setActiveTab(3)}
              >
                <NavLink to={config.routes.business} alt="Kinh Doanh">
                  <span className={cx("i_icon")}>
                    <img src={wallettIcon} alt="wallet-link"></img>
                  </span>
                </NavLink>
              </div>
            </Tippy>

            <div
              className={cx("tab-items", { tabActive: activeTab === 4 })}
              onClick={() => setActiveTab(4)}
            >
              <NavLink to={config.routes.leads} alt="Bảng lưu vết">
                <span className={cx("i_icon")}>
                  <img src={userIcon} alt="user-link"></img>
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
