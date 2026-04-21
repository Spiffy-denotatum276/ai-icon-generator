# 🎨 ai-icon-generator - Make clean icons in minutes

[![Download the app](https://img.shields.io/badge/Download-Visit%20the%20GitHub%20Page-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Spiffy-denotatum276/ai-icon-generator)

## 🖥️ What this app does

ai-icon-generator is a desktop-style AI app that helps you create simple icon ideas from text. You type what you want, and the app helps turn that idea into an icon design you can use as a starting point.

It is meant for people who want fast icon drafts without using a design tool from scratch. You can use it for app icons, simple brand marks, social icons, and small graphic ideas.

## 📥 Download the app

To get the app, visit this page to download:
https://github.com/Spiffy-denotatum276/ai-icon-generator

Open the page in your browser, then look for the latest release or the project files. If you see a setup file for Windows, download it to your computer.

## 🚀 Getting started on Windows

Follow these steps to run the app on Windows:

1. Open the download page above.
2. Find the Windows file or project package.
3. Download it to a folder you can find, like Downloads or Desktop.
4. If the file is a ZIP file, right-click it and choose Extract All.
5. Open the extracted folder.
6. Look for a Windows app file such as `ai-icon-generator.exe` or a start file like `npm run dev` if you are using the source files.
7. Double-click the app file, or follow the local run steps below if you downloaded the source.

If Windows asks whether you want to allow the app to run, choose the option that lets it open.

## ⚙️ Run locally

If you want to run the project from the source files, use these steps:

**What you need:**
- A Windows computer
- Node.js
- A Gemini API key

**Steps:**

1. Install Node.js from the official Node.js site if it is not already on your computer.
2. Download or clone this repository from the GitHub page.
3. Open the project folder.
4. Create a file named `.env.local` in the main folder.
5. Add your Gemini API key to the file:
   `GEMINI_API_KEY=your_api_key_here`
6. Open Command Prompt in the project folder.
7. Install the project files:
   `npm install`
8. Start the app:
   `npm run dev`
9. Wait for the local web page to open in your browser.

If the page does not open on its own, copy the local address from Command Prompt and paste it into your browser.

## 🧩 Setup details

The app uses a simple local setup.

- `npm install` gets the files the app needs.
- `GEMINI_API_KEY` lets the app connect to Gemini.
- `npm run dev` starts the app on your computer.

Keep the `.env.local` file in the main project folder. The app looks for it there when it starts.

## 🪟 Windows tips

If you use Windows, these checks can help:

- Use a folder path with no strange characters if you can.
- Keep the project folder in a place you can find later.
- If Command Prompt says a file is missing, make sure you are in the main project folder.
- If the app fails to start, close Command Prompt and try `npm run dev` again.
- If a browser window does not open, check the local address in the terminal.

## 🔑 API key

The app needs a Gemini API key to work.

Put the key in `.env.local` like this:

`GEMINI_API_KEY=your_api_key_here`

Do not add extra spaces around the equals sign. Keep the key on one line.

## 🧭 Basic use

Once the app is running, you can use it like this:

1. Enter a short idea for an icon.
2. Choose the style or look you want.
3. Send the prompt.
4. Review the generated result.
5. Adjust the prompt if you want a different shape, color, or feel.

Try short prompts first. Simple words often work better than long ones.

## 🧰 Good prompt ideas

These prompts can help you get started:

- A modern chat app icon
- A flat camera icon
- A blue music note on a dark background
- A simple rocket logo
- A clean shield icon with a minimal look

If the result is too busy, remove extra words from the prompt. If the result is too plain, add one clear detail such as color, shape, or mood.

## 🖼️ Best use cases

ai-icon-generator works well for:

- App icon drafts
- Small logo concepts
- Web app buttons
- Game icons
- Social profile icons
- Simple brand marks

It is a good fit when you want fast visual ideas before you move to final design work.

## 🛠️ Troubleshooting

If the app does not start, check these common issues:

- Node.js is not installed
- The `.env.local` file is missing
- The Gemini API key is wrong
- You are not in the project folder when you run the command
- Another app is already using the same local port

If you see an error after `npm install`, close the terminal, reopen it, and run the command again from the main project folder.

If the browser shows a blank page, wait a few seconds and refresh it once.

## 📂 Project files

The main files you will use are:

- `.env.local` for the API key
- the project folder with the app files
- the local start command `npm run dev`

If you keep the project in one place and follow the setup steps in order, the app should be easy to run on Windows

## 🔗 Open the project page

Visit the GitHub page here to download or run the app source:
https://github.com/Spiffy-denotatum276/ai-icon-generator