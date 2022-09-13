
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SignIn = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get('email');
        props.appState.getLogin(email).then(res => res.json())
        .then(res => {
            props.setUser(email);
            if ( res ) {
                props.setLoginURL(res);
                props.setStep(1);
            } else {
                props.setStep(2);
            }
            props.setError('');
        }).catch( err => {
            props.setError('Failed to get login url');
        });
    };

  return (
    <>
        <Typography component="h5" variant="h5">
            Enter Username
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Next
        </Button>
        </Box>
    </>
  );
}

export default SignIn;