import { forwardRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Avatars.module.scss";
import noImage from "~/assets/images/noImage.png";

const Avatars = forwardRef(
  (
    { src, alt, className, fallback: customFallback = noImage, ...props },
    ref
  ) => {
    const [fallback, setFallback] = useState();

    const handleError = () => {
      setFallback(customFallback);
    };
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <img
        ref={ref}
        {...props}
        className={classNames(styles.wrapper, className)}
        alt={alt}
        src={fallback || src}
        onError={handleError}
      />
    );
  }
);

export default Avatars;
