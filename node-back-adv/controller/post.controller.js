const PostModel = require('../model/post.model.js')

const protectedroute = require('../middleware/protectresource.js')
// Visualising top 5 products  in the database 
const allposts = async(req,res)=>{
    PostModel.find().sort({product_price:-1}).limit(5)
    .populate("author", "_id, firstname, lastname, email")
    .then((dbPosts)=>{
        res.status(200).json({posts: dbPosts})
    })
    .catch((error)=>{
        console.log("Error Occured",error);
    })
}
// Visualising top 5 products  in the database created by a logged in user
const loggedposts = async(req,res)=>{
    PostModel.find({author: req.user._id}).sort({product_price:-1}).limit(5)
    .populate("author", "_id, firstname, lastname, email")
    .then((dbPosts)=>{
        res.status(200).json({posts: dbPosts})
    })
    .catch((error)=>{
        console.log("Error Occured",error);
    })
}
//  Creating new product post by a logged in user
const createnew = async(req,res)=>{
    const {product_name, product_quantity, product_price} = req.body
    if(!product_name || !product_quantity || !product_price){
        return res.status(400).send({message: "Please fill the mandatory fields"})
    }
    req.user.password=undefined
    const postObj = new PostModel({product_name: product_name, product_quantity: product_quantity, product_price: product_price, author: req.user})
    postObj.save()
    .then((newProduct)=>{
        res.status(201).json({post: newProduct})
    })
    .catch((error)=>{
        console.log("Error occured",error);
        res.status(403).json({error:"Error occured",error})
    })
}
// deleting a specific product by id by author of that particular product
const deletepost = async(req,res)=>{
    PostModel.findOne({_id:req.params.postId})
    .populate("author","_id")
    .exec()
    .then((post)=>{
        if(!post){
            return res.status(400).send({error:"Post not found"});
        }

        if(post.author.id.toString()===req.user._id.toString()){
            return post.deleteOne();
        }else{
            return res.status(403).json({error:"Unauthorized to delete this post"});
        }
    })
    .then((payload)=>{
        res.status(200).json({result:payload});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error:"Internal Server error"});
    });
}

module.exports={
    createnew,
    allposts,
    loggedposts,
    deletepost
}