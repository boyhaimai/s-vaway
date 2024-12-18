import React from "react";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import Button from "~/Components/Button/Button";

const cx = classNames.bind(styles);

function MenuItem({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <Button to={item.to} leftIcon={item.icon} className={cx("btn_menu")} key={index}> {item.title}</Button>
      ))}
    </div>
  );
}

export default MenuItem;
