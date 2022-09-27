
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from '../components/Signin';
import Copyright from '../components/Copyright';
import ProvideSignInURL from '../components/ProvideSignInURL';
import CollectLink from '../components/CollectLink';
import Controls from '../components/Controls';

const theme = createTheme();

const Home = (props) => {
  const {appState} = props;
  const [loginURL, setLoginURL] = useState('');
  const [user, setUser] = useState('');
  const [step, setStep] = useState(3);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="Armada Power"
            src="./favicon.png"
            sx={{ width: 90, height: 90, margin: "10px 0 30px 0" }}
            variant="square"
          />
          {step === 0? <SignIn appState={appState} setStep={setStep} setLoginURL={setLoginURL} setUser={setUser} setError={setError} /> : null}
          {step === 1? <ProvideSignInURL loginURL={loginURL} setStep={setStep} /> : null}
          {step === 2? <CollectLink appState={appState} setStep={setStep} user={user} setError={setError} isExistingUser={!loginURL} /> : null}
          {step === 3? <Controls appState={appState} setStep={setStep} setError={setError} setSuccess={setSuccess} user={user} /> : null}
        </Box>
        { error? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : null }
        { success? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        ) : null }
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Home;