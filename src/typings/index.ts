export type DataFilterOptions = {
  value: string,
  options: Record<string, any>[],
  valueExtractor: (option: Record<string, any>) => string,
};
