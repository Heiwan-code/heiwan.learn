import gsap from 'gsap'
import React, { ChangeEvent, useEffect, useState } from 'react'
import CodeInput from './CodeInput'

interface CodeGroupProps {
  tasks: ICodeLine[],
  onChange: Function,
  onDone: Function
}

const CodeGroup: React.FC<CodeGroupProps> = ({
  tasks, 
  onChange, 
  onDone
}) => {
  const [combinedStyles, setCombinedStyles] = useState({})
  const [tasksCount, setTasksCount] = useState(999)
  const [tasksCompleted, setTasksCompleted] = useState({})

  useEffect(() => {
    let newStyles = ''

    

   
    Object.entries(combinedStyles).map(([key, val]) => {
        console.log(val);
        newStyles+=val + ';';
    })
    console.log("should clear:" + tasks[0].clearPrev);

    
    onChange(newStyles, tasks[0].elementQ)
  }, [combinedStyles]);

  useEffect(() => {
    if (Object.keys(tasksCompleted).length > 0) {
      console.log(tasksCompleted);
      
      const allTasksCompleted = 
        Object.values(tasksCompleted).every(task => task === true);
      console.log(tasksCompleted);
      
      console.log(allTasksCompleted);
  
      setTimeout(() => {
        allTasksCompleted &&
          onDone()
      }, 1200);
    }

  }, [tasksCompleted])

  useEffect(() => {
    if (tasks[0].clearPrev) {
      setCombinedStyles({})
    }
    let newTasksList: {[key: string] : boolean} = {}
    if (Object.keys(tasksCompleted).length > 0)
      newTasksList = {...tasksCompleted}
    tasks.forEach((task: ICodeLine) => {
      if (newTasksList[task.slug] && !task.clearPrev) {
      } else {
        newTasksList[task.slug] = false;
      }
    })
    setTasksCompleted(newTasksList)
    setTasksCount(tasks.length)
  }, [tasks])

  function onCodeChange(newValue: string, slug: string) {
    let newVal: any = {}
    newVal[slug] = newValue
    const line = tasks.find(item => item.slug === slug);
    if (line && line.cancels) {
      document.querySelector(`.${line.cancels} .wrapper`)?.classList.add("overwritten")
      document.querySelector(`.${line.slug} .wrapper` )?.classList.remove("overwritten")
    }
    setCombinedStyles({...combinedStyles, ...newVal})
  }

  function codeDone(slugDone: string) {

    setTasksCompleted(prevTasksCompleted => ({
      ...prevTasksCompleted,
      [slugDone]: true
    }));
    const line = tasks.find(item => item.slug === slugDone);
    line &&
      document.querySelector(line.elementQ)?.classList.add("done")
    
    setTimeout(() => {
        line &&
          document.querySelector(line.elementQ)?.classList.remove("done")
    }, 1200);

  }
  
  return (
    <div className="code-group">
        <p className='selector'>{tasks[0].elementQ} 
        <span className='brace'>&#123;</span></p>
        <div className="code-group__inputs">
            { tasks?
                tasks.map((task: ICodeLine, index: number) => {
                return (<CodeInput key={task.slug}
                    {...task}
                    onCodeChange={onCodeChange}
                    onDone={codeDone}></CodeInput>)
                })
                : ''
            }
        </div>
      <p className='brace'>&#125;</p>
    </div>
  )
}

export default CodeGroup;