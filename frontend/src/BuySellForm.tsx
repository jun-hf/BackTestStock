
import { Card, NumberInput, Button, Select, SelectItem, Legend, Text } from "@tremor/react";
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
    <Card className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <BuySellSelect 
          textName="Symbol:"
          dispatcher={dispatch} 
          formData={formState}
          selectItems={[
            { itemValue: 'IBM', displayValue: 'IBM'}
          ]} 
          selectName= 'symbol' 
          placeholder='Select your stock'
        />
        <BuySellSelect 
          textName="Time Series:"
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
        <Text className="text-left mb-1">Amount:</Text>
        <NumberInput 
          className="my-2"
          placeholder="Enter amount to invest" 
          name= 'amount'
          onChange={handleFormChange}
          min={0}
        />
        <div className="my-2">
          <Text className="text-left pb-1">Buy Rate:</Text>
            <NumberInput 
              placeholder="Enter rate to sell" 
              enableStepper={true} 
              name="buyRate"
              onChange={handleFormChange}
              min={0}
            />
            <Legend colors={["green"]} categories={["Insert 0.1 = buy stock when price increase 10% from last period"]}/>
        </div>
        <div className="my-2">
          <Text className="text-left pb-1">Sell Rate:</Text>
          <NumberInput 
            placeholder="Enter rate to sell" 
            enableStepper={true} 
            name="sellRate"
            onChange={handleFormChange}
            min={0}
          />
          <Legend colors={["red"]} categories={["Insert 0.05 = sell stock when price drops 5% from last period"]}/>
        </div>
        <div className='flex items-center justify-center'>
          <Button className='bg-blue-500 text-white px-4 py-2 rounded' type="submit" size='lg'>Calculate profit</Button>
        </div>
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
  textName: string;
};
const BuySellSelect = ({ dispatcher, formData, selectItems, selectName, placeholder, textName}: SelectProps<'timeSeries' | 'symbol'>) => {
  const handleFormChange = (value: string) => {
    dispatcher({
      type: 'HANDLE FORM INPUT',
      field: selectName,
      payload: value
    });
  };
  return (
    <>
      <Text className="text-left mb-1">{textName}</Text>
      <Select className="my-2" placeholder={placeholder} value={formData[selectName]} onValueChange={handleFormChange}>
        {selectItems.map((item, key)=> { 
          return <SelectItem key={key} value={item.itemValue}>{item.displayValue}</SelectItem>;
        })}
      </Select>
    </>
  );
};

export default BuySellForm;