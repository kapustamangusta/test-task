"use client";

import styles from './/Form.module.scss';
import { useEffect, useState } from 'react';
import { CheckboxField, InputField, PhoneField, SelectField, Submit } from '..';
import { FormProps } from "./Form.props";
import { City } from "@/app/interfaces/City.interface";


export const Form = ({ setGreetingName }: FormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		city: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		agree: false,
	});

	const [errors, setErrors] = useState({
		name: '',
		city: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [cities, setCities] = useState([] as City[]);

	const [submissionTime, setSubmissionTime] = useState<string | null>(null);


	useEffect(() => {
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
		const newErrors: any = {};
		// Проверка обязательных полей
		if (!formData.name)
			newErrors.name = 'Имя обязательно для заполнения';
		else if (!/^[А-Яа-яЁё]{2,}$/.test(formData.name))
			newErrors.name = "Имя должно содержать не менее 2 символов и только буквы кириллицы";


		if (!formData.city) newErrors.city = 'Выберите город';

		// Если выбран чекбокс, email становится обязательным
		if (formData.agree && !formData.email)
			newErrors.email = 'Email обязателен при выборе чекбокса';
		else if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
			newErrors.email = 'Некорректный формат email';
		}

		if (!formData.password)
			newErrors.password = "Укажите пароль";
		else if (!/^[A-Za-z]{6,}$/.test(formData.password))
			newErrors.password = "Пароль должен содержать не менее 6 символов и состоять только из латинских букв";


		// Валидация подтверждения пароля
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Пароли должны совпадать";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
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
			{/* Имя */}

			<InputField
				htmlFor="name"
				labelText="Имя"
				type='text'
				id='name'
				name='name'
				placeholder='Введите имя'
				value={formData.name}
				onChange={handleInputChange}
				error={errors.name}
				required
			/>


			{/* Город */}
			<SelectField
				htmlFor="city"
				labelText='Ваш город'
				items={cities.map((city: City) => city.city)}
				id="city"
				name="city"
				value={formData.city}
				onChange={handleInputChange}
				error={errors.city}
				required
			/>

			<hr className={styles.divider} />



			{/* пароль */}
			<InputField
				htmlFor="password"
				labelText="Пароль"
				type='password'
				id='password'
				name='password'
				placeholder='Введите пароль'
				value={formData.password}
				error={errors.password}
				onChange={handleInputChange}
				required
			/>

			<InputField
				htmlFor="confirmPassword"
				labelText="Пароль еще раз"
				type='password'
				id='confirmPassword'
				name='confirmPassword'
				placeholder='Повторите пароль'
				value={formData.confirmPassword}
				onChange={handleInputChange}
				error={errors.confirmPassword}
				required
			/>

			<hr className={styles.divider} />


			<PhoneField
				htmlFor="phone"
				labelText='Номер телефона'
				placeholder='+7 (999) 999-99-99'
				value={formData.phone}
				onChange={handleInputChange}
				id="phone"
				name="phone"
			/>


			<InputField
				htmlFor="email"
				labelText="Электронная почта"
				type="email"
				id="email"
				name="email"
				value={formData.email}
				onChange={handleInputChange}
				placeholder='Введите почту'
				error={errors.email}
				required={formData.agree}
			/>

			<CheckboxField
				htmlFor={'agree'}
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

