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
import styles from "./DocumentPage.module.scss";

import * as getTitleDoc from "~/service/getTitleDocument";
import * as getIndexDoc from "~/service/getIndexDocument";
import * as getContentDoc from "~/service/getContentDocument";
import * as getDetailContent from "~/service/getDetailContentDocument";
import { useRef } from "react";

const cx = classNames.bind(styles);

function DocumentPage() {
  const [titleDocs, setTitleDocs] = useState([]);
  const [_idTitleDocs, set_IdTitleDocs] = useState("");
  const [indexDocs, setIndexDocs] = useState([]);
  const [_IdIndexDocs, set_IdIndexDocs] = useState("");
  const [contentDocs, setContentDocs] = useState([]);
  const [_idContentDocs, set_IdContentDocs] = useState("");
  const [detailContent, setDetailContent] = useState([]);
  const [indexDetailContent, setIndexDetailContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    const fetchAPI = async () => {
      const resultTitleDoc = await getTitleDoc.getTitleDocument();
      setTitleDocs(resultTitleDoc.data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultIndexDoc = await getIndexDoc.getIndexDoc(_idTitleDocs);
      setIndexDocs(resultIndexDoc.data);
    };
    fetchAPI();
  }, [_idTitleDocs]);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultContentDoc = await getContentDoc.getContentDoc(_IdIndexDocs);
      setContentDocs(resultContentDoc.data);
    };
    fetchAPI();
  }, [_IdIndexDocs]);

  useEffect(() => {
    const fetchAPI = async () => {
      const resultDetaiContentDoc = await getDetailContent.getDetailcontent(
        _idContentDocs,
        _IdIndexDocs
      );
      setDetailContent(resultDetaiContentDoc.data.content);
      // setIndexDetailContent(resultDetaiContentDoc.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_idContentDocs]);

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
      {detailContent ? (
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
                <MyButton
                  variant="contained"
                  color="error"
                  sx={{ ml: 1, borderRadius: "50%" }}
                  onClick={() => {
                    setOpen(false);
                  }}
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
      ) : (
        ""
      )}
    </Box>
  );

  console.log(titleDocs._id, "titleDoc");
  console.log(indexDocs._id, "indexDocs");
  console.log(contentDocs._id, "contentDocs");

  console.log(titleDocs, "titleDoc");
  console.log(indexDocs, "indexDocs");
  console.log(contentDocs, "contentDocs");
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
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          padding: 1,
          width: "100%",
          mb: 2,
          paddingBottom: 0,
          mt: 1,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Tài liệu
          </Typography>
        </Box>
      </Card>

      <Card>
        <CardContent>
          {/* btn title */}
          {titleDocs.length > 0 ? (
            titleDocs.map((titleDoc, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  onClick={() => set_IdTitleDocs(titleDoc._id)}
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
                        onClick={() => set_IdIndexDocs(indexDoc._id)}
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
          ) : (
            <Box
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
            </Box>
          )}

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

export default DocumentPage;
