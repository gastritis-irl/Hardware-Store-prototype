import React from 'react';
import { Switch } from '@mui/material';

type ThemeSwitcherProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => (
  <Switch checked={darkMode} onChange={toggleDarkMode} />
);

export default ThemeSwitcher;
