import React from "react";
import styles from './campaign.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Campaign() {
  return <div className={cx("campaign")}>Chiến dịch</div>;
}

export default Campaign;
