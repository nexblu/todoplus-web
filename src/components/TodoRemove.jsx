import { IoMdTrash } from "react-icons/io";

const TodoRemove = () => {
    return (
        <>
            <div className="d-flex flex-row-reverse">
                <div><IoMdTrash className="trash-icon"/></div>
            </div>
        </>
    )
}

export default TodoRemove