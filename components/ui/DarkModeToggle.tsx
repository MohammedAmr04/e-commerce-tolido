"use client"
import { Switch } from 'antd';
import { useDarkLightContext } from '../services/context/DarkLightProvider';

export default function DarkModeToggle() {
  const { setTheme, isDark } = useDarkLightContext();

  return (
    <Switch
      checked={isDark}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
}