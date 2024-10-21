import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectFieldProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	htmlFor: string,
	labelText: string,
	error?: string,
	items: string[]

}
