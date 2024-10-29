import { Alert, Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { validateStudyId } from "../utils/general.utils";

const AnimatedAlert = styled(Alert)(() => ({
  "&.fadeOut": {
    animation: "fadeOut 0.3s forwards",
  },
  "@keyframes fadeOut": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
}));

export const AuthPage: FC = () => {
  const [input, setInput] = useState<string>("");
  const [animationClass, setAnimationClass] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitHandler = async () => {
    if (!(await validateStudyId(input))) {
      setInput("");
      setShowAlert(true);
      setAnimationClass("");
      setTimeout(() => {
        setAnimationClass("fadeOut");
      }, 5000);

      return;
    }

    sessionStorage.setItem("studyId", input);
    navigate("/assessments/");
  };

  return (
    <>
      {showAlert && (
        <AnimatedAlert
          variant="filled"
          severity="error"
          className={animationClass}
          sx={{
            position: "fixed",
            width: "calc(100% - 4rem)",
            margin: "1rem",
            top: 0,
            left: 0,
          }}
        >
          <Typography>Invalid Study ID</Typography>
        </AnimatedAlert>
      )}
      <Card>
        <CardHeader title="Enter Study ID" sx={{ paddingBottom: 0 }} />
        <CardContent sx={{ paddingTop: 0 }}>
          <TextField
            label="Study ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            onChange={inputChangeHandler}
          />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
