/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since May 6 2026
 * @desc AxisDrawer class responsible for drawing the axes, grid, and tick marks on the canvas for the Trapezoidal Rule Calculator application. It provides methods to render the chart background, axes, and tick marks based on the data range and scaling requirements.
 */

import { random, sec } from 'mathjs';
import { FunctionPoint } from './function_point';
import {CoordinateSystem} from './coordinate_system';

/**
 * Draws the chart background, axes, and tick marks for a generic axis .
 */
export class AxisHandler {
  private leftPadding = 20;
  private rightPadding = 20;
  private topPadding = 20;
  private bottomPadding = 80;
  private readonly tickNumberFormatter = new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: 10,
  });

  /**
   * Initializes the AxisHandler with the provided canvas rendering context and canvas element. It sets up the necessary properties for drawing the axes and grid on the canvas.
   * @param {CanvasRenderingContext2D} context The 2D rendering context of the canvas where the axes will be drawn.
   * @param {HTMLCanvasElement} canvas The canvas element on which the axes and grid will be rendered.
   */
  constructor(
      private readonly context: CanvasRenderingContext2D,
      private readonly canvas: HTMLCanvasElement,
  ) {}

  /** Draws the axes, grid lines, and tick marks on the canvas based on the provided data range and tick count. It ensures that the chart is visually clear and properly scaled to represent the function graph and trapezoids accurately.
   * @param {number} startX The minimum x-value of the data range for scaling the axes.
   * @param {number} endX The maximum x-value of the data range for scaling the axes.
   * @param {number} minY The minimum y-value of the data range for scaling the axes.
   * @param {number} maxY The maximum y-value of the data range for scaling the axes.
   * @param {number} tickCount The number of tick marks to display on each axis for better readability.
   */
  public draw(startX: number, endX: number, minY: number, maxY: number, tickCount = 10): void {
    const coordinateSystem = this.createCoordinateSystem(startX, endX, minY, maxY, tickCount);
    this.context.save();
    this.drawGrid(coordinateSystem, tickCount);
    this.drawAxes();
    this.drawTickMarks(coordinateSystem, tickCount);
    this.drawAxisLabels();
    this.context.restore();
    this.drawUnitLines(minY, maxY);
  }

  /**
   * Draws the unit lines at y= -0.5 and 0.5
   * @param minValue - the minValue (in this case -1.5)
   * @param maxValue - the max value (in this case 1.5)
   */
  drawUnitLines(minValue:number, maxValue:number) {
    this.context.save();
    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 4;
    const upperLine = 0.5;
    const lowerLine = -0.5;
    let upperY = this.toCanvasY(upperLine, minValue, maxValue);
    let lowerY = this.toCanvasY(lowerLine, minValue, maxValue);
    let lowerX = this.toCanvasX(minValue, minValue, maxValue);
    let upperX = this.toCanvasX(maxValue, minValue, maxValue);
    this.context.moveTo(lowerX, upperY);
    this.context.lineTo(upperX, upperY);
    this.context.stroke();
    this.context.moveTo(lowerX, lowerY);
    this.context.lineTo(upperX, lowerY);
    this.context.stroke();
    this.context.restore();
  }

  /**
   * Draws a line in the functionPoints
   * @param {FunctionPoint[]} line - the line to evaluate
   * @param {number} minValue - the minValue of the axis
   * @param {number} maxValue - the maxValue of the axis
   */
  drawLine(line: FunctionPoint[], minValue: number, maxValue: number) {
    const firstX = this.toCanvasX(line[0].xPoint, minValue, maxValue);
    const firstY = this.toCanvasY(line[0].yPoint, minValue, maxValue);
    const secondX = this.toCanvasX(line[1].xPoint, minValue, maxValue);
    const secondY = this.toCanvasY(line[1].yPoint, minValue, maxValue);
    this.context.save();
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const color = colors[random(0, colors.length - 1)];
    this.context.strokeStyle = color;
     this.context.beginPath();
    this.context.moveTo(firstX, firstY);
    this.context.lineTo(secondX, secondY);
    this.context.stroke();
    this.context.restore();

  }
  /**
   * Transforms a data x-coordinate to the corresponding canvas x-coordinate based on the current axis scaling and padding.
   * @param {number} xPosition The x-coordinate in the data space to be transformed.
   * @param {number} minX The minimum x-value of the data range for scaling.
   * @param {number} maxX The maximum x-value of the data range for scaling.
   * @return {number} The corresponding x-coordinate on the canvas after transformation.
   */
  public toCanvasX(xPosition: number, minX: number, maxX: number): number {
    return this.createCoordinateSystem(minX, maxX, 0, 0).toCanvasX(xPosition);
  }

  /**
   * Transforms a data y-coordinate to the corresponding canvas y-coordinate based on the current axis scaling and padding. It inverts the y-axis to ensure that higher y-values are displayed towards the top of the canvas, which is standard for graphing functions.
   * @param {number} yPosition The y-coordinate in the data space to be transformed.
   * @param {number} minY The minimum y-value of the data range for scaling.
   * @param {number} maxY The maximum y-value of the data range for scaling.
   * @return {number} The corresponding y-coordinate on the canvas after transformation.
   */
  public toCanvasY(yPosition: number, minY: number, maxY: number): number {
    return this.createCoordinateSystem(0, 0, minY, maxY).toCanvasY(yPosition);
  }

  /** Draws the grid lines on the canvas for better visualization of the function graph and trapezoids. It calculates the positions of the grid lines based on the provided data range and tick count, ensuring that the grid is evenly spaced and aligned with the axes.
   * @param {number} coordinateSystem The coordinate system for scaling the grid lines.
   * @param {number} tickCount The number of grid lines to display for better readability.
   */
  private drawGrid(coordinateSystem: CoordinateSystem, tickCount: number): void {
    this.context.strokeStyle = 'grey';
    this.context.lineWidth = 1;
    const xTicks = this.buildTickValues(coordinateSystem.getMinX(), coordinateSystem.getMaxX(), tickCount);
    const yTicks = this.buildTickValues(coordinateSystem.getMinY(), coordinateSystem.getMaxY(), tickCount);

    for (const xValue of xTicks) {
      const x = coordinateSystem.toCanvasX(xValue);
      this.context.beginPath();
      this.context.moveTo(x, this.topPadding);
      this.context.lineTo(x, this.canvas.height - this.bottomPadding);
      this.context.stroke();
    }

    for (const yValue of yTicks) {
      const y = coordinateSystem.toCanvasY(yValue);
      this.context.beginPath();
      this.context.moveTo(this.leftPadding, y);
      this.context.lineTo(this.canvas.width - this.rightPadding, y);
      this.context.stroke();
    }
  }

  /**
   * Draws the x and y axes on the canvas. It uses the current padding and canvas dimensions to position the axes correctly, ensuring that they are clearly visible and properly aligned with the grid and tick marks for accurate representation of the function graph and trapezoids.
   */
  private drawAxes(): void {
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 1.1;
    this.context.beginPath();
    this.context.moveTo(this.leftPadding, this.canvas.height - this.bottomPadding);
    this.context.lineTo(this.canvas.width - this.rightPadding, this.canvas.height - this.bottomPadding);
    this.context.moveTo(this.leftPadding, this.canvas.height - this.bottomPadding);
    this.context.lineTo(this.leftPadding, this.topPadding);
    this.context.stroke();
  }

  /**
   * Draws the tick marks
   * @param {CoordinateSystem} coordinateSystem The coordinate system for scaling the tick positions.
   * @param {number} tickCount The number of tick marks to display on each axis for better readability.
   */
  private drawTickMarks(coordinateSystem: CoordinateSystem, tickCount: number): void {
    this.context.strokeStyle = 'black';
    this.context.fillStyle = 'black';
    this.context.lineWidth = 4;
    const maxX = coordinateSystem.getMaxX();
    const textXPadding = (this.context.measureText(this.formatTick(maxX)).width / 2) + 20;
    this.context.font = '25px Segoe UI';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    const xTicks = this.buildTickValues(coordinateSystem.getMinX(), coordinateSystem.getMaxX(), tickCount);
    const yTicks = this.buildTickValues(coordinateSystem.getMinY(), coordinateSystem.getMaxY(), tickCount);
    for (const xValue of xTicks) {
      const xTransformed = coordinateSystem.toCanvasX(xValue);
      const axisY = this.canvas.height - this.bottomPadding;
      // Draw vertical tick mark
      this.context.beginPath();
      this.context.moveTo(xTransformed, axisY);
      this.context.lineTo(xTransformed, axisY + 6);
      this.context.stroke();
      // rotate if the label is too long to fit in the available space
      if (maxX > 10000 || maxX < 0.1) {
        this.context.save();
        this.context.translate(xTransformed, axisY + textXPadding);
        this.context.rotate(-Math.PI / 7);
        this.context.fillText(this.formatTick(xValue), 0, 0);
        this.context.restore();
      } else {
        this.context.fillText(this.formatTick(xValue), xTransformed, axisY + 20);
      }
    }
    this.context.textAlign = 'right';
    for (const yValue of yTicks) {
      const yTransformed = coordinateSystem.toCanvasY(yValue);
      const axisX = this.leftPadding;
      // Draw horizontal tick mark
      this.context.beginPath();
      this.context.moveTo(axisX - 5, yTransformed);
      this.context.lineTo(axisX, yTransformed);
      this.context.stroke();
      this.context.fillText(this.formatTick(yValue), axisX - 10, yTransformed);
    }
    this.context.textAlign = 'start';
    this.context.textBaseline = 'alphabetic';
  }

  /**
   * Draws the labels for the x and y axes on the canvas. It positions the labels appropriately based on the canvas dimensions and ensures they are clearly visible to indicate the axes to the user.
   */
  private drawAxisLabels(): void {
    this.context.fillStyle = 'black';
    this.context.font = '40px Segoe UI';
    this.context.fillText('x', this.canvas.width / 2, this.canvas.height - 30);
    this.context.save();
    this.context.translate(30, this.canvas.height / 2);
    this.context.rotate(-Math.PI / 2);
    this.context.fillText('y', 0, 0);
    this.context.restore();
  }
  /** Formats a tick value for display on the axes. It rounds the value to one decimal place and converts it to a string for rendering as a tick label on the canvas.
   * @param {number} value The numerical value of the tick to be formatted.
   * @return {string} The formatted tick label as a string, rounded to one decimal place.
   */
  private formatTick(value: number): string {
    const rounded = Number(value);
    if (Math.abs(rounded) >= 1000000) {
      return rounded.toExponential(1);
    }
    return this.tickNumberFormatter.format(rounded);
  }

  /**
   * Builds tick values using a rounded step size so labels stay readable while the plotted scale remains exact.
   * @param {number} startValue The first value in the axis range.
   * @param {number} endValue The last value in the axis range.
   * @param {number} tickCount The preferred number of intervals.
   * @return {number[]} The tick values to render on the axis.
   */
  private buildTickValues(startValue: number, endValue: number, tickCount: number): number[] {
    const range = endValue - startValue;
    if (range === 0) {
      return [startValue];
    }

    const step = this.getEvenStep(range, tickCount);
    const tickValues: number[] = [];
    const firstTick = Math.ceil(startValue / step) * step;
    const lastTick = Math.floor(endValue / step) * step;

    tickValues.push(Number(startValue.toFixed(10)));

    for (let value = firstTick + step; value <= lastTick; value += step) {
      if (value > startValue && value < endValue - step / 2) {
        tickValues.push(Number(value.toFixed(10)));
      }
    }
    tickValues.push(Number(endValue.toFixed(10)));
    return tickValues;
  }

  /**
   * Chooses a human-friendly tick step close to the requested spacing.
   * @param {number} range The size of the axis range.
   * @param {number} tickCount The preferred number of intervals.
   * @return {number} A rounded step size for the tick marks.
   */
  private getEvenStep(range: number, tickCount: number): number {
    const rawStep = Math.abs(range) / tickCount;
    if (!Number.isFinite(rawStep) || rawStep === 0) {
      return 1;
    }
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    return Math.max(magnitude, Math.round(rawStep / magnitude) * magnitude);
  }

  /**
   * Builds a coordinate system whose bounds are snapped to the even tick spacing.
   * @param {number} minX The original x minimum.
   * @param {number} maxX The original x maximum.
   * @param {number} minY The original y minimum.
   * @param {number} maxY The original y maximum.
   * @param {number} tickCount The preferred number of intervals.
   * @return {CoordinateSystem} The coordinate system using the rounded bounds.
   */
  private createCoordinateSystem(minX: number, maxX: number, minY: number, maxY: number, tickCount = 10): CoordinateSystem {
    const xBounds = this.buildEvenAxisBounds(minX, maxX, tickCount);
    const yBounds = this.buildEvenAxisBounds(minY, maxY, tickCount);
    this.updateCurrentPaddings(xBounds.min, xBounds.max, yBounds.min, yBounds.max, tickCount);
    return new CoordinateSystem(
        this.canvas,
        this.leftPadding,
        this.rightPadding,
        this.topPadding,
        this.bottomPadding,
        xBounds.min,
        xBounds.max,
        yBounds.min,
        maxY,
    );
  }

  /**
   * Rounds the incoming range outward to the even tick spacing.
   * @param {number} startValue The original lower bound.
   * @param {number} endValue The original upper bound.
   * @param {number} tickCount The preferred number of intervals.
   * @return {object} The snapped visible bounds.
   */
  private buildEvenAxisBounds(startValue: number, endValue: number, tickCount: number): {min: number; max: number} {
    const lowerBound = Math.min(startValue, endValue);
    const upperBound = Math.max(startValue, endValue);
    const step = this.getEvenStep(upperBound - lowerBound, tickCount);
    return {
      min: Number((Math.floor(lowerBound / step) * step).toFixed(10)),
      max: Number((Math.ceil(upperBound / step) * step).toFixed(10)),
    };
  }

  /**
   * Updates internal paddings so long tick labels fit inside the canvas.
   * @param {number} minX The visible minimum x value.
   * @param {number} maxX The visible maximum x value.
   * @param {number} minY The visible minimum y value.
   * @param {number} maxY The visible maximum y value.
   * @param {number} tickCount The preferred number of intervals.
   */
  public updateCurrentPaddings(minX: number, maxX: number, minY: number, maxY: number, tickCount: number): void {
    this.context.save();
    this.context.font = '25px Segoe UI';
    const xTicks = this.buildTickValues(minX, maxX, tickCount);
    const yTicks = this.buildTickValues(minY, maxY, tickCount);
    const maxXLabelWidth = 0;
    let maxYLabelWidth = 0;
    for (const value of xTicks) {
      const width = this.context.measureText(this.formatTick(value)).width;
      if (width > maxXLabelWidth) {
        maxYLabelWidth = width;
      }
    }
    for (const value of yTicks) {
      const width = this.context.measureText(this.formatTick(value)).width;
      if (width > maxYLabelWidth) {
        maxYLabelWidth = width;
      }
    }
    const additionalPadding = 50;
    this.leftPadding = Math.max(this.leftPadding, maxYLabelWidth + additionalPadding);
    this.bottomPadding = Math.max(this.bottomPadding, maxXLabelWidth + additionalPadding);
    this.context.restore();
  }
}
