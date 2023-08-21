import React, { useState } from 'react';
import styles from '../styling/QuestionBank.css'; // Correct the path based on your file structure


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
        <div>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Marks</th>
                        <th>Question</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.module}</td>
                            <td>{item.marks}</td>
                            <td>{item.question}</td>
                            <td>
                                {item.image && (
                                    <img
                                        src={URL.createObjectURL(item.image)}
                                        alt={`User ${item.module}`}
                                        className={styles.tableImage}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Module"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control-file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="col-md-12 mt-2">
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
