import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AuthPage: FC = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (validateStudyId(studyId)) {
      sessionStorage.setItem("studyId", studyId!);
      console.log(`Study ID ${studyId} is validated`);
      navigate(`/assessments/${studyId}`);
    }
  }, []);

  const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitHandler = () => {
    if (!validateStudyId(input)) {
      return;
    }

    sessionStorage.setItem("studyId", input);
    navigate(`/assessments/${input}`);
  };

  const validateStudyId = (id: string | undefined) => {
    if (!id || id === "undefined") {
      return false;
    }
    // TODO: validate study ID

    return true;
  };

  return (
    <Card>
      <CardHeader title="Enter Study ID" sx={{ paddingBottom: 0 }} />
      <CardContent sx={{ paddingTop: 0 }}>
        <TextField label="Study ID" variant="outlined" fullWidth margin="normal" onChange={inputChangeHandler} />
        <Button variant="contained" color="primary" onClick={submitHandler}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};
