import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface PhoneFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText: string,
	error?: string,

}
