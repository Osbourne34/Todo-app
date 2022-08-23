export const useValideForm = (...errors: boolean[]): boolean => {
    if (errors.find((error: boolean) => error)) {
        return false;
    }
    return true;
};
