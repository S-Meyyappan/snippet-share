import mongoose from "mongoose";

const fileSchema=new mongoose.Schema(
    {
        name:String,
        ext:String,
        mime:String,
        data:String
    }
)

const submissionSchema=new mongoose.Schema(
    {
        title:String,
        description:String,
        language:String,
        visibility:Boolean,
        tags:[String],
        files:[fileSchema],
        user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
    },{timestamps:true}
)
const Submission = mongoose.model("Submission", submissionSchema);

export default Submission