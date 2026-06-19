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

import {evaluate, min, pi, random, sin} from 'mathjs';
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
    this.lowerBound = 1.5;
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
   * Drops one needle randomly
   */
  dropOneNeedle():FunctionPoint[] {
    let firstPoint = this.extractRandomPoint();
    let angle = random(0, 2 * pi);
    let secondX = firstPoint.xPoint + Math.cos(angle);
    let secondY = firstPoint.yPoint + Math.sin(angle);
    let secondPoint = {xPoint: secondX, yPoint: secondY} as FunctionPoint;
    return [firstPoint, secondPoint];
  }
}
