
import { Card, NumberInput, Button, Select, SelectItem} from "@tremor/react";
import React, { useReducer } from 'react';

interface FromState {
  timeSeries: string;
  symbol: string;
  amount: number;
  buyRate: number;
  sellRate: number;
};

type FormAction = { type: "HANDLE FORM INPUT", field: string, payload: string | number };
type FormEventHandler<T> = (event: T) => void;

const formReducer = (state: FromState, action: FormAction) => {
  switch (action.type) {
    case "HANDLE FORM INPUT":
      console.log('SWITHC')
      return {
        ...state,
        [action.field]: action.payload
      };
    default: 
      return state;
  };
};

const initialFormState = {
  symbol: 'IBM',
  timeSeries: '',
  buyRate: 0,
  sellRate: 0,
  amount: 0,
};

const BuySellForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: 'HANDLE FORM INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  };
  const handleSubmit: FormEventHandler<React.FormEvent<HTMLFormElement>> = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <Card className="max-w-xs mx-auto">
      <form onSubmit={handleSubmit}>
        <BuySellSelect 
          dispatcher={dispatch} 
          formData={formState}
          selectItems={[
            { itemValue: 'IBM', displayValue: 'IBM'}
          ]} 
          selectName= 'symbol' 
          placeholder='Select your stock'
        />
        <BuySellSelect 
          dispatcher={dispatch} 
          formData={formState}
          selectItems={[
            { itemValue: 'DAILY', displayValue: 'Daily'},
            { itemValue: 'WEEKLY', displayValue: 'Weekly'},
            { itemValue: 'MONTHLY', displayValue: 'Month'}
          ]} 
          selectName= 'timeSeries' 
          placeholder='Select your time period'
        />
        <NumberInput 
          placeholder="Enter amount to invest" 
          name= 'amount'
          onChange={handleFormChange}
        />
        <NumberInput 
          placeholder="Enter rate to buy (0.1 buy stock if price increase 10% from last period)" 
          enableStepper={true} 
          name="buyRate"
          onChange={handleFormChange}
        />
        <NumberInput 
          placeholder="Enter rate to sell (0.1 sell stock if price drops 10% from last period)" 
          enableStepper={true} 
          name="sellRate"
          onChange={handleFormChange}
        />
        <Button type="submit" size='lg'>Calculate profit</Button>
      </form>
    </Card>
  );
};

interface SelectItem {
  itemValue: string;
  displayValue: string;
};
interface SelectProps<AllowedSelect> {
  dispatcher: React.Dispatch<FormAction>;
  selectItems: SelectItem[];
  selectName: AllowedSelect;
  placeholder: string;
  formData: FromState;
};
const BuySellSelect = ({ dispatcher, formData, selectItems, selectName, placeholder}: SelectProps<'timeSeries' | 'symbol'>) => {
  const handleFormChange = (value: string) => {
    dispatcher({
      type: 'HANDLE FORM INPUT',
      field: selectName,
      payload: value
    });
  };
  return (
    <>
      <Select placeholder={placeholder} value={formData[selectName]} onValueChange={handleFormChange}>
        {selectItems.map((item, key)=> { 
          return <SelectItem key={key} value={item.itemValue}>{item.displayValue}</SelectItem>;
        })}
      </Select>
    </>
  );
};

export default BuySellForm;