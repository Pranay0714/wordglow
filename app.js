import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port= process.env.PORT||4000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));



app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name ||!email||!message) {
    return res.send("Please fill all fields");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

await transporter.sendMail({
  from: `"${name} via Website" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: "New Contact Form Message",
  text: `
Name: ${name}
Email: ${email}
Message:
${message}
  `,
});
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.send("Error sending message");
  }
});

app.get("/",(req,res)=>{
    res.render("index.ejs",{corrected:"", originalText: "",});
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});


app.post("/enhance", async (req,res)=>{
    const text = req.body.text.trim();
    if(!text){
        return res.render("index",{
            corrected: "Please enter some text to enhance.",
            originalText: text,
        });
    }
    try{
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const prompt = `You are a helpful assistant that corrects grammar and spelling. Please correct the grammar and spelling of the following text: "${text}". Return only the corrected text without any explanation.`;
        
        const result = await model.generateContent(prompt);
        const correctedText = result.response.text();
        
        res.render("index", {
            corrected: correctedText,
            originalText: text,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.render("index", {
            corrected: `An error occurred: ${error.message}`,
            originalText: text,
        });
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});




