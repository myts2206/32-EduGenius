from flask import Flask, render_template, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from fuzzywuzzy import fuzz

app = Flask(__name__)

# Load the trained tokenizer and model from specified directories
tokenizer_directory = "accuracy"
model_directory = "accuracy"

tokenizer = GPT2Tokenizer.from_pretrained(tokenizer_directory)
model = GPT2LMHeadModel.from_pretrained(model_directory)

@app.route('/')
def index():
    return render_template('index.html')

import re

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form.get('user_input', '')  # Safely get the 'user_input' value
    print("User Input:", user_input)

    # Generate text based on user input
    input_text = f"Q: {user_input} A:"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Generate text based on the input
    with torch.no_grad():
        output = model.generate(input_ids, max_length=100, do_sample=True, pad_token_id=tokenizer.eos_token_id)

    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Use regular expressions to extract the first sentence after "A:"
    matches = re.search(r'A: ([^.]*\.)', generated_text)
    relevant_response = matches.group(1) if matches else "Sorry, I couldn't find an answer."

    return jsonify({'response': relevant_response})



if __name__ == '__main__':
    app.run(debug=True)