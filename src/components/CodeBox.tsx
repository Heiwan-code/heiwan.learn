import gsap from 'gsap'
import React, { ChangeEvent, useEffect, useState } from 'react'
import CodeGroup from './CodeGroup'
import HintsBox from './HintsBox'

interface CodeBoxProps {
  hint: string
  codeGroups: ICodeGroup,
  onChange: Function,
  onDone: Function
}

const CodeBox: React.FC<CodeBoxProps> = ({
  hint,
  codeGroups, 
  onChange, 
  onDone}) => {
  useEffect(() => {
    gsap.to('.code-box', {
      width: '100%',
      duration: 1.5
    })
  })

  return (
    <div className="code-box">

      <HintsBox hint={hint}></HintsBox>

      { codeGroups?
      Object.entries(codeGroups).map
      (([inputGroupSlug, inputGroupTasks]) => {
        

          return (
            <>
          <CodeGroup 
            key={inputGroupSlug}
            tasks={inputGroupTasks}
            onChange={
              (newStyles: string, selector: string) => 
                onChange(newStyles, selector)}
            onDone={onDone}
            ></CodeGroup>
            </>)
            
        })
        : ''
      }
      
    </div>
  )
}

export default CodeBox;