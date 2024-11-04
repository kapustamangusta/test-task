import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText: string,
	error?: string,

}
