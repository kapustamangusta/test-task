"use client"
import styles from './styles/Home.module.scss';
import { Form } from './components/Form/Form';
import { useEffect, useState } from 'react';

export default function Home() {
  const [greetingName, setGreetingName] = useState('Человек');

  // Используем useEffect для загрузки имени из LocalStorage
  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setGreetingName(savedName);
    }
  }, []);

  return (


    <Form />


  );
}
