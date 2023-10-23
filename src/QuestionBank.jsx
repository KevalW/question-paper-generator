import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as rtdbRef, push, get, remove } from 'firebase/database';
import app from './firebase';

function QuestionBank() {
    const [module, setModule] = useState('');
    const [marks, setMarks] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const db = getDatabase(app);
    const questionsRef = rtdbRef(db, 'questions');

    useEffect(() => {
        if (window.performance.navigation.type === 1) {
            setModule('');
            setMarks('');
            setQuestion('');
            setImage(null);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!module || !marks || (!question && !image)) {
            setError('Module, marks, and at least one question or image are required');
            return;
        }

        setError(''); // Clear any previous error messages

        let imageUrl = '';

        if (image) {
            const storage = getStorage(app);
            const storageRef = ref(storage, image.name);
            await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(storageRef);
        }

        const newQuestion = {
            module,
            marks: parseInt(marks),
            question,
            image: imageUrl,
        };

        try {
            // Add a new item
            push(questionsRef, newQuestion);

            // Clear input fields after submission
            // setModule('');
            // setMarks('');
            setQuestion('');
            setImage(null);
        } catch (error) {
            console.error('Error writing data to the database:', error);
        }
    };

    const handleDelete = (itemId) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            try {
                // Delete the item from the database
                const itemRef = rtdbRef(db, `questions/${itemId}`);
                remove(itemRef);
            } catch (error) {
                console.error('Error deleting item from the database:', error.message);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(questionsRef);

                if (snapshot.exists()) {
                    const dataFromDB = snapshot.val();
                    const dataArray = Object.keys(dataFromDB).map((key) => ({
                        id: key,
                        ...dataFromDB[key],
                    }));
                    setData(dataArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data from the database:', error);
            }
        };

        fetchData();
    }, [questionsRef]);

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="row">
                    <div className="col-md-3">
                        <label>Module</label>
                        <select
                            className="form-select"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                            required
                        >
                            <option value="">Select Module</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label>Marks</label>
                        <select
                            className="form-select"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            required
                        >
                            <option value="">Select Marks</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
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

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Marks</th>
                        <th>Question</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.module}</td>
                            <td>{item.marks}</td>
                            <td>{item.question}</td>
                            <td>
                                {item.image && (
                                    <img
                                        className="rounded mx-auto d-block image-size"
                                        src={item.image}
                                        alt={`Question ${item.id}`}
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuestionBank;
