import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI("AIzaSyB-8znfCBdG46CPGmtvqD1EqZI7Dm679zY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
