import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface CheckboxFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	htmlFor: string,
	labelText: string,
	error?: string,
	labelCheckbox:string,

}