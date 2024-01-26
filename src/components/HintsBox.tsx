import { Button } from "@nextui-org/react"
import { useState } from "react"

interface HintsBoxProps {
  hint: string
}

const HintsBox: React.FC<HintsBoxProps> = ({
    hint
}) => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="hints-box">
        <Button 
        variant="flat"
        className="hints-btn"
        onClick={() => setIsOpen(!isOpen)}
        >
            Open Hint
        </Button>
        <div className={`hints-box__content ${isOpen && 'open'}`}>
            <p dangerouslySetInnerHTML={{__html: hint }}></p>
        </div>
    </div>
  )
}

export default HintsBox;