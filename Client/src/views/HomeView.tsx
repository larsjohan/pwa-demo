import React, {FC, useEffect, useState} from 'react';
import getApi from '../services/ApiService';
import {Fence} from '../declarations/Fence';
import {List, ListItem, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import FenceViewer from '../components/FenceViewer';
import useCurrentLocation from '../hooks/UseCurrentLocation';

const api = getApi();

export const HomeView: FC = () => {
  const history = useHistory();
  const location = useCurrentLocation();
  const [fences, setFences] = useState<Array<Fence>>([]);

  useEffect(() => {
    api.getAllFences().then(setFences).catch(console.error);
  }, []);

  if (!fences?.length) {
    return <Typography color="error">No fences available</Typography>
  }

  return (
    <>
      <Typography variant="h5">
        Stored fences
      </Typography>
      <List>
        {
          fences.map(fence => (<ListItem button key={fence.id} onClick={() => history.push(`/fence/${fence.id}`)}>{fence.name}</ListItem>))
        }
      </List>
      <Typography variant="h5">
        All fences
      </Typography>
      {
        location &&
        <FenceViewer polygons={fences.map(f => f.points)}
                     center={{lat: location?.coords.latitude, lon: location?.coords.longitude}}
                     accuracy={location.coords.accuracy}
                     displayCenterDot
                     viewportSize={20}/>
      }
    </>
  );
};

export default HomeView;