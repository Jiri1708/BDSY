import React, {createContext, useState} from 'react';

const ColorSchemaContext = createContext();

function ColorSchemaProvider(props){
  
    const [colorSchema, setColorSchema] = useState("blue");

   
    return (
      <div>
        <ColorSchemaContext.Provider value={{ colorSchema, setColorSchema }}>
          {props.children}
        </ColorSchemaContext.Provider>
      </div>
    );
}

export {ColorSchemaContext, ColorSchemaProvider}