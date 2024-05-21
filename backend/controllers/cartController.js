import userModel from ".././models/userModel.js"

// add to cart 
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by userId
        let user = await userModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cart if it doesn't exist
        if (!user.cartData) {
            user.cartData = {};
        }

        // Update the cart
        if (!user.cartData[itemId]) {
            user.cartData[itemId] = 1;
        } else {
            user.cartData[itemId] += 1;
        }

        // Save the updated user
        await userModel.findByIdAndUpdate(userId, { cartData: user.cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};


//remove from cart
const removeFromCart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: "Removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//getCart 
// const getCart = async(req, res)=>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         res.json({success: true, cartData})

//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: "Error"})
//     }
// }

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData; // Accessing cartData directly
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};



export {addToCart, removeFromCart, getCart}