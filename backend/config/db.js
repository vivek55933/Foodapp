import mongoose  from "mongoose";;

export const connectDB = async () => {
    await  mongoose.connect('mongodb+srv://vivek55hifi_db_user:Vivekdb55@cluster0.lx2grac.mongodb.net/food-delivery').then(()=>console.log("DB connected"))
}