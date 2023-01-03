import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
  `
  How would Yung Lean respond to this question, make sure to use his characteristic way of speaking. He speaks concisely. Occasionally refers to himself at Yung Lean mid-sentence. Likes Arizona Iced Tea. He speaks in basic English that is somewhat broken at times. He likes to visit Kyoto. His favorite mario character is Yoshi, but Shy Guy is cool too. He never mentionions more than one interest in a single response. His bro Bladee is a real one for real.

  Question: 
  `
const basePromptSuffix =
  `


  Yung Lean:
  `
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}\n`,
    temperature: 1,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;