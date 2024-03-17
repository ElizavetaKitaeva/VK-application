import { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Agify.css';
import { useMutation } from '@tanstack/react-query';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Заполни поле для имени")
    .matches(/^[A-Za-z ]*$/, 'Поле может иметь только буквы латинского алфавита')
});

const names: string[] = [];

type FormInput = {
  name: string;
}

const Agify = () => {
  const [age, setAge] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { register, handleSubmit, formState: {errors}, control, watch} = useForm<FormInput>(
    {
      defaultValues: { name: "" },
      resolver: yupResolver(schema)
    }
  );

  useEffect(() => {
    let timer = 0;
    const subscription = watch(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
          handleSubmit(onSubmit)();
      }, 3000);
    });
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);


  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const controller = new AbortController();
      const response = fetch(`https://api.agify.io?name=${name}`, {signal: controller.signal});
      return response;
    },
    onSuccess: async (response) => {
      if (!response.ok) { 
        setError('Число заспросов превышено');
      } else {
        const info = await response.json();
        if (!info.age) { 
          setError('Нет такого имени'); 
        }
        setAge(info.age);
      }
    }
  })

  function clearOutput() {
    setError('');
    setAge('');
  }

  const onSubmit = ({name} : {'name': string}): void => {
    if (name && !names.includes(name)) {
      setValue(''); 
      names.push(name);
      mutation.mutate(name);
    } else {
      setError('Нельзя использовать одно имя дважды');
    }
  }

  return (
    <div className='agify-block'>
      <form className='agify-form' onSubmit={(event) => {event.preventDefault(); handleSubmit(onSubmit)();}}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: {onChange} }) => (
            <Input 
              onChange={onChange}
              setValue={setValue}
              value={value}
              label="name" 
              register={register} 
              placeholder="Введи своё имя" 
              className='agify-form__input' 
              clearOutput={clearOutput}
            />
          )}
        />
        <Button className='agify-form__button' name='Отправить'/>
      </form>
      <h2 className='agify-form__answer'>{ errors.name?.message || age || error }</h2>
    </div>
  );
}
  
export default Agify 