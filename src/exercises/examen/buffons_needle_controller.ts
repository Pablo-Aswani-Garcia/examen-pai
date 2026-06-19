/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since June 19 2026
 * @desc 
 */

import {BuffonNeedleModel} from './buffons_needle_model';
import { FunctionPoint } from './function_point';
import {BuffonNeedleView} from './buffon_needle_view';

/**
 * Controller class for the Buffon Needle program. It handles user interactions and updates the model and view accordingly.
 */
export class BuffonNeedleController {
  private readonly model: BuffonNeedleModel;
  private readonly view: BuffonNeedleView;
  private drop1: HTMLButtonElement;
  private drop100: HTMLButtonElement;
  private drop1000: HTMLButtonElement;
  private dropCustom: HTMLButtonElement;
  private customDrop: HTMLInputElement;
  private textOutput: HTMLElement;

  /**
   * Initializes the controller with the given model and view, and sets up event listeners for user interactions.
   * @param {BuffonNeedleModel} model - The game model that manages the game state and logic.
   * @param {BuffonNeedleView} view - The game view that handles the display of game information and user interface.
   */
  constructor(model: BuffonNeedleModel, view: BuffonNeedleView) {
    this.model = model;
    this.view = view;
    this.drop1 = document.getElementById('drop-1') as HTMLButtonElement;
    this.drop100 = document.getElementById('drop-100') as HTMLButtonElement;
    this.drop1000 = document.getElementById('drop-1000') as HTMLButtonElement;
    this.dropCustom = document.getElementById('drop-custom') as HTMLButtonElement;
    this.customDrop = document.getElementById('drop-custom-text') as HTMLInputElement
    this.textOutput = document.getElementById('textOutput') as HTMLElement;
    this.addEvents();

  }

  /**
   * show the output through the screen
   * @param {FunctionPoint[]} output - output to show on screen 
   * @param {FunctionPoint} middlePoint - middle point 
   * @param {number} angle - angle to show
   */
  updateOutput(output: FunctionPoint[], middlePoint: FunctionPoint, angle: number) {
    this.textOutput.textContent = `Punto1:(${output[0].xPoint.toFixed(2)},${output[0].yPoint.toFixed(2)}), Punto2: (${output[1].xPoint.toFixed(2)},${output[1].yPoint.toFixed(2)})`;
    this.textOutput.textContent  += `\n Punto medio:(${middlePoint.xPoint.toFixed(2)},${middlePoint.yPoint.toFixed(2)})`;
    this.textOutput.textContent += `\n Distancia:(${this.model.minimalDistanceToLines(middlePoint).toFixed(2)})`;
    this.textOutput.textContent += `, angulo: ${angle.toFixed(2)}`;
  }
  /**
   * Add the listeners to the corresponding events
   */
  addEvents() {
    this.drop1.addEventListener('click', () => {
      let output = this.model.dropOneNeedle();
      this.view.renderNeedle(output);
      let middle = this.model.middlePoint(output);
      let angle = this.model.angle(output);
      this.updateOutput(output, middle, angle);
    });

  }


}
