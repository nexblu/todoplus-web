import { useEffect, useState } from 'react';

const CountTodo = (prop) => {
    const { list } = prop;
    const [lenTodo, setLenTodo] = useState(0);

    useEffect(() => {
        const calculateTodo = async () => {
            let isDone = 0;
            for (var item of list) {
                if (item) {
                    isDone = isDone + 1;
                }
            }
            return isDone;
        };

        calculateTodo().then(result => {
            setLenTodo(result);
        });
    }, [list]);

    return (
        <>
            <h1 className='pt-4'>{lenTodo}</h1>
        </>
    );
};

export default CountTodo;
