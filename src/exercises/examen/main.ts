/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since May 1 2026
 * @desc main file for the Trapezoidal Rule Calculator application. It initializes the model, view, and controller.
 * This file serves as the entry point for the application, bootstrapping the MVC components and ensuring that the user interface is ready for interaction.
 */

import { BuffonNeedleController } from './buffons_needle_controller';
import {BuffonNeedleModel} from './buffons_needle_model.js';
import {BuffonNeedleView } from './buffon_needle_view.js';


/**
 * Boots the trapezoidal-rule calculator.
 */
function main() {
  const model = new BuffonNeedleModel();
  const view = new BuffonNeedleView();
  new BuffonNeedleController(model, view);
}

main();
