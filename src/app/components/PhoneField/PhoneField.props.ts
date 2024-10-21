import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface PhoneFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	htmlFor: string,
	labelText: string,
	error?: string,
	mask: string | (string | RegExp)[],

}
