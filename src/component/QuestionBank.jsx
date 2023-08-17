import React, { useState } from 'react';
import '../styling/QuestionBank.css';

import firebase from 'firebase/compat/app'; // this is changes from the version keep it in mind
import 'firebase/firestore';
import 'firebase/storage';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '@firebase/app'; // Adjust the path if needed

function QuestionBank() {
    const [boxs, setBoxs] = useState([]);


    // const db = firebase.firestore();

    const addValue = () => {
        const tempArr = [...boxs, { marks: '', question_value: '', image: null }];
        setBoxs(tempArr);
    }

    const handleChange = (event, i, valueKey) => {
        const updatedData = [...boxs];
        updatedData[i][valueKey] = event.target.value;
        setBoxs(updatedData);
    }

    const handleImageChange = async (event, i) => {
        const updatedData = [...boxs];
        const file = event.target.files[0];

        const storage = getStorage(firebaseApp); // Use your Firebase app instance here
        const storageRef = ref(storage, 'images/' + file.name);
        await uploadBytes(storageRef, file);

        const imageUrl = await getDownloadURL(storageRef);

        updatedData[i].image = imageUrl;
        setBoxs(updatedData);
    };



    const handleDelete = (i) => {
        const updatedArr = [...boxs];
        updatedArr.splice(i, 1);
        setBoxs(updatedArr);
    };

    const handleFormSubmit = async () => {
        try {
            const collectionRef = firebase.firestore().collection('/questionBank/hM426ti9aNIdotTvvpvR '); // Replace with your collection name

            for (const item of boxs) {
                const data = {
                    marks: item.marks,
                    question_value: item.question_value,
                    image: item.image
                };

                await collectionRef.add(data);
            }

            console.log('Data uploaded successfully');
        } catch (error) {
            console.error('Error uploading data:', error);
        }
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
                            value={data.marks}
                            onChange={e => handleChange(e, i, 'marks')}
                        />
                        <input
                            className='question-box'
                            type="text"
                            placeholder="Question"
                            value={data.question_value}
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
            <button className="submit-button" onClick={handleFormSubmit}>Submit</button>
        </div>
    );
}

export default QuestionBank;
