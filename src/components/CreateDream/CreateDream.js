import { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ipfs from '../../ipfs';

function CreateDream(props) {

    let navigate = useNavigate();

    let [dreamTitle, setDreamTitle] = useState('');
    let [dream, setDream] = useState('');
    let [ipfsHash, setIpfsHash] = useState('');

    // Add back in once an ETH contract gets deployed to create subdomains/set text records
    // const ens = new ENS();
    // ens.setProvider(props.provider);
    // const makeENSCall = async () => {
    //     const profile = await ens.setSubnodeRecord('1');
    //     return profile;
    // }

    const handleCreation = async () => {
        let payload = {
            'title': dreamTitle,
            'address': props.address,
            'body': dream
        };
        console.log(payload);

        await ipfs.add(Buffer.from(JSON.stringify(payload)), (err, ipfsHash) => {
            console.log(err, ipfsHash);
            setIpfsHash(ipfsHash[0].hash);
        });
    }

    return (
        <>
            <Typography variant='h3'>Mint a Page of the Dream Journal</Typography>
            <Typography variant='h6' style={{margin: '20px'}}> You will receive an ENS subdomain of dreamjournal.eth</Typography>
            <Paper style={{padding: '15px'}}>
                <TextField  
                    label='Title' 
                    variant='outlined'
                    value={dreamTitle}
                    onChange={e => setDreamTitle(e.target.value)}
                    sx={{
                        input: {
                            width: '500px'
                        }
                    }}
                />
                <br/><br/>
                <TextField 
                    label='ENS or Wallet Address' 
                    variant='outlined'
                    disabled
                    value={props.address || 'Connect Wallet to Populate'}
                    sx={{
                        input: {
                            width: '500px'
                        }
                    }}
                />
                <br/><br/>
                <TextField 
                    label='Dream Description' 
                    variant='outlined' 
                    value={dream}
                    onChange={e => setDream(e.target.value)}
                    sx={{
                        input: {
                            height: '100px',
                            width: '500px',
                        }
                    }}
                />
            </Paper>
            <div>
                <Button style={{background: 'linear-gradient(to right bottom, #430089, #00B2FF)', margin: '20px'}} variant='contained' onClick={() => navigate('/')}>Back</Button>
                <Button style={{background: 'linear-gradient(to right bottom, #430089, #00B2FF)', margin: '20px'}} variant='contained' onClick={() => handleCreation()}>Mint</Button>
            </div>
            <Typography variant='h6'>{ipfsHash == '' ? '' : 'Dream stored in IPFS at hash: ' + ipfsHash}</Typography>
        </>
    )
}

export default CreateDream;