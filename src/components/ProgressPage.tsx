import { FC, useEffect, useState } from "react";
import { Box, Button, styled, Stepper, Typography, Step, StepLabel, StepConnector, StepConnectorProps, createTheme, colors} from "@mui/material";
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
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface CustomConnectorProps extends StepConnectorProps {
    numsteps: number;
  }

const CustomConnector = styled(StepConnector)<CustomConnectorProps>(({ numsteps }) => ({
    '& .MuiStepConnector-line': {
      minHeight: `calc(100vh / ${numsteps} - 20px)`,  // 72px accounts approximately for the height of the step button and label
    },
  }));

export const ProgressPage: FC<ProgressPageProps> = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(()=> {
        setActiveStep(props.id)
    }, [])

    return (
        <Box alignContent={'center'} sx={{width: '100%', height: '100vh', overflow:'auto', padding: '5vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector numsteps={MemoryTestsLabels.length} sx={{paddingLeft:0.5}}/>}>
               {
                MemoryTestsLabels.map((step, index) => (
                    <Step key={index}>
                        <StepLabel icon={activeStep > index ? <CheckCircleIcon fontSize="large"/> : <RadioButtonUncheckedIcon fontSize="large" color={activeStep === index? "inherit" : "disabled"}/>} sx={{color:activeStep <= index ? '#ffffff' : '#009933'}}>
                            <Typography sx={{fontSize: 24}} color={activeStep <= index ? activeStep === index ? "#ffffff" : "#808080" : "#009933"}>
                                {step.name}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))
               }
            </Stepper>
            <Box sx={{width:'100%', paddingTop: '3vh'}}>
                <Button variant="contained" sx={{textAlign: 'center', minWidth: '50%', width:'100%'}} onClick={props.onClick}>
                    <Typography>
                        Continue
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}