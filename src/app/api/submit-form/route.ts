import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const formData = await request.json();
	console.log('Данные формы:', formData);

	// Возвращаем статус 200
	return NextResponse.json({ message: 'Форма успешно отправлена!' }, { status: 200 });
}