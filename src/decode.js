import React, { useState, useEffect } from 'react'

    // This generates an object with arrays of possibilities for 
    const encode = {
        0: 'sz',
        1: 'td',
        2: 'n',
        3: 'm',
        4: 'r',
        5: 'l',
        6: 'jgc',
        7: 'kcq',
        8: 'fv',
        9: 'pb'
    }
    let broadcast = {};
    for (const [number, letters] of Object.entries(encode)) {
        // console.log(number, letters)
        letters.split('').map(letter => {
            return broadcast[letter] = number;
        })
    }

    const test = [];
    let numbs = '0123456789';
    numbs.split('').map((first) => {
        // console.log(`Working on ${first}`);
        return numbs.split('').map((second) => {
            const key = first + second;
            let options = [];
            encode[first].split('').map((encodedFirst) => {
                return encode[second].split('').map((encodedSecond) => {
                    // console.log(key + encodedFirst + encodedSecond)
                    return options.push(encodedFirst+encodedSecond); 
                })
            })
            // console.log(encode[first])
            return test[key] = options;
        })
    });

    console.log(test)

    const getRandomQuestion = (question) => {
        let randomQuestion = Math.floor(Math.random()*test.length).toString()
        if(randomQuestion < 10) {
            randomQuestion = '0' + randomQuestion
        }
        if(randomQuestion === question) {
            return getRandomQuestion();
        }
        // console.log(randomQuestion)
        return randomQuestion;
    }

function Decode() {
    
    const [question, setQuestion] = useState('00')
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        // console.log(test[question].length)
        const rightAnswerIndex = Math.floor(Math.random() * Math.floor(test[question].length))
        const rightAnswer = test[question][rightAnswerIndex];
        const wrongAnswers = Array.from(test).flat().sort(() => 0.5 - Math.random()).slice(0,3);
        let ans = []
        wrongAnswers.forEach((answer) => {
            ans.push({answer, isAnswer: false})
        })
        ans.push({answer: rightAnswer, isAnswer: true})
        const randomizedAnswers = ans.sort(() => 0.5 - Math.random());
        // console.log(randomizedAnswers)
        setAnswers(randomizedAnswers)
    }, [question]);

    const selectAnswer = ({answer, isAnswer}) => {
        if(isAnswer) {
            setScore(score + 1)
            // select next question
            let randomQuestion = getRandomQuestion(question);
            setQuestion(randomQuestion);
        }
    }

    return (
        <>
            <div className="w-1/3 rounded shadow-lg bg-white">
                <div className="px-6 py-6">
                    <div className="w-full text-center px-6 py-4 font-bold text-x1 mb-2">
                        {question}
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {answers.map((answer) => {
                            return (
                                <button className="w-1/3 mx-1 my-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" key={answer.answer} onClick={() => selectAnswer(answer)}>{answer.answer}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full text-gray-500 justify-center text-center text-6xl">
                {score}
            </div>
        </>
    )
}

export default Decode;