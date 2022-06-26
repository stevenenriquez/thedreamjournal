import { useState } from 'react';
import { IconButton, TextField, Paper, Button } from '@mui/material';
import DreamPage from '../DreamPage/DreamPage.js';
import { Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ipfs from '../../ipfs';

function DreamContainer() {

    const [subdomain, setSubdomain] = useState(1);
    const [ipfsPayload, setIpfsPayload] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');

    // Add back in once there are subdomains with IPFS hashes
    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await ipfs.cat(IPFS_HASH_HERE);
    //         const payload = new TextDecoder().decode(data);
    //         setIpfsPayload(JSON.parse(payload));
    //     }

    //     fetchData();
    // }, []);

    const retrieveIpfsPayload = async () => {
        console.log(ipfsHash)
        const data = await ipfs.cat(ipfsHash);
        const payload = new TextDecoder().decode(data);
        console.log(JSON.parse(payload));
        setIpfsPayload(JSON.parse(payload));
    }

    const handleNextPage = () => {
        setSubdomain(subdomain + 1);
    }

    const handlePrevPage = () => {
        if(subdomain > 1) {
            setSubdomain(subdomain - 1);
        }
    }

    return (
        <>
            <Typography variant='h3' style={{marginTop: '50px'}}>📖 ENS Dream Journal</Typography>
            <Typography variant='h5' style={{margin: '20px'}}> Discover dreams from around the world, and contribute your own</Typography>
            <DreamPage payload={ipfsPayload}/>
            <div>
            <IconButton style={{color: 'white', transform: 'scale(2)', margin: '10px'}} onClick={() => handlePrevPage()}>
                <NavigateBeforeIcon/>
            </IconButton>
            <IconButton style={{color: 'white', transform: 'scale(2)', margin: '10px'}} onClick={() => handleNextPage()}>
                <NavigateNextIcon/>
            </IconButton>
            </div>
            <Typography color='white' style={{marginBottom: '20px'}}>
                {subdomain}.dreamjournal.eth
            </Typography>
            <br/><br/>
            <Paper color='white'>
            <TextField  
                label='Search IPFS'
                variant='outlined' 
                value={ipfsHash}
                onChange={e => setIpfsHash(e.target.value)}
                sx={{
                    input: {
                        width: '500px'
                    }
                }}
            />
            <Button onClick={() => retrieveIpfsPayload()}>Read Page</Button>
            </Paper>
        </>
    )
}

export default DreamContainer