'use client'

import { createPortal } from "react-dom"
import {useState, useLayoutEffect} from 'react'

const createWrapper = (wrapperId) => {
    if(!document) return null
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}


function ReactPortal({children, wrapperId='react-portal-wrapper'}) {
    const [wrapperElement, setWrapperElement] = useState(null);
    
    
    useLayoutEffect(() => {
        console.log('layout effect is running')
        let element = document.getElementById(wrapperId);
        
        //flag to determine when to clean up the wrapper element/div
        let isCreated = false;

        // if element isn't found with wrapperId, create and append it to the document
        if(!element) {
            isCreated = true;
            element = createWrapper(wrapperId);
        }

        setWrapperElement(element);

        return () => {
            if(isCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    if(wrapperElement === null) return null;
    
    return createPortal(children, wrapperElement)
}

export default ReactPortal;