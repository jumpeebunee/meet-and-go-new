import { FC } from "react";

import cl from "./SearchButton.module.scss";

interface SearchButtonProps {
  isSearch: boolean;
  setIsSearch: (arg: boolean) => void;
}

const SearchButton: FC<SearchButtonProps> = ({ isSearch, setIsSearch }) => {
  return (
    <button
      onClick={() => setIsSearch(!isSearch)}
      className={isSearch ? cl.Button : `${cl.Button} ${cl.ButtonClose}`}
    >
      <span></span>
    </button>
  );
};

export default SearchButton;
