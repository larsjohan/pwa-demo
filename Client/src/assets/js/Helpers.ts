/**
 * A set of globally available helper-methods
 */
export default abstract class Helpers {

  /**
   * Maps a value from one range to another
   * @example
   * <pre>
   * const val = mapRange(1, 0, 10, 0, 100);  // val === 10
   * const val = mapRange(1, 0, 10, 10, 20);  // val === 11
   * const val = mapRange(50, 0, 100, 0, 10); // val === 5
   * const val = mapRange(1, 0, 10, 10, 0);   // val === 9
   * </pre>
   * @param {number} input The value to map
   * @param {number} inputStart The first value of the original range
   * @param {number} inputEnd The last value of the original range
   * @param {number} outputStart The first value of the new range
   * @param {number} outputEnd The last value of the new range
   * @return {number}
   */
  public static mapRange(input: number, inputStart: number, inputEnd: number, outputStart: number, outputEnd: number): number {
    if (input <= inputStart) {
      return outputStart;
    } else if(input >= inputEnd) {
      return outputEnd;
    }
    return (outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart));
  }

  public static sum<T = number>(values: Array<T>, accessor?: (item: T) => number): number {
    if (!values.length) {
      return 0;
    }
    const toNumber = !!accessor ? accessor : (item: T): number => {
      return (item ?? 0) as any as number;
    }
    return values.map(toNumber).reduce((acc, val) => acc + val, 0);
  }

  public static avg<T = number>(values: Array<T>, accessor?: (item: T) => number): number {
    if (!values?.length) {
      return 0;
    }
    return Helpers.sum<T>(values, accessor) / values.length;
  }

}