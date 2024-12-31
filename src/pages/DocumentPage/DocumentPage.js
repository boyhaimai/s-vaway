import React from "react";
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
import { Save } from "@mui/icons-material";

function DocumentPage() {
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
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Tài liệu
          </Typography>
          <MyButton variant="contained" color="primary">
            <Save variant="contained" size="large" />
          </MyButton>
        </Box>
      </Card>

      <Card>
        <CardContent>
          {/* btn title */}
          <Button
            variant="contained"
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
            Nội dung đăng Facebook
          </Button>
          {/* content 1 */}

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#f9f9f9" }}
            >
              Bài đang sản phẩm Sữa hạt (5)
            </AccordionSummary>
            <AccordionDetails
              sx={{
                flexDirection: "column",
                lineHeight: "2",
              }}
            >
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>{" "}
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>{" "}
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* content 2 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#f9f9f9" }}
            >
              Bài đang sản phẩm " Mỹ phẩm" (5)
            </AccordionSummary>
            <AccordionDetails
              sx={{
                flexDirection: "column",
                lineHeight: "2",
              }}
            >
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>{" "}
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>{" "}
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
              <br />
              <Typography component="a" href=" " alt=" ">
                Nội dung 1
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DocumentPage;
