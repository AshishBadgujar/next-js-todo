import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    todos:[
        {
            text:{ type:String,required:true},
            createdAt: { type: Date, default: Date.now ,required:false}
        }
    ]
})

export default mongoose.models.todo || mongoose.model('todo', todoSchema)