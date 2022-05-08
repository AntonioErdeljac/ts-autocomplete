import { DataFilterOptions } from '../typings';

export const getLabel = (option: Record<string, any>) => option.label;

export const getValue = (option: Record<string, any>) => option.value;

export const getFilteredData = async ({ value, options, valueExtractor }: DataFilterOptions): Promise<Record<string, any>[]> => {
  try {
    const reg = new RegExp(value.toLowerCase());

    if (value === '') {
      return [];
    }

    return options.filter((result) => {
      const resultValue = valueExtractor(result).toLowerCase();
      const foundMatch = resultValue.match(reg);

      if (foundMatch) {
        return foundMatch;
      }

      return null;
    });
  } catch (error) {
    return [];
  }
};

export const classNames = (classes: Record<string, boolean>) => {
  const result: string[] = [];
  const keys = Object.keys(classes);

  keys.forEach((key) => {
    if (classes[key]) {
      result.push(key);
    }
  });

  return result.join(' ');
};
