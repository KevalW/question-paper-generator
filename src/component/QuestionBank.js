import React, { useState, useEffect } from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
            console.log("Document written with ID: ", docRef.id);
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
            const questionsRef = firestore.collection('questions');
            const snapshot = await questionsRef.get();
            const newData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(newData);
        };

        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Module"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Add</button>
            </form>

            <table>
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
                                {item.image && <img src={item.image} alt={`Question ${item.id}`} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuestionBank;
