import React, {useContext} from 'react';
import { ColorSchemaContext } from "../context/ColorSchemaContext";
import UU5 from 'uu5g04';

function ColorSchemaChanger(){

    const { colorSchema, setColorSchema } = useContext(ColorSchemaContext);
    const handleClick = (e) => {
      // alert(e.value)
       setColorSchema(e.value)
    }
    return (
      <UU5.Forms.Select value={colorSchema} onChange={(e) => handleClick(e)}>
        <UU5.Forms.Select.Option value="blue" />
        <UU5.Forms.Select.Option value="red" />
        <UU5.Forms.Select.Option value="green" />
      </UU5.Forms.Select>
    );
}
export { ColorSchemaChanger };
