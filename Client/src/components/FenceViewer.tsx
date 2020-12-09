import React, {FC, useEffect, useMemo, useState} from 'react';
import {Point} from '../declarations/Point';
import {makeStyles} from '@material-ui/core';
import Helpers from '../Helpers';

const useStyles = makeStyles((theme) => ({
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

export interface FenceViewerProps {
  /**
   * The points to draw. Represents a fence
   */
  points: Array<Point>;
  /**
   * the center of the viewport
   */
  center?: Point;
  /**
   * Display a dot in the center, notifying the device's position
   */
  displayCenterDot?: boolean;
  /**
   * Display an additional ring around the center-dot,
   * to mark the accuracy of the position in meters
   */
  accuracy?: number;
  /**
   * The width AND height of the viewport in meters.
   * Defaults to 10.
   */
  viewportSize?: number;
}

const ONE_M_FACTOR = (0.00001 / 1.11);

export const FenceViewer: FC<FenceViewerProps> = ({
                                                    points,
                                                    center,
                                                    displayCenterDot = false,
                                                    accuracy = 0,
                                                    viewportSize = 10
}) => {
  const classes = useStyles();
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  // Calculate center coordinates of viewport
  const {centerLat, centerLon} = useMemo(() => {
    // Use center coords if specified
    if (center) {
      return {
        centerLat: center.lat,
        centerLon: center.lon
      };
    }
    // Calculate the center based on the points provided
    if (!!points?.length) {
      return {
        centerLat: Helpers.avg(points, p => p.lat),
        centerLon: Helpers.avg(points, p => p.lon)
      };
    }
    // Use the center of the screen/canvas as default
    return {
      centerLat: deviceWidth / 2,
      centerLon: deviceWidth / 2
    };
  }, [center, points, deviceWidth]);

  // Calculate the lowest and highest range-values to map coords to pixels
  const {lowestLatitude, highestLatitude, lowestLongitude, highestLongitude} = useMemo(() => {
    const offset = ONE_M_FACTOR * viewportSize;
    return {
      lowestLatitude: centerLat - offset,
      highestLatitude: centerLat + offset,
      lowestLongitude: centerLon - offset,
      highestLongitude: centerLon + offset,
    }
  }, [centerLat, centerLon, viewportSize]);

  // Map coords to pixels
  const normalizedCoords = points.map(point => ({
    y: Helpers.mapRange(point.lat, lowestLatitude, highestLatitude, 0, deviceWidth),
    x: Helpers.mapRange(point.lon, lowestLongitude, highestLongitude, deviceWidth, 0),
  }));

  const getAccuracyRadius = (): number => {
    const low = (lowestLongitude + lowestLatitude) / 2;
    const high = (highestLongitude + highestLatitude) / 2;
    return Helpers.mapRange(accuracy * ONE_M_FACTOR, low, high, 0, deviceWidth);
  }

  // Update the device-width if it changes
  useEffect(() => {
    const handler = () => {
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Render the component
  return (
    <svg width={deviceWidth} height={deviceWidth} className={classes.viewport}>
      {
        points.length >= 2 &&
        <polygon className={classes.geoFence} points={normalizedCoords.map(p => `${p.x},${p.y}`).join(' ')}/>
      }
      {
        displayCenterDot && <circle cx={deviceWidth / 2} cy={deviceWidth / 2} className={classes.location} r={5}/>
      }
      {
        displayCenterDot &&
        accuracy > 0 &&
        <circle cx={deviceWidth / 2} cy={deviceWidth / 2} className={classes.accuracy} r={getAccuracyRadius()}/>
      }
    </svg>
  );
};

export default FenceViewer;