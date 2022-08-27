import { ChangeEvent, useState } from 'react';

export const useInput = (
    validate: (value: string) => boolean,
    initialValue?: string,
) => {
    const [value, setValue] = useState<string>(initialValue || '');
    const [blur, setBlur] = useState<boolean>(false);

    const valueIsValid = validate(value);
    const hasError = !valueIsValid;
    const displayedError = blur && !valueIsValid;

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    const onBlur = (): void => {
        setBlur(true);
    };

    const clear = (): void => {
        setValue('');
    };

    return {
        value,
        onChange,
        onBlur,
        hasError,
        displayedError,
        clear,
        setBlur,
        setValue,
    };
};
