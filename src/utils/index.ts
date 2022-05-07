import { DataFilterOptions } from '../typings';

export const getLabel = (option: Record<string, any>) => option.label;

export const getValue = (option: Record<string, any>) => option.value;

export const getFilteredData = async ({ value, options, valueExtractor }: DataFilterOptions): Promise<Record<string, any>[]> => {
  try {
    const reg = new RegExp(value);

    if (value === '') {
      return [];
    }

    return options.filter((result) => {
      const foundMatch = valueExtractor(result).match(reg);

      if (foundMatch) {
        return foundMatch;
      }
    });
  } catch (error) {
    return [];
  }
}