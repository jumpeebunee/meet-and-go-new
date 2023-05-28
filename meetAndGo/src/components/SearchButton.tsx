import { FC } from 'react'
import cl from '../styles/SearchButton.module.scss'

interface SearchButtonProps {
  isSearch: boolean;
  setIsSearch: (arg: boolean) => void;
}

const SearchButton:FC<SearchButtonProps> = ({isSearch, setIsSearch}) => {
  return (
    <button onClick={() => setIsSearch(!isSearch)} className={isSearch ? cl.searchButton : `${cl.searchButton} ${cl.searchButtonClose}`}>
      <span></span>
    </button>
  )
}

export default SearchButton