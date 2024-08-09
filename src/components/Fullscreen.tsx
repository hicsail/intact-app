import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Box } from '@mui/material';

interface FullscreenProps {
    children: React.ReactNode;
}
export const Fullscreen:  FC<FullscreenProps> = ({ children }) => {

    // As the user lands on the page, determine the context
    // If context is what we need, return the fullscreen version of the page
    // Skipping context for now
    // useEffect(() => {

    // }, [])
    const handleClick = () => {
        console.log('clicked')
        var elem = document.documentElement;
        elem.requestFullscreen();
    }


    return (
        <Box>
            <Button
                style={{backgroundColor: 'white', width: '90%'}}
                onClick={handleClick}
            >
                button
            </Button>
            {children}
            <Outlet/>
        </Box>
    )
}