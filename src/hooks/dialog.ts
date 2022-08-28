import { useState } from 'react';

export const useDialog = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleOpen,
        handleClose,
    };
};
