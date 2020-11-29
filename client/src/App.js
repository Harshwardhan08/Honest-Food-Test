import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import fetch from 'isomorphic-fetch';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function App() {
    const classes = useStyles();
    const [nearestOutlet, setNearestOutlet] = React.useState('');
    const [address, setAddress] = React.useState('');


    const handleFind = async (event) => {
        event.preventDefault();
        try {
            const resp = await (await fetch(`http://localhost:4000/api/fetch-outlet-for-location`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ address: address })
            })).json();
            setNearestOutlet(resp.name);
        }
        catch (error) {
            console.log('Error Encountered', error);
        }
    }

    const handleAddressChange = (event) => setAddress(event.target.value);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Find the nearest outlet!
                    </Typography>
                <form className={classes.form} onSubmit={handleFind} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        onChange={handleAddressChange}
                        autoComplete="address"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Find
                        </Button>
                    <p>{nearestOutlet}</p>
                </form>
            </div>
        </Container>
    );
}

export default App;
