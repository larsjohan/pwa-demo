import React, {FC, useState} from 'react';
import {Box, Button, makeStyles, TextField, Typography} from '@material-ui/core';
import {Point} from '../declarations/Point';
import useCurrentLocation from '../hooks/UseCurrentLocation';
import {Fence} from '../declarations/Fence';
import getApi from '../services/ApiService';
import FenceViewer from '../components/FenceViewer';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(2, 1, 10),
  },
  viewport: {
    border: '1px solid #000',
  },
  geoFence: {
    fill: theme.palette.secondary.main,
    stroke: '#000',
    strokeWidth: 1,
    fillRule: 'evenodd'
  },
  location: {
    fill: theme.palette.primary.main,
    stroke: '#000',
    strokeWidth: 1
  },
  accuracy: {
    fill: 'none',
    stroke: '#000',
    strokeWidth: 1,
  }
}));

const api = getApi();

export const AddFenceView: FC = () => {
  const classes = useStyles();
  const currentLocation = useCurrentLocation();
  const [points, setPoints] = useState<Array<Point>>([]);
  const [name, setName] = useState<string>('');

  const accuracy = currentLocation?.coords.accuracy ?? Infinity;
  const currentDeviceLongitude = currentLocation?.coords.longitude ?? 0;
  const currentDeviceLatitude = currentLocation?.coords.latitude ?? 0;

  const addPoint = () => {
    if (currentLocation) {
      const point: Point = {
        lat: currentDeviceLatitude,
        lon: currentDeviceLongitude
      };
      if (!points.find(p => p.lat === point.lat && p.lon === point.lon)) {
        setPoints([...points, point]);
      }
    }
  }

  const addFence = async () => {
    const fence = await api.createFence({
      name,
      points: points,
    } as Fence);
    console.log(fence);
    alert(JSON.stringify(fence));
  }

  return (
    <div className={classes.container}>
      <Typography variant="h5">
        Add new GeoFence
      </Typography>

      <Typography component="span">
        <ol>
          <li>Position the device at the first point</li>
          <li>Click `Add point`</li>
          <li>Move the device to the second point</li>
          <li>Click `Add point`</li>
          <li>Repeat until the desired area has been recorded (minimum 3 points)</li>
          <li>Click `Save GeoFence`</li>
        </ol>

      </Typography>

      <Box m={1}>
        <b>For the optimal result, make sure the `Acc` value below is as low as possible</b>
      </Box>

      <table style={{width: '100%', textAlign: 'left'}}>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lat</td>
            <td>{currentDeviceLatitude.toFixed(6)}</td>
          </tr>
          <tr>
            <td>Lon</td>
            <td>{currentDeviceLongitude.toFixed(6)}</td>
          </tr>
          <tr>
            <td>Acc</td>
            <td>{accuracy}m</td>
          </tr>
          <tr>
            <td>Updated</td>
            <td>{new Date(currentLocation?.timestamp ?? 0).toLocaleTimeString()}</td>
          </tr>
        </tbody>
      </table>

      <Box m={2}>
        <Button variant="contained"
                color="secondary"
                onClick={addFence}
                disabled={!name || points.length < 3}>
          Save GeoFence
        </Button>
        <Button variant="contained" color="primary" onClick={addPoint}>
          Add point
        </Button>
      </Box>

      <Box m={1} width="100%">
        <TextField variant="outlined"
                   value={name}
                   onChange={event => setName(event.target.value as string)}
                   label="Name of GeoFence"
                   fullWidth/>
      </Box>

      <FenceViewer points={points}
                   center={{lat: currentDeviceLatitude, lon: currentDeviceLongitude}}
                   accuracy={accuracy}
                   displayCenterDot/>

    </div>
  );
};

export default AddFenceView;