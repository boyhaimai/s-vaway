import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  styled,
  Drawer,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle, CheckRounded, Close, CopyAll } from "@mui/icons-material";
import classNames from "classnames/bind";

import * as getTitleItemDocumentCampaign from "~/service/getTitleItemDocumentCampaign";
import * as getIndexDoc from "~/service/getIndexDocument";
import * as getContentDoc from "~/service/getContentDocument";
import * as getDetailContent from "~/service/getDetailContentDocument";
import styles from "~/pages/Marketing/DocumentPage/DocumentPage.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function ItemDocumentCampaign(idCampaign) {
  const [titleDocs, setTitleDocs] = useState([]);
  const [_idTitleDocs, set_IdTitleDocs] = useState("");
  const [indexDocs, setIndexDocs] = useState([]);
  const [_idIndexDocs, set_IdIndexDocs] = useState("");
  const [contentDocs, setContentDocs] = useState([]);
  const [_IdContentDocs, set_IdContentDocs] = useState("");
  const [detailContent, setDetailContent] = useState([]);
  const [indexDetailContent, setIndexDetailContent] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    const fetchAPI = async () => {
      const resultTitleDoc =
        await getTitleItemDocumentCampaign.getTitleItemDocumentCampaign(
          idCampaign.idCampaign
        );
      setTitleDocs(resultTitleDoc.data);
    };
    fetchAPI();
  }, [idCampaign]);

  const handleSetTitleDocId = (id) => {
    set_IdTitleDocs(id);
  };

  useEffect(() => {
    if (_idTitleDocs) {
      const fetchAPI = async () => {
        const resultIndexDoc = await getIndexDoc.getIndexDoc(_idTitleDocs);
        setIndexDocs(resultIndexDoc.data);
      };
      fetchAPI();
    }
  }, [_idTitleDocs]);

  const handleSetIndexDocId = (id) => {
    set_IdIndexDocs(id);
  };

  useEffect(() => {
    if (_idIndexDocs) {
      const fetchAPI = async () => {
        const resultContentDoc = await getContentDoc.getContentDoc(
          _idIndexDocs
        );
        setContentDocs(resultContentDoc.data);
      };
      fetchAPI();
    }
  }, [_idIndexDocs]);

  useEffect(() => {
    if (titleDocs.length === 0) return;
    if (contentDocs.length === 0) return;
    const fetchAPI = async () => {
      const resultDetaiContentDoc = await getDetailContent.getDetailcontent(
        _IdContentDocs,
        _idIndexDocs
      );
      setDetailContent(resultDetaiContentDoc.data.content);
      setIndexDetailContent(resultDetaiContentDoc.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_IdContentDocs]);

  const handleCopyDocumentClick = () => {
    if (contentRef) {
      navigator.clipboard.writeText(contentRef.current.innerText);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  };

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* content details */}
      {typeof detailContent === "string" && detailContent.trim() !== "" && (
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: "var(--ui_color_least)",
                p: 2,
                mb: 1,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {indexDetailContent.name}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Box>
                  {copySuccess === true ? (
                    <MyButton
                      variant="contained"
                      color="success"
                      className={cx("btn_copy_doc")}
                    >
                      <CheckRounded size="large" />
                    </MyButton>
                  ) : (
                    <MyButton
                      variant="contained"
                      color="primary"
                      className={cx("btn_copy_doc")}
                      onClick={handleCopyDocumentClick}
                    >
                      <CopyAll size="large" />
                    </MyButton>
                  )}
                </Box>
                <MyButton
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "10px", borderRadius: "50%" }}
                  onClick={() => toggleDrawer(false)()}
                >
                  <Close variant="contained" size="large" />
                </MyButton>
              </Box>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography
                component={"div"}
                variant="body1"
                sx={{ fontFamily: "roboto, sans-serif" }}
                dangerouslySetInnerHTML={{ __html: detailContent }}
                ref={contentRef}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  return (
    <Box>
      {/* Thông báo Copy Thành Công */}
      {copySuccess && (
        <Box className={cx("box_copy")}>
          <CheckCircle sx={{ color: "var(--c_green)", fontSize: "30px" }} />
          <Typography component={"p"} fontSize="14px">
            Copy thành công
          </Typography>{" "}
          <br />
        </Box>
      )}

      <Card>
        <CardContent>
          {/* btn title */}
          {titleDocs.length > 0 ? (
            titleDocs.map((titleDoc, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  onClick={() => handleSetTitleDocId(titleDoc._id)}
                  className={cx("title_docx")}
                >
                  {titleDoc.name}
                </Button>

                {indexDocs
                  .filter((indexDoc) => indexDoc.parent_id === titleDoc._id)
                  .map((indexDoc) => (
                    <Accordion key={indexDoc._id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ background: "#f9f9f9" }}
                        onClick={() => handleSetIndexDocId(indexDoc._id)}
                      >
                        {indexDoc.name}
                      </AccordionSummary>

                      {contentDocs
                        .filter(
                          (contentDoc) => contentDoc.parent_id === indexDoc._id
                        )
                        .map((contentDoc, index) => (
                          <AccordionDetails
                            sx={{
                              flexDirection: "column",
                              lineHeight: "2",
                            }}
                            key={index}
                          >
                            <Typography
                              variant="body1"
                              onClick={() => {
                                set_IdContentDocs(contentDoc._id);
                                toggleDrawer(true)();
                              }}
                            >
                              {contentDoc.name}
                            </Typography>
                            <br />
                          </AccordionDetails>
                        ))}
                    </Accordion>
                  ))}
              </div>
            ))
          ) : <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
              }}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Box> ? (
            "Không có dữ liệu"
          ) : null}

          {/* content 1 */}
        </CardContent>
      </Card>
      {/* drawer detail content*/}
      <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}

export default ItemDocumentCampaign;
