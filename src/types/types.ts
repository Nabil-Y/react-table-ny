export interface CustomTable {
  /**
   * Mandatory props containing data to be displayed. Only Array of object with same keys. Keys and values of type string only.
   */
  data: Record<string, string>[];
  skipFirstKey?: boolean;
  title?: string;
  className?: string;
  possibleRows?: number[];
}
