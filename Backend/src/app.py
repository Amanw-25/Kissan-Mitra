import os
import sys
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

def main():
    # Initialize Mistral client
    api_key = os.getenv("MISTRAL_API_KEY")
    model = "mistral-small"
    client = MistralClient(api_key=api_key)

    # Read input from stdin
    crop_name = sys.stdin.read().strip()

    # Create the chat message
    message_content = (
        f"The user has selected the crop: {crop_name}. "
        "Please provide 10-15 comprehensive tips for optimal growth and care for this crop."
    )

    messages = [ChatMessage(role="user", content=message_content)]

    # Request chat completion from Mistral AI
    chat_response = client.chat(
        model=model,
        messages=messages,
    )

    # Output the response
    print(chat_response.choices[0].message.content)

if __name__ == "__main__":
    main()
