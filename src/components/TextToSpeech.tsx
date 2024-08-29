import { FC, useEffect, useState } from "react";
import { Box, Button, Typography, TypographyProps } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const TextToSpeech: FC<TypographyProps> = (props) => {

    const [audioAvailable, setAudioAvailable] = useState(false);
   
    useEffect(()=> {
        // Checking if browser supports text-to-speech
        // Most browsers supoprt it https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
        if (('speechSynthesis' in window)) {
            setAudioAvailable(true);
        }
    }, [])

    const handleClick = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = String(props.children);
        window.speechSynthesis.speak(msg);
    }

    return (
        <Box
            display="flex"
            flexDirection={"row"}
        >
            <Typography {...props}/>
            {audioAvailable &&
                <Button
                    onClick={handleClick}
                    endIcon={<PlayArrowIcon style={{fontSize : Number(props.fontSize) || 16}}/>}
                />
            }
        </Box>
    )
}

