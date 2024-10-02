if (!process.env.OPENAI_API_KEY) {
  throw new Error('missing api key')
}

const postRequest = async (promptText) => {
  if (!promptText) {
    throw new Error('could not run postRequest: missing prompt')
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": "You will be provided a sentence or a snippet of a conversation, addressed to you. Your purpose is to deduce what you are being asked, however you may only respond with one of these single-word options: drink, go away, hug. If the sentence provided doesn't fit any of the options, answer 'pass'."
        },
        {
          "role": "user",
          "content": promptText
        }

      ],
      temperature: 0.3
    })
  })
  console.log(response.status, response.statusText)
  const json = await response.json()
  const commandWord = json.choices[0].message.content
  console.log(commandWord)
  return commandWord
}
