import { Alert, Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";

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
  const { studyId } = useParams<{ studyId: string }>();
  const [input, setInput] = useState<string>("");
  const [animationClass, setAnimationClass] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateStudyId(studyId).then((result) => {
      if (result) {
        sessionStorage.setItem("studyId", studyId!);
        console.log(`Study ID ${studyId} is validated`);
        navigate(`/assessments/${studyId}`);
      }
    });
  }, []);

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
    navigate(`/assessments/${input}`);
  };

  const validateStudyId = async (id: string | undefined) => {
    if (!id || id === "undefined") {
      return false;
    }

    const response = await fetch(`${import.meta.env.VITE_VALIDATE_ENDPOINT}/${id}`, {
      method: "GET",
    });

    console.log(response);

    if (response.status !== 200) {
      return false;
    }

    return true;
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
          <TextField label="Study ID" variant="outlined" fullWidth margin="normal" onChange={inputChangeHandler} />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
