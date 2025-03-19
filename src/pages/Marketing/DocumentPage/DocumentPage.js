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
import { Close, Share } from "@mui/icons-material";

import * as getTitleDoc from "~/service/getTitleDocument";
import * as getIndexDoc from "~/service/getIndexDocument";
import * as getContentDoc from "~/service/getContentDocument";
import * as getDetailContent from "~/service/getDetailContentDocument";

function DocumentPage() {
  const [titleDocs, setTitleDocs] = useState([]);
  const [_idTitleDocs, set_IdTitleDocs] = useState("");
  const [indexDocs, setIndexDocs] = useState([]);
  const [_IdIndexDocs, set_IdIndexDocs] = useState("");
  const [contentDocs, setContentDocs] = useState([]);
  const [_IdContentDocs, set_IdContentDocs] = useState("");
  const [detailContent, setDetailContent] = useState([]);
  const [indexDetailContent, setIndexDetailContent] = useState([]);

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
        _IdContentDocs,
        _IdIndexDocs
      );
      setDetailContent(resultDetaiContentDoc.data.content);
      setIndexDetailContent(resultDetaiContentDoc.data);
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_IdContentDocs]);

  const MyButton = styled(Button)({
    padding: "6px",
    minWidth: "auto",
    width: "auto",
  });
  return (
    <Box>
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

      {/* content details */}
      {detailContent ? (
        <Card sx={{ mt: 2,mb: 2 }}>
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
                <MyButton variant="contained" color="primary">
                  <Share variant="contained" size="large" />
                </MyButton>
                <MyButton
                  variant="contained"
                  color="error"
                  sx={{ ml: 1, borderRadius: "50%" }}
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
                sx={{ fontFamily: 'roboto, sans-serif' }} 
                dangerouslySetInnerHTML={{ __html: detailContent }}
              />
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}

      <Card>
        <CardContent>
          {/* btn title */}
          {titleDocs.map((titleDoc) => (
            <Button
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
            <Accordion>
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
                  </Typography>{" "}
                  <br />
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default DocumentPage;
