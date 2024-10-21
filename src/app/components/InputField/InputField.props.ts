import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	htmlFor: string,
	labelText: string,
	error?: string,

}
