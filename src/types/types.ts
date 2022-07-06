/**
 * Interface for table component
 */
export interface CustomTable {
  /**
   * Mandatory props containing data to be displayed. Only Array of object with same keys. Keys and values of type string only.
   */
  data: Record<string, string>[];
  /**
   * Optional prop to disable first key of object in the table. Useful to hide Id for example
   */
  skipFirstKey?: boolean;
  /**
   * Add a title to your table component. (h2)
   */
  title?: string;
  /**
   * Add custom classes to style the table your way. Instructions on how to style the component in the docs
   */
  className?: string;
  /**
   * Choose your number of row per pages. Only takes the first four numbers of an array of numbers. Will display 10,25,50,100 otherwise.
   */
  possibleRows?: number[];
}
