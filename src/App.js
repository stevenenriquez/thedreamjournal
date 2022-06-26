import { useState } from 'react';
import './App.css';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Button, Typography } from '@mui/material';
import { providers } from 'ethers';
import DreamContainer from './components/DreamContainer/DreamContainer.js';
import CreateDream from './components/CreateDream/CreateDream.js';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    },
    disableInjectedProvider: false
  }
}

const web3Modal = new Web3Modal({
  cacheProvider: true,
  network: 'mainnet',
  providerOptions
});

function App() {
  const [address, setAddress] = useState('');
  const [etherProvider, setEtherProvider] = useState(null);
  let navigate = useNavigate();
  let provider;
  let ethersProvider;

  const connectWallet = async () => {
    provider = await web3Modal.connect();
    ethersProvider = new providers.Web3Provider(provider);
    setEtherProvider(ethersProvider);

    const userAddress = await ethersProvider.getSigner().getAddress();
    const ens = await resolveReverseLookup(userAddress);

    ens != null ? setAddress(ens) : setAddress(userAddress);
  }

  const logout = async () => {
    setAddress('');
    await web3Modal.clearCachedProvider();
  }

  const resolveReverseLookup = address => {
    let ens = ethersProvider.lookupAddress(address);   
    return ens != null ? ens : address;
  }

  return (
    <div className='app'>
        <div style={{position: 'absolute', top: '10px', right: '15px'}}>
        {address == '' ? (
          <Button className='button' variant='contained' onClick={() => connectWallet()}>Connect Wallet</Button>
        ) : (
          <>
            <Typography style={{marginBottom: '10px'}}>
              {address !== '' ? `👋 Hi, ${address}` : ''}
            </Typography>
            <Button className='button' variant='contained' onClick={window.location.pathname == '/' ? () => navigate("../create", { replace: true }) : () => navigate("../", { replace: true })}>{window.location.pathname == '/' ? 'Mint Page' : 'Home'}</Button>
            <Button style={{background: 'linear-gradient(to right bottom, #430089, #00B2FF)', marginLeft: '10px'}} variant='contained' onClick={() => logout()}>Logout</Button>
          </>
        )}
        </div>
        <Routes>
          <Route path='/' element={<DreamContainer />} />
          <Route path='create' element={<CreateDream provider={etherProvider} address={address} />} />
        </Routes>
    </div>
  );
}

export default App;