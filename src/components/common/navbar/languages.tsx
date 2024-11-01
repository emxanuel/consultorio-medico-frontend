import SpanishFlag from "../flags/spanish"
import EnglishFlag from "../flags/english"
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react"
import { useParams, usePathname } from "next/navigation"

const languages = [
  {
    name: 'Español',
    prefix: 'es',
    flag: <SpanishFlag />
  },
  {
    name: 'English',
    prefix: 'en',
    flag: <EnglishFlag />
  }
]

export default function Languages() {
  const params = useParams()
  const pathname = usePathname()
  const currentLang = params.lang

  const currentLanguage = languages.find(lang => lang.prefix === `${currentLang}`)
  
  const changeLanguage = (lang: string) => {
    const pathParts = pathname.split('/')
    pathParts[1] = lang
    const newUrl = pathParts.join('/')
    window.location.href = newUrl
  }
  
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <div>
            {currentLanguage?.flag}
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          {languages.map(lang => (
            <DropdownItem key={lang.prefix} onClick={() => changeLanguage(lang.prefix)}>
              <div className="flex gap-2 items-center">
                {lang.flag}
                {lang.name}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}