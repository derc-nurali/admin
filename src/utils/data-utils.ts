export const filterJoinArr = (arr: any[], split = ', ') => {
  return arr.filter(Boolean).join(split);
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateID = (prefix: string = '_') => {
  return prefix + Math.random().toString(36).substr(2, 9);
};
