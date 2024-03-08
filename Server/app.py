from flask import Flask,request,jsonify
from Todo import Todo

app = Flask(__name__)

@app.route('/todo',methods=['POST', 'GET','PUT','DELETE'])
def todo():
    match request.method:
        case 'GET':
            try:
                todos=Todo.getTodos()
                return jsonify({'todos':todos}),200
            except Exception as e:
                return jsonify({'message':e}),500
            
        case 'POST':
            data = request.get_json()
            task=data['task']
            duedate=data['duedate']
            res=Todo.createTodo(task,duedate)
            if res==True:
                return jsonify({'message': 'Todo created successfully!'}), 200
            else:
                return jsonify({'message': 'Something Wrong!'}), 500
        case 'DELETE':
            data=request.get_json()
            id=data['id']
            res=Todo.deleteTodo(id)
            if res==True:
                return jsonify({'message': 'Todo deleted successfully!'}), 200
            else:
                return jsonify({'message': 'Something Wrong!'}), 500
            
        case 'PUT':
            data=request.get_json()
            id=data['id']
            status=['status']
            res=Todo.updateStatus(id,status)
            if res==True:
                return jsonify({'message': 'Todo updated successfully!'}), 200
            else:
                return jsonify({'message': 'Something Wrong!'}), 500

if __name__ == '__main__':
    app.run()