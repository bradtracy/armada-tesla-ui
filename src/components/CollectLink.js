
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const passPhrase = 'Armada Power Tesla API';

const CollectLink = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = data.get('user');
    const url = data.get('url');
    if ( props.isExistingUser ) {
      if (url === passPhrase) {
        props.setStep(3)
      } else {
        props.setError('Incorrect Pass Phrase.');
      }
    } else {
      props.appState.submitURL(user, url)
      .then(res => {
        props.setError('');
        props.setStep(3);
      }).catch( err => {
        props.setError('Error Submitting URL');
      });
    }
  };

  return (
    <>
        <Typography component="h4" variant="h4">
          {props.isExistingUser? 'Enter Pass Phrase' : 'Please Copy and paste URL from Tesla page'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="username"
            name="user"
            defaultValue={props.user}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label={props.isExistingUser? "Pass Phrase" : "URL Address"}
            name="url"
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

export default CollectLink;