import React, {createContext, useState} from 'react';

const FilterContext = createContext();

function FilterProvider(props){
  
    const [filter, setFilter] = useState();

   
    return (
      <div>
        <FilterContext.Provider value={{ filter, setFilter }}>
          {props.children}
        </FilterContext.Provider>
      </div>
    );
}

export {FilterContext, FilterProvider}