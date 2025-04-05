import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the type for the props
interface BeautifulSearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const BeautifulSearchInput: React.FC<BeautifulSearchInputProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState<string>("");

  // Handle the search event
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-input-container">
        <i className="bx bx-search search-icon"></i>
        <input
          type="search"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
      </div>

      <style>{`
        .search-form {
          width: 100%;
          max-width: 500px;
        }
        .search-input-container {
          display: flex;
          align-items: center;
          background-color: #000000;
          border-radius: 50px;
          padding: 8px 16px;
          box-shadow: 0 0 0 2px #f5f5f5;
          transition: all 0.3s ease;
        }
        .search-icon {
          color: #fff;
          margin-right: 8px; 
        }
        .search-input {
          flex-grow: 1;
          border: none;
          background: transparent;
          font-size: 16px;
          outline: none;
          color: #fff;
        }
        .search-input::placeholder {
          color: #999;
        }
      `}</style>
    </form>
  );
};

export default BeautifulSearchInput;
