import mongoose from "mongoose";
import moment from "moment";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    senderPhone: {
      type: String,
      required: true,
    },
    recieverPhone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    recieverName: {
      type: String,
      required: true,
    },
    dispatcher: {
      id: { type: String },
      name: { type: String },
      phone: { type: String },
      email_address: { type: String },
      img: { type: String },
    },
    admin: {
      type: String,
    },
    dispatcherId: {
      type: String,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: false },
        category: { type: String, required: true },
        price: { type: Number, required: false },
      },
    ],
    addressFrom: {
      type: String,
      required: true,
    },
    addressTo: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    payer: {
      type: String,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    date: {
      type: String,
      required: true,
      default: moment(new Date()).format("YYYYMMDD"),
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    dispatchOrder: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
