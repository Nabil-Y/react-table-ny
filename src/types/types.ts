export interface CustomTable {
  data: Record<string, string>[];
  skipFirstKey?: boolean;
  title?: string;
  customClasses?: string;
  possibleRows?: number[];
}
