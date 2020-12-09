import {Point} from './Point';

export interface Fence {
  id?: number;
  name: string;
  points: Array<Point>;
}