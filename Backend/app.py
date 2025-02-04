from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import os

app = Flask(__name__)
CORS(app)

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.mimetype in ['application/pdf', 'text/plain']:
        if len(file.read()) > 10 * 1024 * 1024:  # Check for file size > 10MB
            return jsonify({'error': 'File size exceeds 10MB limit'}), 400
        file.seek(0)

        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        if file.mimetype == 'application/pdf':
            content = extract_text_from_pdf(file_path)
        else:
            with open(file_path, 'r') as f:
                content = f.read()

        return jsonify({'content': content}), 200

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)