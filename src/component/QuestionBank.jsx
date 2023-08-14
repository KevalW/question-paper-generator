import { useState } from "react";
import '../styling/QuestionBank.css'


function QuestionBank() {
    const [boxs, setBoxs] = useState([]);

    const addValue = () => {
        const tempArr = [...boxs, { value1: '', value2: '' }];
        setBoxs(tempArr);
    }

    const handleChange = (event, i, valueKey) => {
        const updatedData = [...boxs];
        updatedData[i][valueKey] = event.target.value;
        setBoxs(updatedData);
    }
    console.log(boxs)

    const handleDelete = (i) => {
        const updatedArr = [...boxs];
        updatedArr.splice(i, 1);
        setBoxs(updatedArr);
    }


    return ( 
        <div className="question-bank">
            {boxs.map((data, i) => {
                return (
                    <div className="question-container" key={i}>
                        <input className='question-box' type="text" placeholder="Value 1" value={data.value1} onChange={e => handleChange(e, i, 'value1')} />
                        <input className='question-box' type="text" placeholder="Value 2" value={data.value2} onChange={e => handleChange(e, i, 'value2')} />
                        <button className="delete-button" onClick={() => handleDelete(i)}>x</button>
                    </div>
                )
            })}
            <button className="add-value" onClick={() => addValue()}>Click Here</button>
        </div>
    );
}
 
export default QuestionBank;