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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckRounded, Close, CopyAll } from "@mui/icons-material";
import classNames from "classnames/bind";

import * as getTitleItemDocumentCampaign from "~/service/getTitleItemDocumentCampaign";
import * as getIndexDoc from "~/service/getIndexDocument";
import * as getContentDoc from "~/service/getContentDocument";
import * as getDetailContent from "~/service/getDetailContentDocument";
import styles from "./itemDocumentCampaign.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function ItemDocumentCampaign(idCampaign) {
  const [titleDocs, setTitleDocs] = useState([]);
  const [_idTitleDocs, set_IdTitleDocs] = useState("");
  const [indexDocs, setIndexDocs] = useState([]);
  const [_IdIndexDocs, set_IdIndexDocs] = useState("");
  const [contentDocs, setContentDocs] = useState([]);
  const [_IdContentDocs, set_IdContentDocs] = useState("");
  const [detailContent, setDetailContent] = useState([]);
  const [indexDetailContent, setIndexDetailContent] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
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

  useEffect(() => {
    if (titleDocs.length === 0) return;
    const fetchAPI = async () => {
      const resultIndexDoc = await getIndexDoc.getIndexDoc(_idTitleDocs);
      setIndexDocs(resultIndexDoc.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_idTitleDocs]);
  useEffect(() => {
    if (titleDocs.length === 0) return;
    const fetchAPI = async () => {
      const resultContentDoc = await getContentDoc.getContentDoc(_IdIndexDocs);
      setContentDocs(resultContentDoc.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_IdIndexDocs]);

  useEffect(() => {
    if (titleDocs.length === 0) return;
    if (contentDocs.length === 0) return;
    const fetchAPI = async () => {
      const resultDetaiContentDoc = await getDetailContent.getDetailcontent(
        _IdContentDocs,
        _IdIndexDocs
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

  return (
    <>
      {titleDocs.length > 0 && (
        <Box>
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
                      onClick={() => setDetailContent("")}
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

          <Card>
            <CardContent>
              {/* btn title */}
              {titleDocs.map((titleDoc) => (
                <Button
                  key={titleDoc._id}
                  variant="contained"
                  onClick={() => set_IdTitleDocs(titleDoc._id)}
                  sx={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#185a9d",
                    color: "#fff",
                    marginBottom: "20px",
                    "&:hover": {
                      backgroundColor: "#43cea2",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {titleDoc.name}
                </Button>
              ))}

              {/* content 1 */}
              {indexDocs.map((indexDoc) => (
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
                  {contentDocs.map((contentDoc) => (
                    <AccordionDetails
                      key={contentDoc._id}
                      sx={{
                        flexDirection: "column",
                        lineHeight: "2",
                      }}
                    >
                      <Typography
                        variant="body1"
                        onClick={() => set_IdContentDocs(contentDoc._id)}
                      >
                        {contentDoc.name}
                      </Typography>
                      <br />
                    </AccordionDetails>
                  ))}
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default ItemDocumentCampaign;
