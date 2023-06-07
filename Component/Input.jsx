import React from "react";

const InputText = (props) => {
    const {
        value = "",
        placeholder = "",
        onChange = () => null,
        name = "",
        id = "",
    } = props;
    function triggerOnChangeEvent(e) {
        onChange(e);
    }

    return (
        <input
            type="text"     
            value={value}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={triggerOnChangeEvent}
        />
    );
};

<InputText />;
export default InputText;
