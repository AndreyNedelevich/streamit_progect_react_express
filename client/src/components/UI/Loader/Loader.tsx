import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import  './Loader.css'

 const Loader=() =>{

    return (
        <div className='loader'>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress  color="error" />
            </Stack>
        </div>

    );
}

export { Loader}