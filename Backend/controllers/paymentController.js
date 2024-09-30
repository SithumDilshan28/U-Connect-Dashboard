const Payment = require("../models/Payment.model");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// Add Payment Controller
const addPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, packageType } = req.body;

    // Validate request body data
    if (!amount || !paymentMethod || !packageType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userId = req.user.id;

    const paymentDate = new Date();

    // Create new payment record
    const payment = new Payment({
      paymentDate,
      amount,
      paymentMethod,
      paymentStatus: "Paid",
      packageType,
      userId,
    });

    // Save payment to the database
    const savedPayment = await payment.save();

    // Respond with success message
    res.status(201).json({
      message: "Payment successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the payment",
      error: error.message,
    });
  }
};

//Get All Payments

const getAllPayments = async (req, res) => {
  try {
    const validUsers = await User.find().select("_id").lean();
    const validUserIds = validUsers.map((user) => user._id.toString());

    const payments = await Payment.find().lean();

    const filteredPayments = payments.filter((payment) =>
      validUserIds.includes(payment.userId.toString())
    );

    const paymentsWithUserData = await Payment.find({
      _id: { $in: filteredPayments.map((p) => p._id) },
    })
      .populate("userId", "profilePicture firstName lastName")
      .lean();

    res.status(200).json(paymentsWithUserData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const getTotalSalesByPackage = async (req, res) => {
  try {
    // Aggregate total sales by packageType
    const salesByPackage = await Payment.aggregate([
      {
        $group: {
          _id: "$packageType", // Group by packageType
          totalSales: { $sum: "$amount" }, // Sum the amount for each packageType
        },
      },
    ]);

    // Respond with the aggregated data
    res.status(200).json(salesByPackage);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving sales data",
      error: error.message,
    });
  }
};

const getMonthlyPayments = async (req, res) => {
  try {
    // Aggregate total payments per month
    const paymentsByMonth = await Payment.aggregate([
      {
        $group: {
          _id: { $month: "$paymentDate" }, // Group by the month
          totalIncome: { $sum: "$amount" }, // Sum of the amount for that month
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    res.status(200).json(paymentsByMonth);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving payments data",
      error: error.message,
    });
  }
};

const getDailyPayments = async (req, res) => {
  try {
    // Aggregate total payments per day
    const paymentsByDay = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$paymentDate" },
            month: { $month: "$paymentDate" },
            day: { $dayOfMonth: "$paymentDate" },
          },
          totalIncome: { $sum: "$amount" }, // Sum of the amount for that day
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // Sort by year, month, and day
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          totalIncome: 1,
        },
      },
    ]);

    res.status(200).json(paymentsByDay);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving payments data",
      error: error.message,
    });
  }
};

const checkUserPayment = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the logged-in user's info

    // Find the latest payment for the user
    const latestPayment = await Payment.findOne({ userId })
      .sort({ paymentDate: -1 }) // Sort by the latest payment date
      .exec();

    if (!latestPayment) {
      return res.status(200).json({
        message: "No payment found. Access denied.",
        accessGranted: false, // Custom field to indicate access status
      });
    }

    // Check if the payment is still valid
    const currentDate = moment();
    let valid = false;
    let expirationDate;

    if (latestPayment.paymentStatus === "Paid") {
      if (latestPayment.paymentMethod === "Yearly") {
        expirationDate = moment(latestPayment.paymentDate).add(1, "year");
        valid = currentDate.isBefore(expirationDate);
      } else if (latestPayment.paymentMethod === "Monthly") {
        expirationDate = moment(latestPayment.paymentDate).add(1, "month");
        valid = currentDate.isBefore(expirationDate);
      }
    }

    if (!valid) {
      return res.status(200).json({
        message: "Payment has expired. Access denied.",
        accessGranted: false, // Indicate access is denied
      });
    }

    // Return success if payment is valid
    return res.status(200).json({
      message: "Payment is valid. Access granted.",
      accessGranted: true, // Indicate access is granted
      expirationDate: expirationDate, // Include expiration date for frontend if needed
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getDailyPayments,
  getTotalSalesByPackage,
  getMonthlyPayments,
  checkUserPayment,
};
