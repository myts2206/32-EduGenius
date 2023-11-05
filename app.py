from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/run_python_code', methods=['POST'])
def run_python_code():
    # Get data from the request (if needed)
    data = request.json

    # Execute the Python code you want
    result = "Python code executed successfully"  # Replace with your code

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
