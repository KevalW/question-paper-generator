import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as rtdbRef, push, get, update, remove } from 'firebase/database';

const firebaseConfig = {
    // Firebase config
    apiKey: "AIzaSyBMI8NB7eyXQPyLHE71uYORXTxwFE8hZBE",
    authDomain: "question-paper-generator-8e829.firebaseapp.com",
    databaseURL: "https://question-paper-generator-8e829-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "question-paper-generator-8e829",
    storageBucket: "question-paper-generator-8e829.appspot.com",
    messagingSenderId: "1029704276927",
    appId: "1:1029704276927:web:9d97551809c089c1629f0a",
    measurementId: "G-ZYG2NRQEVV"
};

const app = initializeApp(firebaseConfig);

function QuestionBank() {
    const [module, setModule] = useState('');
    const [marks, setMarks] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);

    const db = getDatabase(app);
    const questionsRef = rtdbRef(db, 'questions');

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            if (editData) {
                // If editData exists, update the existing item
                update(ref(questionsRef, editData.id), newQuestion);
                setEditData(null); // Clear editData after editing
            } else {
                // If editData does not exist, add a new item
                push(questionsRef, newQuestion);
            }
            // Clear input fields after submission
            setModule('');
            setMarks('');
            setQuestion('');
            setImage(null);
        } catch (error) {
            console.error('Error writing data to the database:', error);
        }
    };

    const handleEdit = (item) => {
        // Populate the input fields with the item's data for editing
        setModule(item.module);
        setMarks(item.marks.toString());
        setQuestion(item.question);
        setEditData(item);
    };

    const handleDelete = (itemId) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            try {
                // Delete the item from the database
                const db = getDatabase(app);
                const itemRef = rtdbRef(db, `questions/${itemId}`);
            
                remove(itemRef);
            } catch (error) {
                console.error('Error deleting item from the database:', error.messags);
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
                <div className="row">
                    <div className="col-md-3">
                        <label>Module</label>
                        <select
                            className="form-select"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                        >
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
                        >
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
                            {editData ? 'Save Changes' : 'Add'}
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
                                <button onClick={() => handleEdit(item)}>Edit</button>
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
