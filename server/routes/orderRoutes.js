import express from "express"
import { auth } from "../middleware/auth";
import Order from "../models/orderModel"

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
    const order = await Order.findById({_id: req.params.id})
   try {
    if(order){
        res.send(order)

    }
   } catch (error) {
       console.log(error);
   }
})


router.post('/', auth, async (req, res) => {


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
   
    res.status(201).send({message: "newOrderCreated", data: newOrderCreated})
   } catch (error) {
       console.log(error);
   }
})


router.put('/:id/pay', auth, async (req, res) => {

  const order = await Order.findById(req.params.id);
  try {
    if(order){
        order.isPaid = true;
        order.isPaid = Date.now()
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
              payerID: req.body.payerID,
              orderID : req.body.orderID,
              paymentID :  req.body.paymentID
            }
            
        }
  
        const updatedOrder = await order.save()
    res.send({message : "Order Paid", order : updatedOrder})
    }
   
  } catch (error) {
      res.status
  }
})

export default router;