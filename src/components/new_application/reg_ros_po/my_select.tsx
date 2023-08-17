import { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { Url } from 'url';

export interface Errp{
    id: number,
    service_name: string,
    alternative_service_name: string,
    class_service: string,
    code_service: string,
    date_out: null,
    website_service: Url,
    vision: string,
    hearing: string,
    pp325: string,
    producer: string,
    short_producer: string,
    status_producer: string,
    inn: number,
    ogrn: number,
    patent: string,
    number_inclusion_registry: number,
    date_inclusion_registry: string,
    website_inclusion: Url,
    number_inclusion: number,
    date_inclusion: string
  }

function SelectErrp () {
    
    const [errp, setERRP] = useState(null)
    const [view, setView] = useState(null)

    const [errpData, setErrpData] = useState<Errp>()

    const [idErrp, setIdErrp] = useState('')
    const [name, setName] = useState('')
    const [producer, setProducer] = useState('')
    const [version, setVersion] = useState('')
    const [classPo, setClassPo] = useState('')

    const handleInputId = (newValue: any) => {
        setIdErrp(newValue.value);
      };

    const handleViewERRP = (newValue: any) => {
        setERRP(newValue.value);
      };
    const json_errp = [{ value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' }]
    const getValueERRP = () => {
    console.log()
    return idErrp ? json_errp.find(c => c.value === view) : ' '
    }

    const getDataFromErrp = async () => {
        try{
          const url = `http://localhost:8000/api/services/software_reg/${idErrp}/`
          const response = await fetch(url);
          const newData = await response.json();
          setErrpData(newData);
          setIdErrp(`${newData?.id}`)
          setName(`${newData?.service_name}`)
          setProducer(`${newData?.producer}`)
          setVersion(`${newData?.number_inclusion_registry}`)
          setClassPo(`${newData?.class_service}`)
          console.log(newData)
          
        }catch (error){
          if (error){
            setName('')
            setProducer('')
            setVersion('')
            setClassPo('')
            Swal.fire({
              title: '№ не найден',
              text: 'Попробуйте ввести другой №',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          if (idErrp === ''){
            setName('')
            setProducer('')
            setVersion('')
            setClassPo('')
            Swal.fire({
              title: 'Введите №',
              confirmButtonText: 'OK'
            });
          }
          console.error("Вот твоя ошибка", error)
        }
      };

    return(
        <>
        <div>
            <button className="cb-button" onClick={getDataFromErrp}>Показать</button>
        </div>
        <Select
            onChange={handleInputId}
            value={getValueERRP()}
            options={json_errp}
            placeholder='Выберите номер ЕРРП'
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
            menu: (baseStyles, state) => ({
                ...baseStyles,
                border: '2px solid #99b1e6',
                borderTop: 'none',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: 'none',
            }),
            option: (baseStyles, state) => ({
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
            </>
    )

}


export default SelectErrp;