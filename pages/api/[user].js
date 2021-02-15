import Todo from '../../models/Todo'
import initDB from '../../helpers/db'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getTodos(req, res);
            break;
        case "PUT":
            await saveTodos(req, res);
            break;
        case "DELETE":
            await deleteTodo(req, res);
            break;
        default:
            break;
    }
}

const getTodos = async (req, res) => {
    const {user}=req.query;
    let userTodos=await Todo.findOne({user:user})
    if (userTodos) {
        res.json(userTodos.todos)
    }else{
        res.json([])
    }
}

const saveTodos = async (req, res) => {
    const {user}=req.query;
    const { text } = req.body;
    if (!text) {return res.json({ err: 'Please add something !' }) }
    try {
        var userTodos=await Todo.findOne({user:user})
        if (userTodos==null) {
            const newTodo={text}
            let thistodo=await new Todo({
                user:user,
                todos:newTodo
            }).save()
            return res.json(thistodo.todos)
        }else{
            const newTodo={text}
            let thistodos= await Todo.findOneAndUpdate(
                {user:user},
                {$push:{todos:newTodo}},
                {new:true}
            )
            res.json(thistodos.todos)
        }
    } catch (error) {
        console.log(error)
        return res.json({ err: 'Please add todo !' })
    }
}

const deleteTodo = async (req, res) => {
    const {user}=req.query;
    const {id}=req.body
    try {
        const thisTodo = await Todo.findOneAndUpdate(
            { user: user },
            { $pull: { todos: { _id: id } } },
            { new: true }
        )
        res.json(thisTodo.todos)
    } catch (error) {
        console.log(error)
        return res.json({ err: 'error in deleting todo !' })
    }
}