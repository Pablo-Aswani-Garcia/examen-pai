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
import {FunctionPoint} from './function_point';

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
    // from -1.5 to 1.5, 6 ticks
    const tickCount = 6;
    const minCoordinate = -1.5;
    const maxCoordinate = 1.5;
    this.axisHandler.draw(minCoordinate, maxCoordinate, minCoordinate, maxCoordinate, tickCount)
  }

  /**
   * Renders a needle in the viewport
   * @param {FunctionPoint} needle - the needle to show on screen
   */
  renderNeedle(needle: FunctionPoint[]) {
    
    this.axisHandler.drawLine(needle, -1.5, 1.5);

  }

}
