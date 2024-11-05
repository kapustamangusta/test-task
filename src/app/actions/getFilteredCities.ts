import { City } from "../interfaces/City.interface";
export async function getCities(): Promise<City[]> {
	try {
		const response = await fetch(process.env.API_URL+ "/api/cities");
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
		console.log(filteredCities)
		return filteredCities;
	} catch (error) {
		console.error('Ошибка при загрузке городов:', error);
		return [];
	}
};