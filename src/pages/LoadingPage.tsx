import { CircularProgress, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateStudyId } from "../utils/general.utils";

export const LoadingPage: FC = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const navigate = useNavigate();

  console.log(`Study ID: ${studyId}`);

  useEffect(() => {
    const waittime = setTimeout(() => {
      validateStudyId(studyId).then((result) => {
        if (result) {
          sessionStorage.setItem("studyId", studyId!);
          navigate("/assessments");
        } else {
          navigate("/auth");
        }
      });
    }, 1000);

    return () => clearTimeout(waittime);
  }, []);

  return (
    <>
      <CircularProgress size={80} />
      <Typography variant="h5" align="center" marginTop={2}>
        Loading
      </Typography>
    </>
  );
};
