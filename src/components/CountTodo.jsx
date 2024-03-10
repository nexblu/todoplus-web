import { useEffect, useState } from 'react';

const CountTodo = (prop) => {
    const { list } = prop;
    const [countTodo, setCountTodo] = useState([]);

    useEffect(() => {
        const calculateTodo = async () => {
            let isDone = 0;
            for (var item of list) {
                if (item['is_done']) {
                    isDone = isDone + 1;
                }
            }
            return isDone;
        };

        calculateTodo().then(result => {
            setCountTodo([result, list.length]);
        });
    }, [list]);

    return (
        <>
            <h1>{`${countTodo[0]}/${countTodo[1]}`}</h1>
        </>
    );
};

export default CountTodo;
