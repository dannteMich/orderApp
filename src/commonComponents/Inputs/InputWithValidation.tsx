import React, {useState, ReactNode} from 'react';
import {TextField, InputAdornment} from '@material-ui/core';

interface Props {
    validateValue: (value: string) => boolean;
    getErrorMessage?: (value: string|null) => string|null;
    callOnBlur?: boolean;
    callOnChange?: boolean;
    handleNewValidValue: (value: string) => void;
    label?: string;
    size: 'small' | 'medium';
    startTextAdornment?: ReactNode;
    endTextAdornment?: ReactNode;
}

const InputWithValidation: React.FC<Props> = ({
    validateValue, getErrorMessage, handleNewValidValue,
    callOnBlur=false, callOnChange=false,
    startTextAdornment, endTextAdornment,
    label, size='small', 
}) => {
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string|null>();

    const handleChange = (newValue: string) => {
        const newIsValid = validateValue(newValue);
        setIsValid(newIsValid);
        if (newIsValid && callOnChange) {
            handleNewValidValue(newValue);
        }
        if (!newIsValid && getErrorMessage) {
            setErrorMessage(getErrorMessage(newValue));
        }
    }

    const handleBlur = (newValue: string) => {
        if (isValid && callOnBlur) {
            handleNewValidValue(newValue);
        }
    }

    const startAdornment = startTextAdornment && <InputAdornment position="start">
        {startTextAdornment}
    </InputAdornment>

    const endAdornment = endTextAdornment && <InputAdornment position="end">
        {endTextAdornment}
    </InputAdornment>

    return <TextField 
        error={!isValid}
        label={label}
        size={size}
        helperText={!isValid && errorMessage }
        variant="outlined"
        onChange={e => handleChange(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        InputProps={{startAdornment, endAdornment}}
    />
}

export default InputWithValidation;