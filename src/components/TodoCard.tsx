const TodoCard = ({ todo, onclose }: {todo: any; onclose: () => void }) => {
    return (
        <div className="todo">
            <div className="todo-content">
                <h3>ToDo Details</h3>
                <p>ID: {todo.id}</p>
                <p>Title: {todo.title}</p>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                <button onClick={onclose}>Close</button>
            </div>
        </div>
    );
};

export default TodoCard;