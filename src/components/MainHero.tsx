// import { useState } from 'react'

import { useEffect, useState } from "react"
import Dots from "./Dots"
import StageBox from "./StageBox"
import CodeBox from "./CodeBox"
import ReadTask from "./ReadTask"

export default function MainHero() {
    const [stageSlugs, setStageSlugs] = useState<string[]>([]);
    const [dotsAreFinished, setAreDotsFinished] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [highlightClass, setHighlightClass] = useState('')
    const [currentTasks, setCurrentTasks] = 
        useState<ICodeTask>()
    const [currentStage, setCurrentStage] = 
        useState<number | null>(null)
    const [currentStageSlug, setCurrentStageSlug] = useState('')
    const [currentElements, setCurrentElements] = 
        useState<ICodeElement>({});
    

    useEffect(() => {
        
        currentStage != null &&
            setCurrentStageSlug(stageSlugs[currentStage])
    }, [currentStage, stageSlugs])
    

    function finishDotsStage() {
        setAreDotsFinished(true)
        setKeyword('frustrating')
        setHighlightClass('frustrating')
        setCurrentStage(0)
    }

    function getNextSlug() {
        currentStage != null &&
            setCurrentStage(currentStage + 1)
    }

    function getStageSlugs(data: string[]) {
        setStageSlugs(data);
    }

    function getTask(data: ICodeTask) {
        const task = data
        setCurrentTasks(task);
        setKeyword(task.keyword)
        setHighlightClass(task.highlightClass)

        const allTaskElements: ICodeElement = {}

        Object.entries(task.codeGroups).map
        (([inputGroupSlug, inputGroupTasks]) => {
            inputGroupTasks.forEach((task: ICodeLine) => {
                if (!task)
                    return
                const element = 
                    ( document.querySelector(task.elementQ) as HTMLElement)
                element ? allTaskElements[inputGroupSlug] = element : ''
            });
        });
        setCurrentElements(allTaskElements)
    }

    function applyNewStyle(newStyle: string, selector: string) {
        if (!currentElements)
            return
        const elementToStyle = currentElements[selector]
        if (!elementToStyle)
            return
        elementToStyle.style.cssText = newStyle
    }
    
  return (
    <div className='main-hero' style={currentTasks ? currentTasks.areaStyles: {}}>
        {
            <ReadTask
                passStageSlugs={getStageSlugs}
                slug={currentStageSlug} 
                passTasks={getTask}
            ></ReadTask>
        }
        <h1 className='main-hero__text'>Coding is
            <Dots 
                keyword={keyword} 
                highlightClass={highlightClass}
                dotsDone={finishDotsStage} 
                dotCount={3}
            ></Dots>
        </h1>
        { dotsAreFinished && currentTasks && (
            <CodeBox
                hint={currentTasks.hint}
                codeGroups={currentTasks.codeGroups}
                onChange={applyNewStyle}
                onDone={getNextSlug}
            ></CodeBox>
        )}
        { (currentStage != null && currentStage >= 3) && (
            <StageBox
                targetStyles={currentTasks?.targetStyles ? 
                currentTasks.targetStyles: {}}
                boxStyles={currentTasks?.boxStyles ? 
                currentTasks.boxStyles : {}}
            ></StageBox>
        )}
        
        {currentStage}
        {currentStageSlug}
    </div>
  )
}
