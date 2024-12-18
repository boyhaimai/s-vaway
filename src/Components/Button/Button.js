import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  children,
  onClick,
  className,
  small = false,
  large = false,
  primary,
  text_outline = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...passProps
}) {
  let Comp = "button";

  const props = {
    onClick,
    ...passProps,
  };

  const classes = cx("wrapper", {
    primary,
    text_outline,
    disabled,
    small,
    large,
    [className]: className,
  });

  if (to) {
    props.to = to;
    Comp = Link;
  } else {
    props.href = href;
    Comp = "a";
  }

  // remove events listeners when button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx('title_icon')}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
