export interface FromState {
    timeSeries: string;
    symbol: string;
    amount: number;
    buyRate: number;
    sellRate: number;
};

export type FormAction = { type: "HANDLE FORM INPUT", field: string, payload: string | number };
export type FormEventHandler<T> = (event: T) => void;

export interface SelectChildren {
    itemValue: string;
    displayValue: string;
};

export interface SelectProps<AllowedSelect> {
    dispatcher: React.Dispatch<FormAction>;
    selectItems: SelectChildren[];
    selectName: AllowedSelect;
    placeholder: string;
    formData: FromState;
    textName: string;
};
