from flask import Flask, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import ConnectionFailure

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@test.w9hgd.mongodb.net/moshui"
mongodb_client = PyMongo(app)
db = mongodb_client.db

# try:
#    # The ismaster command is cheap and does not require auth.
#    mongodb_client.admin.command('ismaster')
#    print("Connection is working")
# except ConnectionFailure:
#    print("Server not available")


my_job_title = "Python pro"



@app.route('/')
def hello():
 return "Hello, " + my_job_title

@app.route("/add_one")
def add_one():
    db.todos.insert_one({'title': "todo title", 'body': "todo body"})
    return jsonify(message="success")

if __name__ == '__main__':
 app.run(debug=True)