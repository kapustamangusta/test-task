import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectFieldProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	labelText: string,
	error?: string,
	items: string[]

}
