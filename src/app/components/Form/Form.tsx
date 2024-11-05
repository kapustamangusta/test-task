"use client";

import styles from './/Form.module.scss';
import { useEffect, useState } from 'react';
import { CheckboxField, InputField, PhoneField, SelectField, Submit } from '..';
import { City } from "@/app/interfaces/City.interface";
import { z } from "zod";
import {SubmitHandler, useForm, useWatch} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from './Form.props';

const formSchema = z.object({
	name: z
		.string()
		.min(2, "Имя должно содержать не менее 2 символов")
		.regex(/^[А-Яа-яЁё]{2,}$/, "Имя должно содержать только буквы кириллицы"),
	city: z
		.string()
		.min(1, 'Выберите город'),
	phone: z.any(),
	email: z
		.string(),
	password: z
		.string()
		.min(6, 'Пароль должен содержать не менее 6 символов')
		.regex(/^[A-Za-z]+$/, 'Пароль должен состоять только из латинских букв'),
	confirmPassword: z.string(),
	agree: z.boolean()

}).refine((data) => data.password === data.confirmPassword, {
	message: "Пароли должны совпадать",
	path: ["confirmPassword"],
}).refine((data) => !data.agree || (data.agree && data.email), {
	message: "Email обязателен при выборе чекбокса",
	path: ["email"],
}).refine((data) => !data.agree ||( data.agree && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)), {
	message: "Введите корректный email",
	path: ["email"],
});



type FormData = z.infer<typeof formSchema>;



export const Form = ({cities}: FormProps) => {
	const { register, handleSubmit, formState: { isSubmitting, errors, }, control, reset } = useForm<FormData>({
			resolver: zodResolver(formSchema),
		}
	);

	const agree = useWatch({control, name: 'agree'});

	const onSubmit: SubmitHandler<FormData> = async (data)=>{
		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();
			console.log(result.message);


			// Устанавливаем текущее время как время отправки формы
			const now = new Date();
			setSubmissionTime(formatDate(now));

			setGreetingName(data.name);

			// Сохраняем имя в LocalStorage
			localStorage.setItem('username', data.name);

			// Очищаем форму
			reset();

		} catch (error) {
			console.error('Ошибка при отправке формы:', error);
		}
	}


	const [greetingName, setGreetingName] = useState('Человек');

	const [submissionTime, setSubmissionTime] = useState<string | null>(null);


	useEffect(() => {
		const savedName = localStorage.getItem('username');
		if (savedName) {
			setGreetingName(savedName);
		}
	}, []);



	

	const formatDate = (date: Date): string => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};

		const formattedDate = date.toLocaleDateString('ru-RU', options); 
		const formattedTime = date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		}); 

		return `${formattedDate} в ${formattedTime}`.replace('г.',' ');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
			<h1 className={styles.form__title}>Здравствуйте, <span className={styles.name}>{greetingName}</span></h1>
			{/* Имя */}

			<InputField
				labelText="Имя"
				type='text'
				{...register('name')}
				placeholder='Введите имя'
				error={errors.name && errors.name.message}
				required
			/>


			{/* Город */}
			<SelectField
				labelText='Ваш город'
				items={cities.map((city: City) => city.city)}
				{...register('city')}
				error={errors.city && errors.city.message}
				required
			/>

			<hr className={styles.divider} />


			{/* пароль */}
			<InputField
				labelText="Пароль"
				type='password'
				{...register('password')}
				placeholder='Введите пароль'
				error={errors.password && errors.password.message}
				required
			/>

			<InputField
				labelText="Пароль еще раз"
				type='password'
				{...register('confirmPassword')}
				placeholder='Повторите пароль'
				error={errors.confirmPassword && errors.confirmPassword.message}
				required
			/>

			<hr className={styles.divider} />


			<PhoneField
				labelText='Номер телефона'
				placeholder='+7 (999) 999-99-99'
				{...register('phone')}
			/>


			<InputField
				labelText="Электронная почта"
				type="email"
				{...register('email')}
				placeholder='Введите почту'
				error={errors.email && errors.email.message}
				required={agree}
			/>

			<CheckboxField
				labelText={'Я согласен'}
				labelCheckbox={'принимать актуальную информацию на емейл'}
				{...register('agree')}
			/>


			<Submit
				isSubmiting={isSubmitting}
				submissionTime={submissionTime}
			/>
		</form>
	);
};

