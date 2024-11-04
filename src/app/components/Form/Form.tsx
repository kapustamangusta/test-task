"use client";

import styles from './/Form.module.scss';
import { useEffect, useState } from 'react';
import { CheckboxField, InputField, PhoneField, SelectField, Submit } from '..';
import { City } from "@/app/interfaces/City.interface";
import { z } from "zod";

interface FormData {
	name: string,
	city: string,
	phone: string,
	email: string,
	password: string,
	confirmPassword: string,
	agree: boolean,
}



export const Form = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		city: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		agree: false,
	});

	const [errors, setErrors] = useState<z.ZodFormattedError<{
		name: string,
		city: string,
		email: string,
		password: string,
		confirmPassword: string,
}, string>>({
		_errors: []
	});

	const [cities, setCities] = useState<City[]>([]);

	const [greetingName, setGreetingName] = useState('Человек');


	const [submissionTime, setSubmissionTime] = useState<string | null>(null);


	useEffect(() => {
		const savedName = localStorage.getItem('username');
		if (savedName) {
			setGreetingName(savedName);
		}

		const fetchCities = async () => {
			try {
				const response = await fetch('/api/cities');
				const cities = await response.json() as City[];

				// Фильтруем города с населением больше 50,000 и сортируем по алфавиту
				let filteredCities = cities
					.filter(city => city.population > 50000)
					.sort((a, b) => a.city.localeCompare(b.city));

				const cityWithMaxPopulation = filteredCities.reduce((prev, current) =>
					prev.population > current.population ? prev : current
				);

				filteredCities = filteredCities.filter(city => city.city !== cityWithMaxPopulation.city);

				filteredCities = [cityWithMaxPopulation, ...filteredCities]
				setCities(filteredCities);
			} catch (error) {
				console.error('Ошибка при загрузке городов:', error);
			}
		};

		fetchCities();
	}, []);



	const validateForm = () => {
		const formSchema = z.object({
			name: z
				.string()
				.min(2, "Имя должно содержать не менее 2 символов")
				.regex(/^[А-Яа-яЁё]{2,}$/, "Имя должно содержать только буквы кириллицы"),
			city: z
				.string()
				.min(1, 'Выберите город'),
			email: z
				.string()
				.email("Некорректный формат email"),
			password: z
				.string()
				.min(6, 'Пароль должен содержать не менее 6 символов')
				.regex(/^[A-Za-z]+$/, 'Пароль должен состоять только из латинских букв'),
			confirmPassword: z.string(),
			agree: z.boolean()
			
		}).refine((data) => data.password === data.confirmPassword, {
			message: "Пароли должны совпадать",
			path: ["confirmPassword"], 
		}).refine((data) => !data.agree  || (data.agree && data.email), {
			message: "Email обязателен при выборе чекбокса",
			path: ["email"],
		});

		const validationResult = formSchema.safeParse(formData);

		if (!validationResult.success){
			setErrors(validationResult.error.format())
			console.log(validationResult.error.format())
		}

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const response = await fetch('/api/submit-form', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				const result = await response.json();
				console.log(result.message);


				// Устанавливаем текущее время как время отправки формы
				const now = new Date();
				setSubmissionTime(formatDate(now));

				setGreetingName(formData.name);

				// Сохраняем имя в LocalStorage
				localStorage.setItem('username', formData.name);

				// Очищаем форму
				setFormData({
					name: '',
					city: '',
					phone: '',
					email: '',
					password: '',
					confirmPassword: '',
					agree: false,
				});

			} catch (error) {
				console.error('Ошибка при отправке формы:', error);
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

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

		return `${formattedDate} в ${formattedTime}`;
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit} noValidate={true}>
			<h1 className={styles.form__title}>Здравствуйте, <span className={styles.name}>{greetingName}</span></h1>
			{/* Имя */}

			<InputField
				labelText="Имя"
				type='text'
				name='name'
				placeholder='Введите имя'
				value={formData.name}
				onChange={handleInputChange}
				error={errors.name?._errors.join(', ')}
				required
			/>


			{/* Город */}
			<SelectField
				labelText='Ваш город'
				items={cities.map((city: City) => city.city)}
				name="city"
				value={formData.city}
				onChange={handleInputChange}
				error={errors.city?._errors.join(', ')}
				required
			/>

			<hr className={styles.divider} />


			{/* пароль */}
			<InputField
				labelText="Пароль"
				type='password'
				name='password'
				placeholder='Введите пароль'
				value={formData.password}
				error={errors.password?._errors.join(', ')}
				onChange={handleInputChange}
				required
			/>

			<InputField
				labelText="Пароль еще раз"
				type='password'
				name='confirmPassword'
				placeholder='Повторите пароль'
				value={formData.confirmPassword}
				onChange={handleInputChange}
				error={errors.confirmPassword?._errors.join(', ')}
				required
			/>

			<hr className={styles.divider} />


			<PhoneField
				labelText='Номер телефона'
				placeholder='+7 (999) 999-99-99'
				value={formData.phone}
				onChange={handleInputChange}
				name="phone"
			/>


			<InputField
				labelText="Электронная почта"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleInputChange}
				placeholder='Введите почту'
				error={errors.email?._errors.join(', ')}
				required={formData.agree}
			/>

			<CheckboxField
				labelText={'Я согласен'}
				labelCheckbox={'принимать актуальную информацию на емейл'}
				name="agree"
				checked={formData.agree}
				onChange={handleInputChange}
			/>


			<Submit
				submissionTime={submissionTime}
			/>
		</form>
	);
};

