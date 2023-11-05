import json
import random

# Load the JSON data from your file
with open('quiz_questions.json', 'r') as file:
    data = json.load(file)

# Shuffle the questions to make the quiz more interesting
random.shuffle(data)

# Initialize a variable to keep track of the score
score = 0

# Iterate through the questions
for question in data:
    print("Question:", question["question"])

    # Display answer options
    options = question.get("options", [])
    for i, option in enumerate(options, start=1):
        print(f"{i}. {option}")

    # Get the user's answer
    user_answer = input("Your answer (enter the option number): ")

    # Check if the user's answer is correct
    correct_option = question.get("correct_option", 0)
    if user_answer.isnumeric() and 1 <= int(user_answer) <= len(options):
        if int(user_answer) == correct_option:
            print("Correct!")
            score += 1
        else:
            print("Incorrect. The correct answer is:", options[correct_option - 1])
    else:
        print("Invalid input. The correct answer is:", options[correct_option - 1])

    print("")

# Display the final score
print("Quiz completed. Your score:", score, "out of", len(data))