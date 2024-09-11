import { FC, useEffect, useState } from "react";
import { Box, styled, Stepper, Typography, Step, StepLabel, StepConnector, StepConnectorProps} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const MemoryTestsLabels = [
    {
        "name": "BoCA - Memory (Immediate Recall)",
        "desc": "BoCA description"
    },
    {
        "name": "Visual Paired Associates",
        "desc": "VPA desc"
    },
    {
        "name": "Choice Reaction Time",
        "desc": "CRT desc"
    },
    {
        "name": "Digit Symbol Matching",
        "desc": "DSM desc"
    },
    {
        "name": "NeurCare - Spatial Memory",
        "desc": "Spatial Memory desc"
    },
    {
        "name": "BoCA - Memory Recall (Delayed Recall)",
        "desc": "BoCA delayed recall desc"
    }
];


interface ProgressPageProps  {  
    id:number
}

interface CustomConnectorProps extends StepConnectorProps {
    numsteps: number;
  }

const CustomConnector = styled(StepConnector)<CustomConnectorProps>(({ numsteps }) => ({
    '& .MuiStepConnector-line': {
      minHeight: `calc(200px / ${numsteps})`,  // 72px accounts approximately for the height of the step button and label
    },
  }));

export const ProgressPage: FC<ProgressPageProps> = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(()=> {
        setActiveStep(props.id)
    }, [])

    //check for Dark/Light Mode
    const  dark_light_color = () => {
        if(window.matchMedia('(prefers-color-scheme: dark').matches){
            return "#ffffff"
        }else{
            return "#000000"
        }
    }

    return (
        <Box alignContent={'center'} sx={{width: '100%', height: '90%', overflow:'auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector numsteps={MemoryTestsLabels.length}/>}>
               {
                MemoryTestsLabels.map((step, index) => (
                    <Step key={index}>
                        <StepLabel icon={activeStep > index ? <CheckCircleIcon fontSize="inherit"/> : <RadioButtonUncheckedIcon fontSize="inherit" color={activeStep === index ? "action" : "disabled"}/>} sx={{color:activeStep <= index ? '#ffffff' : '#009933'}}>
                            <Typography sx={{fontSize: 18}} color={activeStep <= index ? activeStep === index ? dark_light_color : "#808080" : "#009933"} overflow={"hidden"}>
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