import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function wait(time: number) {
    return new Promise((res) => setTimeout(() => res(time), time));
}

type ContactImage = {
    initial: string;
    color: string;
};

export function getContactImage(name: string): ContactImage {
    const initial = name.split("")[0].toUpperCase();

    const randomColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;

    return { initial, color: randomColor };
}
