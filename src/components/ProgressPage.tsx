import { FC } from "react";
import { Box, Stepper, Typography, Step, StepLabel} from "@mui/material";
import { TestPhase } from "../contexts/general.context";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


const MemoryTestsLabels = [
    {
        "name": "BoCA - Memory (Immediate Recall)",
        "desc": "BoCA description",
        "index": TestPhase.MEMORY_RECALL_IMMEDIATE
    },
    {
        "name": "TestMyBrain - Visual Paired Associates (\"learn\" part)",
        "desc": "VPA desc",
        "index": TestPhase.VISUAL_PAIRS_MEMORIZE
    },
    {
        "name": "TestMyBrain - Choice Reaction Time (from Visual Paired Associates)",
        "desc": "CRT desc",
        "index": TestPhase.CHOICE_REACTION_TIME
    },
    {
        "name": "TestMyBrain - Visual Paired Associates (\"test\" part)",
        "desc": "DSM desc",
        "index": TestPhase.VISUAL_PAIRS_RECALL
    },
    {
        "name": "TestMyBrain - Digit Symbol Matching",
        "desc": "Spatial Memory desc",
        "index": TestPhase.DIGIT_SYMBOL_MATCHING
    },
    {
        "name": "NeurCare - Spatial Memory",
        "desc": "BoCA delayed recall desc",
        "index": TestPhase.SPACIAL_MEMORY
    },
    {
        "name": "BoCA - Memory (Delayed recall)",
        "desc": "BoCA delayed recall desc",
        "index": TestPhase.MEMORY_RECALL_DELAYED
    }
];


interface ProgressPageProps  {  
    id:number
}

export const ProgressPage: FC<ProgressPageProps> = (props) => {

    //check for Dark/Light Mode
    const  dark_light_color = () => {
        if(window.matchMedia('(prefers-color-scheme: dark').matches){
            return "#ffffff"
        }else{
            return "#000000"
        }
    }

    return (
        <Box 
            sx={{width: '100%', display:'flex', justifyContent:'center', padding: 1}}
        >
            <Stepper activeStep={props.id} orientation="vertical">
               {
                MemoryTestsLabels.map((step, index) => (
                    <Step 
                        key={index}
                    >
                        <StepLabel 
                            icon={props.id > index ? <CheckCircleIcon fontSize="inherit"/> : <RadioButtonUncheckedIcon fontSize="inherit" sx={{color:props.id >= index ? '#ffffff' : '#808080'}}/>} 
                            sx={{color:props.id <= index ? '#ffffff' : '#009933'}}
                        >
                            <Typography 
                                variant="subtitle1" 
                                color={props.id <= index ? props.id === index ? dark_light_color : "#808080" : "#009933"} 
                                overflow={"hidden"}
                            >
                                {step.name}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))
               }
            </Stepper>
        </Box>
    )
}