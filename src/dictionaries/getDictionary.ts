import en from './en.json'
import es from './es.json'

export type Locale = 'en' | 'es'
 
const dictionaries = {
  en,
  es
}
 
export const getDictionary = (locale: Locale) => dictionaries[locale]