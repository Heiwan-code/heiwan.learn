import gsap from 'gsap'
import React, { ChangeEvent, useEffect, useState } from 'react'

import {
    Autocomplete,
    AutocompleteItem
  } from "@nextui-org/react";

interface CodeInputProps extends ICodeLine {
    onCodeChange: (newVal: string, slug: string) => void,
    onDone: Function,
}

const CodeInput: React.FC<CodeInputProps> = (
    {
        slug, 
        property,
        prefix, 
        startValue,
        desiredVal, 
        suffix,
        suggestions,
        cancels,
        clearPrev,
        indicator,
        onCodeChange,
        onDone
    }) => {
    const [value, setValue] = useState(prefix + startValue + suffix);

    useEffect(() => {
        gsap.fromTo(".code-input", {
                opacity: 0,
                translateX: -100
            }, {
                opacity: 1,
                translateX: 0,
                duration: 0.89
            }
        )
    }, [slug])

   

    function changeInput(val:string) {
        const suffixLength = suffix.length;
        const lengthWithoutUnit = val.length - suffixLength
        
        const valueWithoutUnit = 
            val.substring(0, lengthWithoutUnit)
        const prefixLength = 
            prefix.length
        
        const justValue = 
            valueWithoutUnit.substring(
                prefixLength, 
                valueWithoutUnit.length
            )
        console.log(prefix + justValue + suffix);
        console.log(property + val);
        
        
        
        onCodeChange(property + val, slug)
        setValue(prefix + justValue + suffix)
        checkVal(justValue);
    }
    
    function changeInputRegular(e : React.FormEvent<HTMLInputElement>) {
        const val = e.currentTarget.value
        changeInput(val)
    }

    function onSelect(e: React.FormEvent<HTMLInputElement>) {
        const t = e.currentTarget
        const val = t.value
        const suffixLength = suffix.length;
        const lengthWithoutSuffix = val.length - suffixLength
        const prefixLength = prefix.length

        if (t.selectionStart? t.selectionStart > 
        lengthWithoutSuffix : '')
            e.currentTarget.setSelectionRange
            (lengthWithoutSuffix,lengthWithoutSuffix)
        else if (t.selectionStart? t.selectionStart < 
        prefixLength : '') 
            e.currentTarget.setSelectionRange
            (prefixLength,prefixLength)
            
    }

    function checkValMultiple(currentVal: string) {
        const valuesArray = desiredVal as string[]
        valuesArray.forEach((val) => {
            if (currentVal == val) {
                onDone(slug)
            }
        })
    }

    function recolorIndicator () {
        // const dist =  
    }

    function checkVal(currentVal: string) {
        if (Array.isArray(desiredVal))
            checkValMultiple(currentVal)
        else {
            (currentVal == desiredVal) &&
                onDone(slug)
        }
    }
  
    return (
        <div className={`code-input ${slug}`}>
            <div className="wrapper">

                <label htmlFor={`codeInput-${slug}`}>
                    {slug == "text-01" ? 
                    (<em> {property} </em>) : 
                    property }
                </label>
                {
                suggestions? (
                    <Autocomplete
                        className={`no-style h-auto ${slug == "text-01" && 'bold'}`}
                        inputValue={value}
                        defaultInputValue={startValue}
                        disableAnimation
                        variant="underlined"
                        allowsCustomValue
                        onInputChange={changeInput}

                    >
                    {suggestions.map((suggestion) => (
                    <AutocompleteItem 
                        key={suggestion.value} 
                        value={suggestion.value}>
                            {suggestion.label}
                    </AutocompleteItem>
                    ))}
                </Autocomplete>
                ) : (
                <input
                    type="text"
                    className={`${slug == "text-01" && 'bold'}`}
                    value={value}
                    onSelect={onSelect}
                    onChange={changeInputRegular} 
                    name={`codeInput-${slug}`}
                    id={`codeInput-${slug}`}
                    />
                )
                }
            </div>
            {
                indicator && (
                    <div className='code-input__indicator'>
                    </div>
                )
            }
            
            
        </div>
    )
}

export default CodeInput;