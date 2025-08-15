    import React, { useState } from 'react';

    interface searchBarProps {
      onSearch: (searchTerm: string) => void;
    }

    function SearchBar({ onSearch }: searchBarProps) {
      const [searchTerm, setSearchTerm] = useState('');

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
      };

    return (
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
    );
  }

    export default SearchBar;