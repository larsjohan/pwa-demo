import React, {FC, useEffect, useState} from 'react';
import getApi from '../services/ApiService';
import {Fence} from '../declarations/Fence';
import {List, ListItem, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const api = getApi();

export const HomeView: FC = () => {
  const history = useHistory();
  const [fences, setFences] = useState<Array<Fence>>([]);

  useEffect(() => {
    api.getAllFences().then(setFences).catch(console.error);
  }, []);

  if (!fences?.length) {
    return <Typography color="error">No fences available</Typography>
  }

  return (
    <List>
      {
        fences.map(fence => (<ListItem button key={fence.id} onClick={() => history.push(`/fence/${fence.id}`)}>{fence.name}</ListItem>))
      }
    </List>
  );
};

export default HomeView;