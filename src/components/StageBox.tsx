import CSS from 'csstype'
interface StageBoxProps {
  boxStyles: CSS.Properties | null
  targetStyles: CSS.Properties | null,
}

const StageBox: React.FC<StageBoxProps> = (
  {boxStyles, targetStyles}) => {
  return (
    <div className='stage stage--box'>
      <div className="heiwan-box" 
        style={boxStyles? boxStyles: {}}
      ></div>
      <div className="target-box" 
        style={targetStyles? targetStyles : {}}
      ></div>
        {/* <Image src='/images/vscode.png' 
        alt='test' width='300' height='300'></Image> */}
    </div>
  )
}

export default StageBox
