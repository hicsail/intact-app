import { FC, ReactElement, useEffect, useState, ReactNode } from "react";
import { Box, Button, Typography, TypographyProps } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SxProps, SystemProps } from '@mui/system';



export const TextToSpeech: FC<TypographyProps> = (props) => {

    const [audioAvailable, setAudioAvailable] = useState(false);
    const [iconSize, setIconSize] = useState(16);
    const [message, setMessage] = useState("");

    useEffect(()=> {
        // Checking if browser supports text-to-speech
        // Most browsers supoprt it https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
        if (('speechSynthesis' in window)) {
            setAudioAvailable(true);
        }

        if (props.fontSize) {
            setIconSize(Number(props.fontSize))
        }

        if(props.children){
            setMessage(String(props.children))
        }

    }, [])

    const handleClick = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = message;
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
                    endIcon={<PlayArrowIcon style={{fontSize : iconSize}}/>}
                />
            }
        </Box>
    )
}

