import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../components/useDarkSide";

export default function Switcher() {
	const [colorTheme, setTheme] = useDarkSide(); 
	const [darkSide, setDarkSide] = useState(
		colorTheme === "dark" ? true : false
	);
    const defaultProperties = {
		dark: {
		  circle: {
			r: 9,
		  },
		  mask: {
			cx: '50%',
			cy: '23%',
		  },
		  svg: {
			transform: 'rotate(40deg)',
		  },
		  lines: {
			opacity: 1,
		  },
		},
		light: {
		  circle: {
			r: 5,
		  },
		  mask: {
			cx: '100%',
			cy: '0%',
		  },
		  svg: {
			transform: 'rotate(90deg)',
		  },
		  lines: {
			opacity: 1,
		  },
		},
		springConfig: { mass: 4, tension: 250, friction: 35 },
	  };
	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkSide(checked); 
	};

	return (
		<>
			<DarkModeSwitch
				checked={darkSide}
				onChange={toggleDarkMode}
				size={20}
			/>
		</>
	);
}
