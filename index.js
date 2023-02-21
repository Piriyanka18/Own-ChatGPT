//import { Configuration, OpenAIApi } from "openai";
const OpenAI =require('openai');
const {Configuration, OpenAIApi} = OpenAI;

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 3008;

const configuration = new Configuration({
    organization: "org-1QEXCgApRoTZi2Ty2iXDy8qW",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} =req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are a University of Colombo administrator. Answer with the University of Colombo website content.

        administrator: How can I help you today?
        Student: What courses are offered at the University of Colombo?
        administrator: certificate courses, diploma courses, undergraduate programs, postgraduate programs, etc.
        Student:${message}?
        administrator:`,
        
        max_tokens: 100,
        temperature: 0,
      });
  console.log(response.data)
  if(response.data.choices[0].text){
    res.json({message:response.data.choices[0].text})
  }
 
});

app.listen(port, () => {
  console.log('Example app listening');
});
