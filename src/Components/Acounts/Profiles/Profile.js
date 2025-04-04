import React, { useRef } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Close, Download, Key, QrCode, Save, Share } from "@mui/icons-material";
import classNames from "classnames/bind";

import Avatars from "../../Avatars/Avatars";
import styles from "./profile.module.scss";
import * as getProfileService from "~/service/getProfileService";
import * as getProvinceService from "~/service/getProvinceService";
import * as getDistrictService from "~/service/getDistrictService";
import * as getSuportService from "~/service/getSuportService";
import Image from "~/Components/Images/Images";

const cx = classNames.bind(styles);

function Profile() {
  //profile
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();
  const [selectedProvinces, setSelectedProvinces] = useState();
  const [provinces, setProvinces] = useState();
  const [idProvince, setIdProvince] = useState(null);
  const [district, setDistrict] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [value, setValue] = useState("3");
  const [hideQr, setHideQr] = useState(false);
  const ImageRef = useRef(null);

  //suport
  const [suports, setSuports] = useState();
  const [emailSuports, setEmailSuports] = useState();
  const [phoneSuports, setPhoneSuports] = useState();
  const [zaloSuports, setZaloSuports] = useState();
  const [fbSuports, setFbSuports] = useState();
  const [instaSuports, setInstaSuports] = useState();
  const [youtubeSuports, setYoutubeSuports] = useState();
  const [tiktokSuports, setTiktokSuports] = useState();
  const [addressSuports, setAddressSuports] = useState();
  const [videoIntroduceSuports, setVideoIntroduceSuports] = useState();
  const [introduce, setIntroduce] = useState();
  const [chat, setChat] = useState();
  const linkProfile = `https://demo.vazosales.xyz/welcome/${profiles.id}`;

  //callAPI profile
  useEffect(() => {
    const fetchAPI = async () => {
      const resultProfiles = await getProfileService.getProfileService();
      setProfiles(resultProfiles.data);
    };
    fetchAPI();
  }, []);

  //callAPI province
  useEffect(() => {
    const fetchAPI = async () => {
      const resultProvince = await getProvinceService.getProvinceService();
      setProvinces(resultProvince.data);
    };
    fetchAPI();
  }, []);

  //callAPI district
  useEffect(() => {
    const fetchAPI = async () => {
      const resultDistrict = await getDistrictService.getDistrictService(
        idProvince
      );
      setDistrict(resultDistrict.data);
    };
    fetchAPI();
  }, [idProvince]);

  //callAPI suport
  useEffect(() => {
    const fetchAPI = async () => {
      const resultSuport = await getSuportService.getSuportService();
      setSuports(resultSuport.data);
    };
    fetchAPI();
  }, []);

  //provice
  useEffect(() => {
    if (profiles?.address_province?.name && provinces?.length > 0) {
      const initialProvince = provinces.find(
        (province) => province.name === profiles.address_province.name
      );
      if (initialProvince) {
        setIdProvince(initialProvince._id);
      }
    }
  }, [profiles, provinces]);

  const handleChangeProvice = (e, value) => {
    setSelectedProvinces(value);
    const selected = provinces?.find((item) => item.name === value);
    setIdProvince(selected ? selected._id : "");
    setSelectedDistrict(null);
  };

  //district
  useEffect(() => {
    if (profiles?.address_district?.name && district?.length > 0) {
      const initialDistrict = district.find(
        (item) => item.name === profiles.address_district.name
      );
      if (initialDistrict) {
        setIdProvince(initialDistrict._id);
      }
    }
  }, [profiles, district]);

  const handleChangeDistrict = (e, value) => {
    setSelectedDistrict(value);
    const selected = district?.find((item) => item.name === value);
    setIdProvince(selected ? selected._id : "");
  };

  //////////////////////////////////////////////////////////////// profile
  useEffect(() => {
    if (profiles.name) {
      setName(profiles.name);
    }
  }, [profiles.name]);

  useEffect(() => {
    if (profiles.email) {
      setEmail(profiles.email);
    }
  }, [profiles.email]);

  useEffect(() => {
    if (profiles.birthdate) {
      setBirthday(profiles.birthdate);
    }
  }, [profiles.birthdate]);

  const handleChangeBirthday = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
    const today = new Date();
    const currentYear = today.getFullYear();

    // Ngăn người dùng nhập ngày > 31 hoặc tháng > 12
    let day = value.slice(0, 2);
    let month = value.slice(2, 4);
    let year = value.slice(4, 8);

    if (parseInt(day) > 31) day = "31";
    if (parseInt(month) > 12) month = "12";
    if (parseInt(year) > currentYear) year = currentYear;

    if (value.length > 4) {
      value = `${day}/${month}/${year}`;
    } else if (value.length > 2) {
      value = `${day}/${month}`;
    }

    setBirthday(value);
  };

  //close modal
  const handleCloseModal = () => {
    setHideQr(false);
  };
  //handle dowload qr
  const handleDownloadQr = async () => {
    const urlImage =
      "https://quickchart.io/qr?text=https://demo.vazosales.xyz/welcome/432&margin=0&format=png&size=400";
    try {
      const res = await fetch(urlImage);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloadQr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err, "err");
    }
  };
  //handle share qr
  const handleShareQr = (link) => {
    if (!link && link.trim() === "") return alert("Link is empty");
    if (navigator.share) {
      navigator.share({
        title: "Vào đây để xem hồ sơ của bạn",
        url: link,
        text: "Vào đây để xem hồ sơ của bạn",
      });
    }
  };

  useEffect(() => {
    if (profiles.gender) {
      setGender(profiles.gender);
    }
  }, [profiles.gender]);

  ///////////////////////////////////////////////////////////////////////// suport
  useEffect(() => {
    if (suports?.email) {
      setEmailSuports(suports?.email);
    }
  }, [suports?.email]);

  useEffect(() => {
    if (suports?.phone) {
      setPhoneSuports(suports?.phone);
    }
  }, [suports?.phone]);

  useEffect(() => {
    if (suports?.zalo) {
      setZaloSuports(suports?.zalo);
    }
  }, [suports?.zalo]);

  useEffect(() => {
    if (suports?.fbSuports) {
      setFbSuports(suports?.fbSuports);
    }
  }, [suports?.fbSuports]);

  useEffect(() => {
    if (suports?.youtube) {
      setYoutubeSuports(suports?.youtube);
    }
  }, [suports?.youtube]);

  useEffect(() => {
    if (suports?.tiktok) {
      setTiktokSuports(suports?.tiktok);
    }
  }, [suports?.tiktok]);

  useEffect(() => {
    if (suports?.instagram) {
      setInstaSuports(suports?.instagram);
    }
  }, [suports?.instagram]);

  useEffect(() => {
    if (suports?.address) {
      setAddressSuports(suports?.address);
    }
  }, [suports?.address]);

  useEffect(() => {
    if (suports?.video) {
      setVideoIntroduceSuports(suports?.video);
    }
  }, [suports?.video]);

  useEffect(() => {
    if (suports?.about) {
      setIntroduce(suports?.about);
    }
  }, [suports?.about]);

  useEffect(() => {
    if (suports?.chat) {
      setChat(suports?.chat);
    }
  }, [suports?.chat]);

  /////////////////////////////////////////////////////////////////////////

  //tab
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });

  return (
    <Box>
      <Box
        sx={{
          m: 1,
          typography: "body1",
          background: "var(--c_white) !important",
          borderRadius: "8px",
          height: "auto",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTabs}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Thông tin cá nhân"
                value="1"
                className={cx("tab_index")}
              />
              <Tab label="Mật khẩu" value="2" className={cx("tab_index")} />
              <Tab
                label="Mã QR giới thiệu"
                value="3"
                className={cx("tab_index")}
              />
            </TabList>
          </Box>
          {/* tab_1 */}
          <TabPanel value="1">
            <Box>
              <Box textAlign={"center"}>
                <Avatars
                  src={`https://sv2.vacdn.link/crm/avatars/${profiles.id}.png`}
                  className={cx("avatar")}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography>Họ và tên:(*)</Typography>
                <TextField
                  disabled
                  fullWidth
                  placeholder={profiles.name ? "" : "Nhập họ và tên"}
                  sx={{ mt: 2 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography>Email:</Typography>
                <TextField
                  disabled
                  fullWidth
                  placeholder={profiles.name ? "" : "Nhập Email"}
                  sx={{ mt: 2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography>Số điện thoại:</Typography>
                <TextField
                  disabled
                  fullWidth
                  sx={{ mt: 2 }}
                  value={profiles.phone}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography>Điểm thưởng:</Typography>
                <TextField
                  disabled
                  fullWidth
                  sx={{ mt: 2 }}
                  value={profiles.point}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography>Sinh nhật:</Typography>
                <TextField
                  disabled
                  fullWidth
                  placeholder={profiles.birthdate ? " " : "Nhập sinh nhật"}
                  sx={{ mt: 2 }}
                  inputProps={{
                    maxLength: 10, // Giới hạn độ dài tối đa
                  }}
                  value={birthday}
                  type="tel"
                  onChange={handleChangeBirthday}
                />
              </Box>

              <Box sx={{ minWidth: 120, mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Giới tính :</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender === "male" ? "male" : "female"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled
                  >
                    <MenuItem value="male">Nam</MenuItem>
                    <MenuItem value="female">Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box fullWidth sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Tỉnh, thành phố:</Typography>
                <Autocomplete
                  disabled
                  disablePortal
                  options={provinces?.map((item) => item.name) || []}
                  fullWidth
                  value={
                    selectedProvinces ||
                    profiles?.address_province?.name ||
                    null
                  }
                  onChange={handleChangeProvice}
                  renderInput={(params) => <TextField disabled {...params} />}
                />
              </Box>

              <Box fullWidth sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Quận,huyện:</Typography>
                <Autocomplete
                disabled
                  disablePortal
                  options={district?.map((item) => item.name) || []}
                  fullWidth
                  value={
                    selectedDistrict === null
                      ? selectedDistrict
                      : profiles?.address_district?.name || null
                  }
                  onChange={handleChangeDistrict}
                  renderInput={(params) => <TextField disabled {...params} />}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>Tài khoản ngân hàng:</Typography>
                <TextField
                  disabled
                  fullWidth
                  placeholder="0"
                  type="number"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                component={"p"}
                sx={{ mb: 1, fontSize: "14px", color: "var(--c_blue)" }}
              >
                Nếu muốn thay đổi số điện thoại đăng nhập hãy <br />
                <Typography
                  component={"a"}
                  href="https://id.vaway.vn/"
                  target="_blank"
                  sx={{
                    mb: 1,
                    fontSize: "12px",
                    color: "var(--c_red)",
                    textDecoration: "underline",
                  }}
                >
                  {" "}
                  Click vào đây
                </Typography>
              </Typography>
            </Box>
          </TabPanel>

          {/* tab_2 */}
          <TabPanel value="2">
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <MyButton variant="contained" sx={{ marginBottom: 2 }}>
                <Key fontSize="large" sx={{ transform: "rotate(-90deg)" }} />
              </MyButton>
              <br />
              <Typography
                component={"a"}
                sx={{ color: "var(--c_red)", fontSize: "14px" }}
                href="https://id.vaway.vn/"
                alt="passwork"
                target="_blank"
              >
                Click để chuyển trang
              </Typography>
            </Box>
          </TabPanel>

          {/* tab_3 */}
          <TabPanel value="3">
            <Box sx={{ mb: 1 }}>
              <Typography>Email:(*)</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.email ? "" : "Email"}
                sx={{ mt: 2 }}
                value={emailSuports}
                onChange={(e) => setEmailSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Số điện thoại CSKH:(*)</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.phone ? "" : "Số điện thoại CSKH"}
                sx={{ mt: 2 }}
                value={phoneSuports}
                onChange={(e) => setPhoneSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Số Zalo:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.zalo ? "" : "Zalo"}
                sx={{ mt: 2 }}
                value={zaloSuports}
                onChange={(e) => setZaloSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Link Facebook:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.facebook ? "" : "Link Facebook"}
                sx={{ mt: 2 }}
                value={fbSuports}
                onChange={(e) => setFbSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Link Youtube:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.youtube ? "" : "Link Youtube"}
                sx={{ mt: 2 }}
                value={youtubeSuports}
                onChange={(e) => setYoutubeSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Link Tiktok:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.tiktok ? "" : "Link Tiktok"}
                sx={{ mt: 2 }}
                value={tiktokSuports}
                onChange={(e) => setTiktokSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Link instagram:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.instagram ? "" : "Link instagram"}
                sx={{ mt: 2 }}
                value={instaSuports}
                onChange={(e) => setInstaSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Địa chỉ:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.address ? "" : "Địa chỉ"}
                sx={{ mt: 2 }}
                value={addressSuports}
                onChange={(e) => setAddressSuports(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Video giới thiệu:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.video ? "" : "Video giới thiệu"}
                sx={{ mt: 2 }}
                value={videoIntroduceSuports}
                onChange={(e) => setVideoIntroduceSuports(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography>Giới thiệu(Tối đa 160 ký tự):</Typography>
              <TextField
                disabled
                multiline
                rows={4}
                fullWidth
                placeholder={suports?.about ? "" : "Giới thiệu"}
                sx={{ mt: 2 }}
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>Kêu gọi chat:</Typography>
              <TextField
                disabled
                fullWidth
                placeholder={suports?.chat ? "Không có chat" : "Kêu gọi chat"}
                sx={{ mt: 2 }}
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                multiline
                rows={4}
              />
            </Box>
            <Box sx={{ textAlign: "right", width: "100%", mt: 2 }}>
              <MyButton
                variant="contained"
                sx={{ mr: 1 }}
                onClick={() => setHideQr(true)}
              >
                <QrCode fontSize="large" />
              </MyButton>
              {/* modal QR */}
              {hideQr === true && (
                <Box className={cx("modal")}>
                  <Box
                    sx={{
                      background: "var(--c_white)",
                      borderRadius: 2,
                      pb: 1,
                    }}
                  >
                    {/* title detail Image */}
                    <Box className={cx("wrapper_modal")}>
                      <Typography variant="h5" fontWeight="bold">
                        Mã QR 
                      </Typography>
                      <MyButton
                        variant="contained"
                        color="primary"
                        onClick={handleCloseModal}
                      >
                        <Close size="large" />
                      </MyButton>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          textAlign: "center",
                          width: "100%",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <Image
                          src="https://quickchart.io/qr?text=https://demo.vazosales.xyz/welcome/432&margin=0&format=png&size=400"
                          alt="qrcode"
                          className={cx("img_qrcode")}
                          ref={ImageRef}
                        />
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <MyButton onClick={handleDownloadQr}>
                            {" "}
                            <Download fontSize="large" sx={{ mt: 1 }} />
                          </MyButton>
                          <MyButton>
                            {" "}
                            <Share
                              fontSize="large"
                              sx={{ mt: 1 }}
                              onClick={() => handleShareQr(linkProfile)}
                            />
                          </MyButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            <Box className={cx("wrap_iframe")}>
              <iframe
                src={linkProfile}
                title="iframe"
                className={cx("iframe")}
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-top-navigation allow-forms allow-popups allow-modals"
              ></iframe>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Profile;
