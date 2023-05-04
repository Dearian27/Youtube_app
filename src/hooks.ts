import { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useTheme = () => {
//   const [darkMode, setDarkMode] = useState<string | boolean>(localStorage.getItem('darkMode') || 'false');
//   setDarkMode(Boolean(darkMode));
//   // useLayoutEffect(() => {
//   //   document.documentElement.setAttribute("data-darkMode", String(darkMode));
//   //   localStorage.setItem('darkMode', String(darkMode));
//   // }, [darkMode])
//   return { darkMode, setDarkMode };
// }