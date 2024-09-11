import { FC } from "react";
import { Button } from "@mui/material";

interface GeneralDirectionProps {
  handleDirection: () => void;
}

export const GeneralDirection: FC<GeneralDirectionProps> = ({ handleDirection }) => {
  return (
    <>
      <h2>General Direction Placeholder</h2>
      <Button variant="contained" onClick={handleDirection}>
        Continue
      </Button>
    </>
  );
};
