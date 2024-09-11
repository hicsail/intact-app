import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AuthPage: FC = () => {
  const { participantId } = useParams<{ participantId: string }>();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (validateParticipantId(participantId)) {
      sessionStorage.setItem("participantId", participantId!);
      console.log(`Participant ${participantId} is validated`);
      navigate(`/assessments/${participantId}`);
    }
  }, []);

  const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitHandler = () => {
    if (!validateParticipantId(input)) {
      return;
    }

    sessionStorage.setItem("participantId", input);
    navigate(`/assessments/${input}`);
  };

  const validateParticipantId = (id: string | undefined) => {
    if (!id || id === "undefined") {
      return false;
    }
    // TODO: validate participant ID

    return true;
  };

  return (
    <Card>
      <CardHeader title="Enter Participant ID" sx={{ paddingBottom: 0 }} />
      <CardContent sx={{ paddingTop: 0 }}>
        <TextField label="Participant ID" variant="outlined" fullWidth margin="normal" onChange={inputChangeHandler} />
        <Button variant="contained" color="primary" onClick={submitHandler}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};