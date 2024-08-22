import { FC, ReactElement, useEffect, useState } from "react";
import { Box, Button, TypographyProps } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface TextToSpeechProps extends TypographyProps {
    children: ReactElement;
}

export const TextToSpeech: FC<TextToSpeechProps> = ({ children }) => {

    const handleClick = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = children.props.children
        window.speechSynthesis.speak(msg)
    }
    
    // Checking if browser supports text-to-speech
    // Most browsers supoprt it https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
    if (!('speechSynthesis' in window)) {
        alert("Text-to-Speech not supoprted")
    }

    return (
        <Box
            display="flex"
            flexDirection={"row"}
        >
            {children}
            <Button
                onClick={handleClick}
                endIcon={<PlayArrowIcon/>}
            />
        </Box>
    )
}

