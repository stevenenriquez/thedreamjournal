import { Paper, Typography } from '@mui/material';

function DreamPage(props) {

    return (
        <>
            <Paper elevation={10} style={{color: 'lightgrey', margin: '5px', padding: '10px', width: '80%', maxWidth: '700px', height: '500px', background: 'linear-gradient(to right bottom, #070707, #070707)'}}>
                <Typography variant='h3' style={{marginTop: '10px'}}>
                    {props?.payload?.title}
                </Typography>
                <Typography variant='h6' style={{marginBottom: '20%'}}>
                    {props?.payload?.address}
                </Typography>
                <Typography>
                    {props?.payload?.body}
                </Typography>
            </Paper>
        </>
    )
}

export default DreamPage;