import { useState } from "react";

interface SearchBarProps {
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearchTermChange}) => {
  const [term, setTerm] = useState("");

  /**
   * Function that is being called every time the input has been changed
   * @param {*} term
   */
  const handleInputChange = (value: string) => {
    setTerm(value);
    onSearchTermChange(value);
  }

  return (
    <div className="search-bar">
      <input
        value={term}
        onChange={(event) => handleInputChange(event.target.value)}
      />
    </div>
  );
  }

export default SearchBar;
