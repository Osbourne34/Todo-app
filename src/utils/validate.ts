export const emailValidator = (value: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
};

export const passwordValidator = (value: string): boolean => {
    const withoutSpaces = value.trim().replace(/\s+/g, '');
    return /(^(?=.*[a-z]).{8,24}$)/g.test(withoutSpaces);
};
