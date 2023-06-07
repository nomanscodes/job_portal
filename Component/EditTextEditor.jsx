/* eslint-disable @next/next/no-assign-module-variable */
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const RichTextEditor = dynamic(() => import("react-rte"), { ssr: false });

const MyStatefulEditorEdit = ({ onChange, data }) => {
    const [value, setValue] = useState();

    const router = useRouter();
    useEffect(() => {
        const importModule = async () => {
            const module = await import("react-rte");
            setValue(module.createEmptyValue());
        };
        importModule();
    }, [router.pathname]);

    const handleOnChange = (value) => {
        setValue(value);
        if (onChange) {
            onChange(value.toString("html"));
        }
    };
    if (!value) {
        return null;
    }

    return <RichTextEditor value={value} onChange={handleOnChange} />;
};

MyStatefulEditorEdit.propTypes = {
    data: PropTypes.string,
    onChange: PropTypes.func,
};

export default MyStatefulEditorEdit;