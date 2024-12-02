import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCode } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <aside className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <div className={cx("logo")}>logo</div>
        <div className={cx("tab")}>
          <div
            className={cx("tab-items", { active: activeTab === 0 })}
            onClick={() => setActiveTab(0)}
          >
            <FontAwesomeIcon icon={faCode} />
            <h4>React</h4>
          </div>
          <div
            className={cx("tab-items", { active: activeTab === 1 })}
            onClick={() => setActiveTab(1)}
          >
            <FontAwesomeIcon icon={faCode} />
            <h4>React1</h4>
          </div>
          <div
            className={cx("tab-items", { active: activeTab === 2 })}
            onClick={() => setActiveTab(2)}
          >
            <FontAwesomeIcon icon={faCode} />
            <h4>React2</h4>
          </div>
          <div
            className={cx("tab-items", { active: activeTab === 3 })}
            onClick={() => setActiveTab(3)}
          >
            <FontAwesomeIcon icon={faCode} />
            <h4>React3</h4>
          </div>
          <div
            className={cx("tab-items", { active: activeTab === 4 })}
            onClick={() => setActiveTab(4)}
          >
            <FontAwesomeIcon icon={faCode} />
            <h4>React4</h4>
          </div>
        </div>
        <div className={cx("light-mode")}>light</div>
      </div>

      {/* Tab Contents */}
      <div className={cx("menu_item")}>
        <div className={cx("title")}>
          <span>Dashboard</span>
        </div>
        <div className={cx("list-link")}>
          <div className={cx("tab-pane", { active: activeTab === 0 })}>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">
                  <span>Dashboard</span>
                  <span>logo</span>
                </span>
              </div>
            </a>
          </div>
          <div className={cx("tab-pane", { active: activeTab === 1 })}>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
          </div>
          <div className={cx("tab-pane", { active: activeTab === 2 })}>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
          </div>
          <div className={cx("tab-pane", { active: activeTab === 3 })}>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">logo</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
          </div>
          <div className={cx("tab-pane", { active: activeTab === 4 })}>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">stacked_bar_chart</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
            <a className={cx('item-link')} href="index">
              <div className={cx('p')}>
                <span class="icon bg_orange">
                  <span class="material-icons-outlined">stacked_bar_chart</span>
                </span>
                <span class="title">Dashboard</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
