// /* eslint-disable no-unused-vars */
// import React  from 'react'
// import './Quiz.css'
// import { data } from '../../assets/data'

// const Quiz = () => {

//     let [index, setIndex] = React.useState(0);
//     let [question, setQuestion] = React.useState(data[index]);
//     let [lock, setLock] = React.useState(false);
//     let [score,setScore] = React.useState(0);
//     let [result,setResult] = React.useState(false);

//     let Option1 = React.useRef(null);
//     let Option2 = React.useRef(null);
//     let Option3 = React.useRef(null);
//     let Option4 = React.useRef(null);

//     let option_array = [Option1,Option2,Option3,Option4];

//     const checkAns = (e,ans) => {
//         if (lock === false){
//             if (question.ans===ans) {
//                 e.target.classList.add("correct");
//                 setLock(true);
//                 setScore(prev=>prev+1);
//             }
//             else {
//                 e.target.classList.add("wrong");
//                 setLock(true);
//                 option_array[question.ans-1].current.classList.add("correct");
//             }
//         }
        
//     }

//     const next = () => {
//         if(lock===true){
//             if (index === data.length -1){
//                 setResult(true);
//                 return 0;
//             }
//             setIndex(++index);
//             setQuestion(data[index]);
//             setLock(false);
//             option_array.map((option)=>{
//                 option.current.classList.remove("wrong");
//                 option.current.classList.remove("correct");
//                 return null;
//             })
//         }
//     }

//     const reset = () => {
//         setIndex(0);
//         setQuestion(data[0]);
//         setScore(0);
//         setLock(false);
//         setResult(false);
//     }

//   return (
//     <div className='container'>
//         <h1>Quiz App</h1>
//         <hr />
//         {result?<></>:<>
//         <h2>{index+1}. {question.question}</h2>
//         <ul>
//             <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
//             <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
//             <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
//             <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
//         </ul>
//         <button onClick={next}>Next</button>
//         <div className="index">{index+1} dari {data.length}</div></>}
//         {result?<>
//         <h2>Score {score} out of {data.length}</h2>
//         <button onClick={reset}>Reset</button></>:<></>}
        
//     </div>
//   )
// }

// export default Quiz
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [timer, setTimer] = useState("02:00");
    const intervalRef = useRef(null);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple";
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const formattedData = data.results.map((item) => {
                    const incorrectAnswers = item.incorrect_answers.map(ans => decodeHTML(ans));
                    const correctAnswer = decodeHTML(item.correct_answer);

                    const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
                    const correctIndex = options.indexOf(correctAnswer) + 1;

                    return {
                        question: decodeHTML(item.question),
                        option1: options[0],
                        option2: options[1],
                        option3: options[2],
                        option4: options[3],
                        ans: correctIndex
                    };
                });
                
                setQuestions(formattedData);
                startTimer(); // Start the timer when questions are loaded
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();

        return () => {
            clearInterval(intervalRef.current); // Clear interval on component unmount
        };
    }, []);

    const startTimer = () => {
        const countDownTime = Date.now() + 120000;
        intervalRef.current = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            if (distance < 0) {
                clearInterval(intervalRef.current);
                setResult(true);
                setTimer("Time's up!");
            } else {
                setTimer(`${formattedMinutes}:${formattedSeconds}`);
            }
        }, 1000);
    };

    const checkAns = (ans) => {
        const correct = questions[index].ans === ans;
        setScore((prevScore) => correct ? prevScore + 1 : prevScore);

        if (index === questions.length - 1) {
            setResult(true);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }

        // Clear the lock and styles for the next question
        setTimeout(() => {
            option_array.forEach((option) => {
                if (option.current) {
                    option.current.classList.remove("wrong");
                    option.current.classList.remove("correct");
                }
            });
        }, 300);
    };

    const reset = () => {
        setIndex(0);
        setScore(0);
        setResult(false);
        setTimer("02:00");
        clearInterval(intervalRef.current);
        startTimer();
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <span className='timer'>{timer}</span>
            {result ? null : (
                <>
                    <h2>{index + 1}. {questions[index].question}</h2>
                    <ul>
                        <li ref={Option1} onClick={() => { checkAns(1) }}>{questions[index].option1}</li>
                        <li ref={Option2} onClick={() => { checkAns(2) }}>{questions[index].option2}</li>
                        <li ref={Option3} onClick={() => { checkAns(3) }}>{questions[index].option3}</li>
                        <li ref={Option4} onClick={() => { checkAns(4) }}>{questions[index].option4}</li>
                    </ul>
                    <div className="index">{index + 1} dari {questions.length}</div>
                </>
            )}
            {result && (
                <>
                    <h2>Score {score} out of {questions.length}</h2>
                    <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
