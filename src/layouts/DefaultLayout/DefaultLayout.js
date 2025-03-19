import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
