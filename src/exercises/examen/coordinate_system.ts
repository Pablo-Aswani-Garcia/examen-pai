
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Pablo Aswani García
 * @since May 6 2026
 * @desc Coordinate System Utility Class
 */

/**
 * Utility class for managing the coordinate system of the canvas. It provides methods to convert between the function's coordinate system and the canvas coordinate system, taking into account the current padding and canvas dimensions. This allows for accurate visualization of the function graph and trapezoids on the canvas.
 */
export class CoordinateSystem {
  /** Initializes the coordinate system with the necessary parameters for scaling and padding. It takes into account the canvas dimensions and the desired range of x and y values to ensure that the function graph and trapezoids are accurately represented on the canvas.
   * @param {HTMLCanvasElement} canvas The canvas element on which the function graph and trapezoids will be drawn.
   * @param {number} leftPadding The left padding of the canvas to ensure that the graph is not drawn too close to the edge.
   * @param {number} rightPadding The right padding of the canvas to ensure that the graph is not drawn too close to the edge.
   * @param {number} topPadding The top padding of the canvas to ensure that the graph is not drawn too close to the edge.
   * @param {number} bottomPadding The bottom padding of the canvas to ensure that the graph is not drawn too close to the edge.
   * @param {number} minX The minimum x value for the function's coordinate system, used for scaling the x-coordinates on the canvas.
   * @param {number} maxX The maximum x value for the function's coordinate system, used for scaling the x-coordinates on the canvas.
   * @param {number} minY The minimum y value for the function's coordinate system, used for scaling the y-coordinates on the canvas.
   * @param {number} maxY The maximum y value for the function's coordinate system, used for scaling the y-coordinates on the canvas.
   */
  constructor(
      private readonly canvas: HTMLCanvasElement,
      private readonly leftPadding: number,
      private readonly rightPadding: number,
      private readonly topPadding: number,
      private readonly bottomPadding: number,
      private readonly minX: number,
      private readonly maxX: number,
      private readonly minY: number,
      private readonly maxY: number,
  ) {}

  /** Converts an x-coordinate from the function's coordinate system to the canvas coordinate system. It takes into account the current padding and canvas dimensions to ensure that the x-coordinate is accurately represented on the canvas, allowing for correct visualization of the function graph and trapezoids.
   * @param {number} xPosition The x-coordinate in the function's coordinate system to be converted to canvas coordinates.
   * @return {number} The corresponding x-coordinate in the canvas coordinate system.
   */
  public toCanvasX(xPosition: number): number {
    const drawableWidth = this.canvas.width - this.leftPadding - this.rightPadding;
    if (this.maxX === this.minX) {
      return this.leftPadding;
    }
    return this.leftPadding + ((xPosition - this.minX) / (this.maxX - this.minX)) * drawableWidth;
  }

  /**
   * Converts a y-coordinate from the function's coordinate system to the canvas coordinate system. It takes into account the current padding and canvas dimensions to ensure that the y-coordinate is accurately represented on the canvas, allowing for correct visualization of the function graph and trapezoids.
   * @param {number} yPosition The y-coordinate in the function's coordinate system to be converted to canvas coordinates.
   * @return {number} The corresponding y-coordinate in the canvas coordinate system.
   */
  public toCanvasY(yPosition: number): number {
    const drawableHeight = this.canvas.height - this.topPadding - this.bottomPadding;
    const range = this.maxY - this.minY;
    if (range === 0) {
      return this.canvas.height - this.bottomPadding;
    }
    return this.canvas.height - this.bottomPadding - ((yPosition - this.minY) / range) * drawableHeight;
  }

  /**
   * Gets the minimum x
   * @return {number} The minimum x value achieved.
   */
  public getMinX(): number {
    return this.minX;
  }

  /**
   * Gets the maximum x
   * @return {number} The maximum x value achieved.
   */
  public getMaxX(): number {
    return this.maxX;
  }

  /**
   * Gets the minimum y
   * @return {number} The minimum y value achieved.
   */
  public getMinY(): number {
    return this.minY;
  }

  /**
   * Gets the maximum y
   * @return {number} The maximum y value achieved.
   */
  public getMaxY(): number {
    return this.maxY;
  }
}
