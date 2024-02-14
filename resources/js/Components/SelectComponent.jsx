import { router } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export default function SelectComponent({ setSelect, bd }) {
  const [optionSelect, setOptionSelect] = useState('') //para guardar la opción escogida  
  const title = [];
  const content = [];
  console.log(bd);
  bd.map((elem) => { title.push({ value: elem.title, label: elem.title }) && content.push({ value: elem.content, label: elem.content }) })

  const groupedOptions = [
    {
      label: 'title',
      options: title
    },
    {
      label: 'content',
      options: content
    }
  ];

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  const handlerChange = (e) => {
    const { value } = e;
    setOptionSelect(value)
  }

  
    useEffect(() => {
      if(optionSelect.length>0){
          router.visit(route('posts.search',optionSelect),{
              method:'get',
              onSuccess:(res)=>console.log(res),
              only:['posts'],
              preserveState:true            
              
          })
          // fetch(route('posts.search', select))
          //     .then(res =>res.json())
          //     .then(data=>setPosts(data.data)) 
          //     .catch(error => console.error(error))
      }
      
  },[optionSelect])

 

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder={'Seleccione nombre de parcela'}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        onChange={handlerChange}
      />

    </div>
  );
}
