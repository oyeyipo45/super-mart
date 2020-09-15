import express from "express"
import { auth } from "../middleware/auth";
import Order from "../models/orderModel"

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
    const order = await Order.findById({_id: req.params.id})
   try {
    if(order){
        res.send(order)
        console.log(order);
    }
   } catch (error) {
       console.log(error);
   }
})


router.post('/', auth, async (req, res) => {

    console.log(req.params, "roductsssss")
   try {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        shippingPrice: req.body.shippingPrice
    })

    const newOrderCreated = await newOrder.save()
    console.log(newOrderCreated);
    res.status(201).send({message: "newOrderCreated", data: newOrderCreated})
   } catch (error) {
       console.log(error);
   }
})


export default router;