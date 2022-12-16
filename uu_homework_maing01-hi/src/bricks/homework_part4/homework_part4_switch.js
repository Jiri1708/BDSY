import React, {useContext} from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import UU5 from 'uu5g04';

function SchemaSwitch(){

    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const handleClick = () => {
        toggleDarkMode();
    }
    return (
        <UU5.Bricks.Button onClick={handleClick}>
            Test
        </UU5.Bricks.Button>
    )
}
export {SchemaSwitch};
