const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const asyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');

// const User = require('../models/userModel');

const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

// @desc    create cash order
// @route   POST /api/orders/cartId
// @access  Protected/User
const createCashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 15;
  const shippingPrice = 10;

  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
  }

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create order with default paymentMethodType cash
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    // make more than one operation at the same time
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: 'success', data: order });
});

const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'user') req.filterObj = { user: req.user._id };
  next();
});

// @desc    Get all orders
// @route   POST /api/orders
// @access  Protected/User-Admin-Manager

const findAllOrders = factory.getAll(Order);

// @desc    Get all orders
// @route   POST /api/orders
// @access  Protected/User-Admin-Manager
const findSpecificOrder = factory.getOne(Order);


// @desc    Update order paid status to paid
// @route   PUT /api/orders/:id/pay
// @access  Protected/Admin-Manager

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(`There is no such a order with this id:${req.params.id}`, 404));
  }

  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: 'success', data: updatedOrder });
});

// @desc    Update order delivered status
// @route   PUT /api/orders/:id/deliver
// @access  Protected/Admin-Manager

const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(`There is no such a order with this id:${req.params.id}`, 404));
  }

  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: 'success', data: updatedOrder });
});


// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/orders/checkout-session/cartId
// @access  Protected/User

const checkoutSession = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 15;
  const shippingPrice = 10;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
  }

  const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'egp',
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shappingAddresss,
  });
  

  res.status(200).json({ status: 'success', session });
});

module.exports = {
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  findSpecificOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
}