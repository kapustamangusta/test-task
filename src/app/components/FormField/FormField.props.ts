import { ReactNode } from "react";

export interface FromFieldProps {
	label?: string,
	htmlFor?: string,
	required?: boolean,
	error?: string
	children: ReactNode

}
