import { useState } from "react";
import '../styling/QuestionBank.css'


function QuestionBank() {
    const [boxs, setBoxs] = useState([]);

    const addvalue = () => {
        const tempx = [...boxs, []]
        setBoxs(tempx);
    }
    const handleChange =(onChangeValue,i)=>{
        const inputData = [...boxs]
        inputData[i] = onChangeValue.target.value;
        setBoxs(inputData)
    }
    console.log(boxs)
    const handledelete = (i) => {
        const deleteValue = [...boxs]
        deleteValue.splice(i,1)
        setBoxs(deleteValue)
    }


    return ( 
        <div className="question-bank"> 
            {boxs.map((data,i) =>{
                return(
                    <div className="question-container">
                        <input  className = 'question-box' type="text" placeholder="question" value = {data} onChange={e=>handleChange(e,i)}/>
                        <button className="delete-button" onClick={() => handledelete(i)}>x</button>
                    </div>
                )
            })}
            <button className="add-value" onClick={()=> addvalue()}> Click Here</button>
        </div>
    );
}
 
export default QuestionBank;