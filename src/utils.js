import { words } from "./words"
import OpenAI from "openai";

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}


export async function getNextGuess(word, guessed) {
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
        dangerouslyAllowBrowser: true
    })

    let display = ''
    for (let i = 0; i < word.length; i++) {
        if (guessed.includes(word[i])) {
            display += word[i]
        } else {
            display += '_'
        }
        display += ' '
    }

    const content = `
    You are playing a game of Hangman. The goal is to guess the next letter in the word based on the current state and the letters already guessed. Here is the information provided:    
    The current progress is ${display}.
    You have guessed the following letters: ${guessed.join(', ')}.

    **Important notes:**
    - In the current state, each letter position is separated by a space. A revealed letter is shown as itself (e.g., "a"), and an unrevealed letter is shown as an underscore (e.g., "_"). For example, "a _ p p _" represents a 5-letter word where the first letter is "a", the third and fourth letters are "p", and the second and fifth letters are unknown.
    - Among the guessed letters, those that do not appear in the current state are not in the word at all. For instance, if "x" is in the guessed letters but not in the current state, the word does not contain "x".

    **Your task:**
    1. Identify at least 3 possible words that could match the current state. These words must:
      - Have the same length as the current state (counting only the letters, not the spaces).
      - Match the exact letters in the positions where letters are revealed in the current state.
      - Not contain any letters that have been guessed but do not appear in the current state (i.e., incorrect guesses).
    2. Based on these possible words, decide on the next letter to guess. The guess must be:
      - A single lowercase letter.
      - A letter that has not been guessed yet (not in the guessed letters list).
    3. Be very creative in your choice! Avoid always picking the most common letters (like "e", "t", or "n") unless there’s a fun or unique reason. Make the game interesting.
    4. If no letters have been guessed yet (i.e., the guessed list is empty), do not guess "e" as your first guess.

    **Response format:**
    Provide your answer as a JSON object with the following structure:
    - "possible_words": An array of at least 3 possible words (as strings) that fit the criteria.
    - "reason": A string explaining why you chose this letter, approximately 30 words long.
    - "guess": Your guessed letter as a single lowercase character.

    **Example:**
    If the current state is "a _ _ l e" and the guessed letters are "a, b, c, l, e":
    - Possible words might be ["apple", "ankle", "axile"] (since "b" and "c" are not in the word).
    - You might guess "p" because it appears in "apple".

    Expected JSON output:
    {
      "possible_words": ["apple", "ankle", "axile"],
      "reason": "I chose 'p' because ...",
      "guess": "p"
    }

    Ensure your guess is creative, valid, and enhances the game’s fun!
    `
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: content }],
        model: "deepseek-chat",
        response_format: { type: "json_object" },
    });
    const responseData = JSON.parse(completion.choices[0].message.content);

    return responseData;
}

export function generateGrid(n) {
  // Initialize an 8x7 grid with spaces
  const grid = Array(8).fill().map(() => Array(7).fill(' '));

  // Gallows structure
  // Top bar at row 0
  grid[0][1] = '+';
  grid[0][2] = '— ';
  grid[0][3] = '— ';
  grid[0][4] = '— ';
  grid[0][5] = '+';

  // Vertical post at column 1, rows 1 to 6
  for (let y = 1; y <= 6; y++) {
    grid[y][1] = '|';
  }

  // Base at row 7
  for (let x = 0; x < 7; x++) {
    grid[7][x] = '— ';
  }

  // Body parts based on n
  if (n >= 1) {
    grid[1][5] = '|'; // Rope
  }
  if (n >= 2) {
    grid[2][5] = (n >= 7) ? '😵' : '😐'; // Head: 'O' until n=7, then 'X'
  }
  if (n >= 3) {
    grid[3][5] = '|'; // Torso top
    grid[4][5] = '|'; // Torso bottom
  }
  if (n >= 4) {
    grid[3][4] = '/'; // Left arm
  }
  if (n >= 5) {
    grid[3][6] = '\\'; // Right arm (escaped backslash)
  }
  if (n >= 6) {
    grid[5][4] = '/'; // Left leg
  }
  if (n >= 7) {
    grid[5][6] = '\\'; // Right leg (escaped backslash)
  }

  return grid;
}