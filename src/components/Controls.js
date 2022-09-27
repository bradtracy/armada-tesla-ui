
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { startCase } from 'lodash';
import {vehicleTestData} from '../testData'

const Controls = (props) => {

  
  const [teslaData, setTeslaData] = useState({});
  const [showData, setShowData] = useState(false);

  const honkHorn = (e) => {
    e.preventDefault();
    props.appState.honkHorn(props.user)
    .then(() => {
      props.setSuccess('Honk Request Successfull')
    }).catch( (err) => {
      props.setError('Honk Request Failed');
    })
  };

  const flashLights = (e) => {
    e.preventDefault();
    props.appState.flashLights(props.user)
    .then(() => {
      props.setSuccess('Lights Request Successfull')
    }).catch( (err) => {
      props.setError('Lights Request Failed');
    })
  };

  const openTrunk = (e) => {
    e.preventDefault();
    props.appState.openTrunk(props.user, 'rear')
    .then(() => {
      props.setSuccess('Trunk Request Successfull')
    }).catch( (err) => {
      props.setError('Trunk Request Failed');
    })
  };

  // to load example data replace res.json() with vehicleTestData
  const getData = (e) => {
    e.preventDefault();
    props.appState.getData('props.user')
    .then(( res ) => {
      setTeslaData(res.json())
      console.log(res)
      if ( res.status === 200 ) {
        props.setSuccess('Data Request Successfull')
        setShowData(true)
      } else {
        props.setError('Data Request Failed');
      }
    }).catch( (err) => {
      props.setError('Data Request Failed');
      console.log(err);
    })
  };

  const closeData = (e) => {
    e.preventDefault();
    setShowData(false)
  };

  const climateStateList = () => {
    const data = teslaData.climate_state;
    return {
      outside_temp: data.outside_temp,
      is_auto_conditioning_on: data.is_auto_conditioning_on
    }
  }

  const vehicleStateList = () => {
    const data = teslaData.vehicle_state;
    return {
      is_user_present: data.is_user_present,
      odometer: data.odometer,
      ft: data.ft,
      rt: data.rt
    }
  }

  const vehicleConfigList = () => {
    const data = teslaData.vehicle_config;
    return {
      car_type: data.car_type,
      charge_port_type: data.charge_port_type
    }
  }

  const driveStateList = () => {
    const data = teslaData.drive_state;
    return {
      power: data.power,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: data.timestamp
    }
  }

  const chargingStateList = () => {
    const data = teslaData.charge_state;
    return {
      charging_state: data.charging_state,
      time_to_full_charge: data.time_to_full_charge,
      fast_charger_present: data.fast_charger_present,
      battery_level: data.battery_level,
      charge_rate: data.charge_rate
    }
  }

  const DataListItem = ({ text, value }) => {
    return (
      <ListItem style={{ borderBottom: '1px solid gray' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="p" variant="p">
              {startCase(text)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="p">
              {value.toString()}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    )
  }

  const DataTable = () => {
    console.log(Object.keys(teslaData).length)
    if (Object.keys(teslaData).length === 0) {
      return (
        <Grid container justifyContent="center">
          <Grid item>
            <Typography component="h5" variant="h5">
              {teslaData.display_name}
            </Typography>
          </Grid>
          <br/>
          <br/>
          <Grid item>
            <Typography component="h5" variant="h5">
              No Data Available
            </Typography>
          </Grid>
        </Grid>
      )
    }
    if ( Object.keys(teslaData).length > 1 ) {
      return (
        <Grid style={{ margin: '10px 0', border: 'medium solid gray'}}>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h5" variant="h5">
                {teslaData.display_name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h6" variant="h6">
                Climate State
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <List>
              { Object.entries(climateStateList()).map( (valArry) => {
                  return <DataListItem key={valArry[0].toLowerCase().replace(' ', '')} text={valArry[0]} value={valArry[1]} />
              }) }
              </List>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h6" variant="h6">
                Vehicle State
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <List>
              { Object.entries(vehicleStateList()).map( (valArry) => {
                  return <DataListItem key={valArry[0].toLowerCase().replace(' ', '')} text={valArry[0]} value={valArry[1]} />
              }) }
              </List>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h6" variant="h6">
                Vehicle Config
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <List>
              { Object.entries(vehicleConfigList()).map( (valArry) => {
                  return <DataListItem key={valArry[0].toLowerCase().replace(' ', '')} text={valArry[0]} value={valArry[1]} />
              }) }
              </List>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h6" variant="h6">
                Drive State
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <List>
              { Object.entries(driveStateList()).map( (valArry) => {
                  return <DataListItem key={valArry[0].toLowerCase().replace(' ', '')} text={valArry[0]} value={valArry[1]} />
              }) }
              </List>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h6" variant="h6">
                Charging State
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <List>
              { Object.entries(chargingStateList()).map( (valArry) => {
                  return <DataListItem key={valArry[0].toLowerCase().replace(' ', '')} text={valArry[0]} value={valArry[1]} />
              }) }
              </List>
            </Grid>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <>
        <Typography component="h1" variant="h5">
          Interact with your Tesla
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                  onClick={honkHorn}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '90px' }}
              >
                  Honk Horn
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                  onClick={flashLights}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '90px'  }}
              >
                  Flash Lights
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                  onClick={openTrunk}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '90px'  }}
              >
                  Open Rear Trunk
              </Button>
            </Grid>
            <Grid item xs={12}>
            <Button
                  onClick={!showData? getData : closeData}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  {!showData? 'Get Data' : 'Close Data'}
              </Button>
            </Grid>
          </Grid>
          { showData? <DataTable /> : null  }
        </Box>
    </>
  );
}

export default Controls;