import * as React from "react";
import { Box, Container, Stack, styled } from "@mui/system";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import Tab, { tabClasses } from "@mui/base/Tab";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchData } from "../features/data/dataSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    border-radius: 12px;
    opacity: 0.6;
    `
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
    min-width: 300px;
    background-color: ${blue[500]};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
);

const Control = () => {
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.data.points);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [openAllPointDialog, setOpenAllPointDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenAllPointDialog(true);
  };

  const handleClose = () => {
    setOpenAllPointDialog(false);
  };

  return (
    <Box mt={3}>
      <Container>
        <Stack direction="column" spacing={5}>
          <Tabs defaultValue={0}>
            <StyledTabsList>
              <StyledTab value={0}>Pick-up Map</StyledTab>
              <StyledTab value={1}>Drop-off Map</StyledTab>
            </StyledTabsList>
          </Tabs>
          <Button variant="outlined" onClick={handleClickOpen}>
            Show Points Information
          </Button>
          <Dialog
            open={openAllPointDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Information About Points"}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">
                {data && data.features.map((point, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{`Point ${index + 1}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        
          
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Container>
    </Box>
  );
};

export default Control;
