import { Select, SelectItem, Text } from '@tremor/react';
import { SelectProps } from './BuySellFormType';

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

export default BuySellSelect;