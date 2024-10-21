import { NextResponse } from 'next/server';
import cities from './data/cities.json';
import { City } from '@/app/interfaces/City.interface';

export async function GET() {

	const citiesList: City[] = cities.map((cityJson) => {
		const city: City = {
			city: cityJson.city,
			population: Number(cityJson.population) // Преобразование строки в число
		};
		return city;
	});

	return NextResponse.json(citiesList);
}