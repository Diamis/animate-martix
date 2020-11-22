import { Canvas } from './canvas';
import { Point } from './point';

const canvas = document.getElementById('canvas');

const core = new Canvas(canvas, Point);
core.init({ row: 60, coll: 60, width: 12, height: 12 });