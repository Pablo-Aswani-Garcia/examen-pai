/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since June 19 2026
 * @desc  Buffon's needle Model
 */

import {evaluate, min, pi, random, sec, sin, sqrt} from 'mathjs';
import {FunctionPoint} from './function_point.js';
/**
 * Model class for the Buffons needle
 */
export class BuffonNeedleModel {
  private numberOfNeedles: number;
  private lowerBound: number;
  private upperBound: number;
  /**
   * Initializes the model with default values. The number of needles to 1
   */
  constructor() {
    this.numberOfNeedles = 1;
    this.lowerBound = -1.5;
    this.upperBound = 1.5;
  }

  /**
   * sets the max and min bound of the simulation space
   * @param minBound - the min value
   * @param maxBound - the max value
   */
  setBounds(minBound:number, maxBound:number) {
    this.lowerBound = minBound;
    this.upperBound = maxBound;
  }
  
  /**
   * Extracts a random point
   * @return FunctionPoint - a function point
   */
  extractRandomPoint(): FunctionPoint {
    let randomPointX = random(this.lowerBound, this.upperBound);
    let randomPointY = random(this.lowerBound, this.upperBound);
    return {xPoint: randomPointX, yPoint: randomPointY};
  }

  /**
   * Returns the distance between two points
   * @param point first point
   * @param secondPoint secondPoint
   */
  distanceTo(point: FunctionPoint, secondPoint: FunctionPoint): number {
    return Math.sqrt((point.xPoint - secondPoint.xPoint)**2 + (point.yPoint - secondPoint.yPoint)**2);
  }

  /**
   * the angle the line makes
   * @param {FunctionPoint[]} line - the line to calculate the angle
   */
  angle(line: FunctionPoint[]): number {
    return Math.atan((line[1].yPoint - line[0].yPoint) / (line[1].xPoint - line[0].xPoint));
  }

  /**
   * Calculates minimal distances to the two lines
   * @param {FunctionPoint} point - point to calculate minimal distance
   */
  minimalDistanceToLines(point: FunctionPoint): number {
    return Math.min(this.distanceTo(point, {xPoint: point.xPoint, yPoint: -0.5}), this.distanceTo(point, {xPoint: point.xPoint, yPoint: -0.5}));
  }

  /**
   * returns the middle point
   * @param {FunctionPoint[]} line - line to find middle point
   */
  middlePoint(line: FunctionPoint[]): FunctionPoint {
    let middleX = (line[0].xPoint + line[1].xPoint) / 2;
    let middleY = (line[0].yPoint + line[1].yPoint) / 2;
    return {xPoint: middleX, yPoint: middleY};
  }
  /**
   * Drops one needle randomly
   */
  dropOneNeedle():FunctionPoint[] {
    let firstPoint = this.extractRandomPoint();
    
    let secondX;
    let secondY;
    while (true) {
      let angle = random(0, 2 * pi);
      secondX = firstPoint.xPoint + Math.cos(angle);
      secondY = firstPoint.yPoint + Math.sin(angle);
      if (secondX > this.lowerBound && secondY > this.lowerBound && secondX < this.upperBound && secondY < this.upperBound) {
        break;
      }

    }
    let secondPoint = {xPoint: secondX, yPoint: secondY} as FunctionPoint;
    return [firstPoint, secondPoint];
  }
}
