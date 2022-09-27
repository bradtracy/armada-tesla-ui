
import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ProvideSignInURL = (props) => {
    const next = (event) => {
        event.preventDefault();
        props.setStep(2);
    };
    return (
        <Grid container justifyContent="center" >
            <Grid item>
                <Link href={props.loginURL} underline="always" target="_blank" rel="noreferrer" variant='h5'>
                    Click to open Tesla Login page
                </Link>
                <br />
                <br />
                <Typography component="h6" variant="h6">
                    After log in you will see the page below, you may be automatically logged in.
                </Typography>
                <Box
                    component="img"
                    sx={{
                    height: 300,
                    width: '100%',
                    margin: '10px auto',
                    border: '1px solid grey',
                    }}
                    alt="Tesla Login Page"
                    src="./tesla-page-not-found.png"
                />
                <Box component="form" onSubmit={next} noValidate sx={{ mt: 1 }}>
                    <Grid container justifyContent="center" >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Next
                        </Button>
                    </Grid>
                </Box>
            </Grid>
      </Grid>
  );
}

export default ProvideSignInURL;