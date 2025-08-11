import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const CustomSelect = () => {
  return;
  <Select defaultValue={[options[1]]} isMulti name='colors' options={options} className='basic-multi-select' classNamePrefix='select' />;
};
export default CustomSelect;
