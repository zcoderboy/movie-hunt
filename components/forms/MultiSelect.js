import React from 'react';
import Select, { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableSelect = SortableContainer(Select);

// Custom select2 styles
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ddd',
    backgroundColor: state.isSelected ? '#eeeeee' : '#fff',
    color: '#000',
    fontSize: '14',
    padding: 10
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: '4px',
    boxShadow: 0,
    padding: '.3rem',
    border: state.isFocused ? '1px solid #F97B2F' : '1px solid #ced4da',
    '&:hover': {}
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#000'
  })
};

export default function MultiSelectSort({ data, selected, setSelected, placeholder }) {
  const onChange = (selectedOptions) => setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
  };

  return (
    <SortableSelect
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      styles={customStyles}
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      isMulti
      options={data}
      placeholder={placeholder}
      value={selected}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue
      }}
      closeMenuOnSelect={false}
    />
  );
}
