# LPL Financial 2024 "Hackarama"

## Background
Myself and two other teammates participated in the "LPL Financial 2024 Hackarama" where we had 24 hours to create a complete project that utilized an emerging technology to help financial advisors and their clients.

## The Problem
Everyday there are thousands of articles published about market conditions, individual stocks, or political events – but there is no efficient way to absorb all of this information. Additionally, a lot of the information is useless depending on the markets the financial advisor and/or client are invested in. Shouldn’t there be an easier way for both financial advisors and their clients to easily find the specific information they are curious about?

## Our Solution
1. Easily search and read through hundreds of financial articles from Yahoo Finance, CNBC, and Investing.com all in one "portal"
2. Ask any question and have a conversation in natural language about the content in the articles utilizing artificial intelligence and a modern chat interface

**The live site is available [here](https://lpl-financial-hackathon-2024.vercel.app/)**. Click the AI button next to the search bar to get to the chat page. The demo also provides more clarity.

Everything you see on the live site was created completely during the 24 hours of the Hackathon with the exception of the loading spinner and disabled chat box while loading.

## Demo
![Demo Screencapture GIF](https://github.com/jaxonhill/lpl-hackathon-2024-continued/blob/main/readme-images/demo-screencapture.gif?raw=true)

## Tech Stack and Explanation
![Tech Stack Screenshot](https://github.com/jaxonhill/lpl-hackathon-2024-continued/blob/main/readme-images/tech_stack_screenshot.png?raw=true)

### Backend Scraping
We created web scrapers to get the title, article url, image url, and the main text content from each article. I personally created the Yahoo Finance scraper code. Yuliana created the Investing.com scraper, and Sukruti created the CNBC scraper. We utilized a standard web scraping stack:

* Python
* Requests
* BeautifulSoup

### Frontend / Full Stack Website
I was personally responsible for this whole section.

All the user interface was created with **TypeScript**, **React**, **Next.js**, **Tailwind CSS**, and a component library known as **shadcn ui**. However, the real magic is how the AI chat actually works:

I took all the text content from the articles, broke it into smaller chunks of around 500 characters each, and created embeddings through the **OpenAI Embeddings API**. Embeddings are essentially vectors that hold semantic meaning based on the original text. I stored the embeddings in a **Pinecone** database. This was all done through the Python script `backend-scraping/embeddings.py`.

All the conversation history is stored using React state in the frontend. Whenever the "Ask" button is pressed, React will send an API request to the Next.js API route I created (`frontend-next/src/app/api/route.ts`).

The API route receives the entire conversation history, extracts the latest question from the user (the last message in the chat conversation), and creates an embedding of *the question itself* -- similar to creating embeddings for the articles. This question embedding can be compared to *all* the embeddings from the articles through cosine similarity to find the three most relevant pieces of context relating to the user's question. 

This context is then inserted into the original prompt/question from the user, and then it is sent to the **OpenAI Chat Completion API** (ChatGPT essentially). Then the API returns the AI response and I can display this response on the frontend.

The stack altogether utilized:
* Python
* OpenAI's APIs (Embedding and Chat Completion)
* Pinecone
* TypeScript
* React
* Next.js
* Tailwind CSS
* shadcn ui