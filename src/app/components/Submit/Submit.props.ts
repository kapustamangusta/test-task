import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface SubmitProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	submissionTime: string | null

}
