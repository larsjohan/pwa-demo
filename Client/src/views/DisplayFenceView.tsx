import React, {FC, useEffect, useState} from 'react';
import {Typography} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import getApi from '../services/ApiService';
import {Fence} from '../declarations/Fence';
import FenceViewer from '../components/FenceViewer';

const api = getApi();

export const DisplayFenceView: FC = () => {
  const {fenceId}: {fenceId?: string} = useParams();
  const [fence, setFence] = useState<Fence>();

  useEffect(() => {
    const id = Number.parseInt(fenceId || '');
    api.getFence(id).then(setFence).catch(console.error);
  }, [fenceId]);

  if (!fence) {
    return null;
  }

  return (
    <>
      <Typography variant="h4">{fence.name}</Typography>
      <FenceViewer polygons={[fence.points || []]} />
    </>
  );
};

export default DisplayFenceView;