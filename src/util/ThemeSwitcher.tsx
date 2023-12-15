import React from 'react';
import { Switch } from '@mui/material';

type ThemeSwitcherProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

function ThemeSwitcher({ darkMode, toggleDarkMode }: ThemeSwitcherProps) {
  return <Switch checked={darkMode} onChange={toggleDarkMode} />;
}

export default ThemeSwitcher;
