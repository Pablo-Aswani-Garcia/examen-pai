/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since May 6 2026
 * @desc BuffonNeedleView class
 */

import {AxisHandler} from './axis_handler';
import {FunctionPoint} from '../model/function_point';

/**
 * View class for the Buffon's needle program
 */
export class BuffonNeedleView {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly axisHandler: AxisHandler;
  private readonly resultElement: HTMLElement;
  /**
   * Initializes the view by selecting the necessary DOM elements and creating an instance of the AxisHandler class.
   */
  constructor() {
    this.canvas = document.getElementById('needle-canvas') as HTMLCanvasElement;
    this.resultElement = document.getElementById('result-value') as HTMLElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.axisHandler = new AxisHandler(this.context, this.canvas);
    this.drawAxis();
  }

  /**
   * Draws an initial axis with [-3, 3] as lower and upper limits
   */
  drawAxis() { 
    this.axisHandler.draw(-3, 3, -3, 3, 12)

  }

}
