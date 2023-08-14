import { useState } from "react";
import '../styling/QuestionBank.css'


function QuestionBank() {
    const [boxs, setBoxs] = useState([]);

    const addValue = () => {
        const tempArr = [...boxs, { marks: '', question_value: '', image: null }];
        setBoxs(tempArr);
    }

    const handleChange = (event, i, valueKey) => {
        const updatedData = [...boxs];
        updatedData[i][valueKey] = event.target.value;
        setBoxs(updatedData);
    }

    const handleImageChange = (event, i) => {
        const updatedData = [...boxs];
        updatedData[i].image = event.target.files[0];
        setBoxs(updatedData);
    }

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
                        <input
                            className='question-box-marks'
                            type="text"
                            placeholder="Marks"
                            value={data.value1}
                            onChange={e => handleChange(e, i, 'marks')}
                        />
                        <input
                            className='question-box'
                            type="text"
                            placeholder="Question"
                            value={data.value2}
                            onChange={e => handleChange(e, i, 'question_value')}
                        />
                        <input
                            className='question-box image-upload'
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageChange(e, i)}
                        />
                        <button className="delete-button" onClick={() => handleDelete(i)}>x</button>
                    </div>
                )
            })}
            <button className="add-value" onClick={() => addValue()}>Click Here</button>
        </div>
    );
}


export default QuestionBank;