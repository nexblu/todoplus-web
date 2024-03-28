import { useState } from 'react';
import { Form } from 'react-bootstrap';

const IsDone = (prop) => {
    const { todo, updatedList, setUpdatedList, setList, user } = prop;
    const [fetching, setFetching] = useState(false);

    const userIsDone = (id, is_done, callback) => {
        setFetching(true);
        const data = {
            username: user.username,
            id: id,
            is_done: is_done
        };
        fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist/is_done`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resp => {
            console.table(resp);
            if (resp.status_code === 200) {
                callback(true);
            } else {
                callback(false);
            }
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
            callback(false);
        })
        .finally(() => {
            setFetching(false);
        });
    };

    const handleCheckboxChange = (todoId) => {
        if (fetching) return;
        updatedList.map(item => {
            if (item.id === todoId) {
                userIsDone(todoId, !item.is_done, success => {
                    if (success) {
                        setUpdatedList(prevList => {
                            const updatedItem = { ...item, is_done: !item.is_done };
                            return prevList.map(prevItem => prevItem.id === todoId ? updatedItem : prevItem);
                        });
                        setList(prevList => {
                            const updatedItem = { ...item, is_done: !item.is_done };
                            return prevList.map(prevItem => prevItem.id === todoId ? updatedItem : prevItem);
                        });
                    }
                });
                return { ...item, is_done: !item.is_done };
            }
            return item;
        });
    };

    return (
        <>
            <Form.Check
                aria-label="option 1"
                className='btn-is-done'
                checked={todo.is_done}
                onChange={() => handleCheckboxChange(todo.id)}
                disabled={fetching} 
            />
        </>
    );
};

export default IsDone;
