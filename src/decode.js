import React, { useState, useEffect } from 'react'

    // This generates an object with arrays of possibilities for 
    const encode = {
        0: 'sz',
        1: 'td',
        2: 'n',
        3: 'm',
        4: 'r',
        5: 'l',
        6: 'jg',
        7: 'kcq',
        8: 'fv',
        9: 'pb'
    }
    let broadcast = {};
    let letterOptions = [];
    for (const [number, letters] of Object.entries(encode)) {
        // console.log(number, letters)
        letters.split('').map(letter => {
            // console.log(letter, number)
            letterOptions.push(letter);
            return broadcast[letter] = number;
        });
    }

    letterOptions.sort()
    // console.log(letterOptions)
    // let numbers = Object.entries(encode)
    // numbers.map((number) => {
    //     console.log(number)
    //     return number;
    // })

    // console.log(numbers)

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

    // console.log(test)

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
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    
    useEffect(() => {
        if(userAnswer.length === 2) {
            const isCorrect = [];
            const theAnswer = userAnswer.split('');
            const theQuestion = question.split('');

            for (let step = 0; step < 2; step++) {
                const number = theQuestion[step];
                const containsNumber = encode[number].includes(theAnswer[step]);
                isCorrect.push({
                    number,
                    containsNumber
                });
            }

            // Iterate through theAnswer and reduce to true or false
           const totallyCorrect = isCorrect.reduce((acc, item) => {
                return item.containsNumber;
            }, false);

            if(totallyCorrect) {
                setScore(score + 1);
                let randomQuestion = getRandomQuestion(question);
                setUserAnswer('');
                setQuestion(randomQuestion);
            }
        }
    }, [question, userAnswer, score])

    const selectLetter = ({letter}) => {
        if(userAnswer === undefined || userAnswer.length < 2) {
            return setUserAnswer(userAnswer + letter)
        }
    }

    return (
        <>
            <div className="w-full text-gray-500 justify-center text-center text-6xl">
                {score}
            </div>
            <div className="flex sm:flex-shrink-0 rounded shadow-lg bg-white">
                <div className="px-6 py-6">
                    <div className="w-full text-center px-6 py-4 font-bold text-5xl mb-2">
                        {question}
                        <br />
                        {userAnswer}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-wrap justify-center">
                    {letterOptions.map((letter) => {
                        return (
                            <button className="w-1/6 mx-1 my-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" key={letter} onClick={() => selectLetter({letter})} >{letter}</button>
                        );
                    })}
                    <button className="w-full mx-1 my-1 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => setUserAnswer('')} >Clear</button>
                </div>
            </div>
        </>
    )
}

export default Decode;