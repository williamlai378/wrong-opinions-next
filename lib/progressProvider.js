'use client'
import { useEffect, useState } from "react";


const ProgressProvider = (props) => {
    const [value, setValue] = useState(props.valueStart);


    useEffect(() => {
        setValue(props.valueEnd);
    }, [props.end])

    return props.children(value);
}

export default ProgressProvider;
