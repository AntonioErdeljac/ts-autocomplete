export type DataFilterOptions = {
  value: string;
  options: Record<string, any>[];
  labelExtractor: (option: Record<string, any>) => string;
};
