import React, { useState } from 'react';
import styles from '../styling/QuestionBank.css';

function QuestionBank() {
    const [data, setData] = useState([]);
    const [module, setModule] = useState('');
    const [marks, setMarks] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { module, marks, question };
        setData([...data, newData]);
        setModule('');
        setMarks('');
        setQuestion('');
        setImage(null);
    };

    return (
        <div className={styles.container}>
            <table className={`table ${styles.customTable}`}>
                {/* ... */}
            </table>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={`row ${styles.inputRow}`}>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Module"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary btn-block">
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default QuestionBank;
