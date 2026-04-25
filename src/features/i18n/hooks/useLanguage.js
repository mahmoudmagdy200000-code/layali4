import { useContext } from 'react';
import { I18nContext } from '../context/I18nContext';

export const useLanguage = () => useContext(I18nContext);
