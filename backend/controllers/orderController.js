import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
// import { calcPrices } from '../utils/calcPrices.js';
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        const order = new Order({
            // orderItems: orderItems.map((x) => ({
            //     ...x,
            //     product: x._id,
            //     _id: undefined

            // })),
            orderItems : {ss : "SS"},
            user: '66fbf6acb725b402d175f0c3',
            shippingAddress,
            paymentMethod,
            // itemPrice,
            // taxPrice,
            // shippingPrice,
            // totalPrice,

        })

        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})


const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});


const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrderItems, getMyOrders, getOrderById

};
