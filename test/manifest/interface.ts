export interface Statistics {
  /**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
  getAverage(x: number, y: number): number;

  /**
   * a string variable
   */
  aLongString: string;

  /**
   * a property function with x as string parameter
   *
   * @param x - The first input number
   *
   */
  propertyFn: (x: string) => void;

  aRecursiveTest: Statistics;
}
