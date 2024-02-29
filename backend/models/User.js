import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "https://th.bing.com/th?id=OIP.5n41jHLjCl7Fk1NBVLkepgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps:true},
)

export default mongoose.model("User", userSchema)