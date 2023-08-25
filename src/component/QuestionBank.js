import React, { useState, useEffect } from 'react';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Required for side-effects
import "firebase/firestore";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMI8NB7eyXQPyLHE71uYORXTxwFE8hZBE",
    authDomain: "question-paper-generator-8e829.firebaseapp.com",
    databaseURL: "https://question-paper-generator-8e829-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "question-paper-generator-8e829",
    storageBucket: "question-paper-generator-8e829.appspot.com",
    messagingSenderId: "1029704276927",
    appId: "1:1029704276927:web:9d97551809c089c1629f0a",
    measurementId: "G-ZYG2NRQEVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const firestore = getFirestore(app);




function QuestionBank() {
    const [data, setData] = useState([]);
    const [module, setModule] = useState('');
    const [marks, setMarks] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = '';

        if (image) {
            const storage = getStorage(app);
            const storageRef = ref(storage, image.name); // Directly using the image name as the reference
            await uploadBytes(storageRef, image); // Upload the image directly to the root of Firebase Storage
            imageUrl = await getDownloadURL(storageRef);
        }

        // await firestore.collection('questions').add({
        //     module,
        //     marks: parseInt(marks),
        //     question,
        //     image: imageUrl,
        // });

        try {
            const docRef = await addDoc(collection(firestore, "questions"), {
                module,
                marks: parseInt(marks),
                question,
                image: imageUrl,
            });
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setModule('');
        setMarks('');
        setQuestion('');
        setImage(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionsRef = collection(firestore, 'questions');
                const snapshot = await getDocs(questionsRef);
                const newData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(newData);
                console.log("Fetched data:", newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
                                    <img className="rounded mx-auto d-block image-size" src={item.image} alt={`Question ${item.id}`} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default QuestionBank;
