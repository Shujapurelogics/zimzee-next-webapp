import { useState, useEffect } from "react";

export default function useDarkSide() {
	const [theme, setTheme] = useState( typeof window !== "undefined" ? localStorage.theme : "light");
	const colorTheme = theme === "dark" ? "light" : "dark";

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);
		if (typeof window !== 'undefined'){
			localStorage.setItem('theme', theme);
		}
		window.dispatchEvent(new Event("storage"));
	}, [theme, colorTheme]);

	return [colorTheme, setTheme]
}
