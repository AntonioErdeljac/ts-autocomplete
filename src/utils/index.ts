/**
 * Method to extract label from a single option
 * @param option Record<string, any> A single option to have it's label extracted
 * @returns String the extracted label
 */
export const getLabel = (option: Record<string, any>) => option.label;

/**
 * Method to extract value from a single option
 * @param option Record<string, any> A single option to have it's value extracted
 * @returns String the extracted value
 */
export const getValue = (option: Record<string, any>) => option.value;

/**
 * Method to filter options based on current value
 * @param value String the current value
 * @param options Record<string, any> List of options
 * @param labelExtractor () => void Method to extract the label from option
 * @returns Filtered Array of Record<string, any>
 */
export const getFilteredData = async (
  value: string,
  options: Record<string, any>,
  labelExtractor: (labelValue: Record<string, any>) => string,
): Promise<Record<string, any>[]> => {
  try {
    const reg = new RegExp(value.toLowerCase());

    if (value === '') {
      return [];
    }

    return options.filter((result: Record<string, any>) => {
      const resultValue = labelExtractor(result).toLowerCase();
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

/**
 * Method to dynamically hide or show a class
 * @param classes Record<string, any> Object of classes as keys and conditions as values
 * @returns String calculated classes
 */
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
