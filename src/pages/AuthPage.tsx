import { Button, Container, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

export const AuthPage: FC = () => {
  const authCxt = useContext(AuthContext);

  const { participantId } = useParams<{ participantId: string }>();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (validateParticipantId(participantId)) {
      authCxt!.setParticipantId(participantId);
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

    authCxt!.setParticipantId(input);
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Enter Participant ID
      </Typography>
      <TextField label="Participant ID" variant="outlined" fullWidth margin="normal" onChange={inputChangeHandler} />
      <Button variant="contained" color="primary" onClick={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};
