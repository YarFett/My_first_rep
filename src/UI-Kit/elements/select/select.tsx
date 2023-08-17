import * as React from "react";
import Select from 'react-select';
import './select.css'

interface SelectProps {
  label: string;
  placeholder: string;
  options: any;
  onClick?: (event: any) => void;
}


export class CustomSelect extends React.Component<SelectProps> {

  render() {
    // const value = () => {
    //   console.log(errp)
    //   return errp ? this.props.options.find(c => c.value === view) : ' '
    // }

    return(
      <div className="select-box">
        <p className="select-box__label">{this.props.label}</p>
        <Select
          // onChange={(val) => {
          //   const _val = val
          //   console.log(val)
          // }}
          // value={value}
          options={this.props.options}
          placeholder={this.props.placeholder}
          classNamePrefix="select"
          styles={{
            control: (styles) => ({
              ...styles,
              height: '52px',
              padding: '12px 16px',
              background: '#F5F7FA',
              border: '2px solid #F5F7FA',
              boxShadow: 'none',
              cursor: "pointer",
              '&:hover': {
                borderColor: '#99b1e6',
              },
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isFocused ? '#0D4CD3' : '#86909C',
              transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
              transition: 'all .3s ease',
              '&:hover': {
                color: '#0D4CD3',
              },
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              border: '2px solid #99b1e6',
              borderTop: 'none',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              boxShadow: 'none',
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              padding: '14px 16px',
              cursor: "pointer",
              '&:hover': {
                color: '#0D4CD3',
              },
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    )
  }
}
