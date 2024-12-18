import React from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "~/Components/Popper";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };
  return (
    <div>
      <Tippy
        render={(attrs) => (
          <div className={cx("menu_items")} tabIndex="-1" {...attrs}>
            <PopperWrapper>{renderItems()}</PopperWrapper>
          </div>
        )}
        placement="bottom-end"
        appendTo={"parent"}
        trigger="click"
        interactive={true}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
