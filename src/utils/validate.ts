const removeSpaces = (str: string): string => {
    return str.trim().replace(/\s+/g, '');
};

export const emailValidator = (value: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
};

export const passwordValidator = (value: string): boolean => {
    const withoutSpaces = removeSpaces(value);
    return /(^(?=.*[a-z]).{8,24}$)/g.test(withoutSpaces);
};

export const emptyValidator = (value: string): boolean => {
    const withoutSpaces = removeSpaces(value);
    return /^(?=.{3,25}$)/g.test(withoutSpaces);
};
