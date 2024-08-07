require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const BookService=require("../model/BookService")

exports.bookService = async (req, res) => {
  try {
    const { name, phone, address, serviceProviderphoneNumber } = req.body;

    // Validate and format phone numbers to E.164 format
    const formattedPhone = formatPhoneNumber(phone);
    const formattedServiceProviderPhone = formatPhoneNumber(serviceProviderphoneNumber);

    if (!formattedPhone || !formattedServiceProviderPhone) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    const response = await BookService.create({
      name,
      phone: formattedPhone,
      address,
      serviceProviderphoneNumber: formattedServiceProviderPhone
    });

    // Send response after successful booking creation
    res.json(response);

    // Prepare message options for Twilio
    let msgOptions = {
      from: process.env.from,  // Ensure this is in E.164 format
      to: formattedServiceProviderPhone,
      body: `Congratulations...New order placed by Name:${name},PhoneNumber:${phone},address:${address}`
    };

    // Send message using Twilio
    const message = await client.messages.create(msgOptions);
    console.log(message);
  } catch (error) {
    console.error("Error booking service:", error);
    // Only send a response if it hasn't already been sent
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Helper function to format phone number to E.164
function formatPhoneNumber(phoneNumber) {
  try {
    // Ensure phoneNumber is a string and remove all non-digit characters
    const cleaned = String(phoneNumber).replace(/\D/g, '');

    // Check if cleaned starts with '91'. If yes, prepend '+'
    if (cleaned.startsWith('91')) {
      return `+${cleaned}`;
    } else {
      // Assume Indian phone number if no country code found, prepend '+91'
      return `+91${cleaned}`;
    }
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return null;
  }
}

