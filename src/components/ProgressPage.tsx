import { useEffect, useState } from "react";
import { Box, Button, styled, Stepper, Typography, Step, StepLabel, StepConnector, StepConnectorProps} from "@mui/material";
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
interface CustomConnectorProps extends StepConnectorProps {
    numSteps: number;
  }



const CustomConnector = styled(StepConnector)<CustomConnectorProps>(({ numSteps }) => ({
    '& .MuiStepConnector-line': {
      minHeight: `calc(100vh / ${numSteps} - 20px)`,  // 72px accounts approximately for the height of the step button and label
    },
  }));

export const ProgressPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(()=> {
        const queryParam = new URLSearchParams(window.location.search);
        const param = queryParam.get('id');
        setActiveStep(Number(param));
    }, [])

    return (
        <Box alignContent={'center'} sx={{width: '100%', height: '100vh', overflow:'auto', padding: '5vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector numSteps={MemoryTestsLabels.length} sx={{paddingLeft:0.5}} />}>
               {
                MemoryTestsLabels.map((step, index) => (
                    <Step key={index} color="error">
                        <StepLabel icon={activeStep > index ? <CheckCircleIcon fontSize="large"/> : <RadioButtonUncheckedIcon fontSize="large"/>} sx={{color:activeStep <= index ? '#ffffff' : '#009933'}}>
                            <Typography sx={{fontSize: 24}} color={activeStep <= index ? '#ffffff' : '#009933'}>
                                {step.name}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))
               }
            </Stepper>
            <Box sx={{width:'100%', paddingTop: '3vh'}}>
                <Button variant="contained" sx={{textAlign: 'center', minWidth: '50%', width:'100%'}}>
                    <Typography>
                        Continue
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}