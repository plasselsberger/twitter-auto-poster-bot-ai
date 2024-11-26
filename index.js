// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Generate engaging and humorous tweets about the world of meme coins, highlighting key updates, trends, and news from the crypto space. Focus on a mix of general meme coin insights and specific updates about E-Rich Coin (www.erichcoin.com). Use humor, relatable analogies, and pop culture references to make posts entertaining and shareable. Incorporate hashtags like #ERichCoin, #MemeCoin, #CryptoNews, and #CryptoMemes. Aim for a casual tone that resonates with crypto enthusiasts while sparking interest in E-Rich Coin alongside other trending meme coins.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
