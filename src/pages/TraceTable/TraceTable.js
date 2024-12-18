import React, { useState } from "react";
import classNames from "classnames/bind";
import Select from "react-select";

import styles from "./TraceTable.module.scss";
import Button from "~/Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function TraceTable() {
  const [display, setDisplay] = useState(false);
  const [quatity, setQuatity] = useState(false);
  return (
    <div className={cx("Wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content")}>
          <div className={cx("header")}>
            <div className={cx("title_header")}>
              <h4 className={cx("title")}>Bảng lưu vết</h4>
              <div className={cx("btn_")}>
                <Button
                  primary
                  small
                  leftIcon={
                    <FontAwesomeIcon icon={faGear} className={cx("icon_gear")} />
                  }
                ></Button>
                <Button
                  primary
                  small
                  leftIcon={
                    <FontAwesomeIcon icon={faPlus} className={cx("icon_plus")} />
                  }
                ></Button>
              </div>
            </div>
            <div className={cx("filter")}>
             <h5>
                <ul className={cx("card_title")}>
                  <li>Tất cả</li>
                  <li>Khách hôm nay</li>
                  <li>Khách đã mua</li>
                  <li>Khách của tôi</li>
                </ul>
             </h5>
            </div>
            <div className={cx("header_filter")}>
              <div className={cx("item_left")}>
                <Button small primary>
                  Cột hiển thị
                </Button>
                <Button small primary>
                  Copy
                </Button>
                <Button small primary>
                  Down CSV
                </Button>
                <Button small primary>
                  Số lượng hiển thị
                </Button>
              </div>
              <div className={cx("item_right")}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraceTable;
