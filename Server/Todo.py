from db import db

cursor = db.cursor()
# cursor.execute('CREATE TABLE todos(id INT PRIMARY KEY AUTO_INCREMENT, task VARCHAR(50), duedate DATE,status VARCHAR(10))')

class Todo:
    @staticmethod
    def createTodo(task,duedate,desc):
        query = "INSERT INTO todos (task, duedate,desc, isCompleted) VALUES (%s, %s, %s,%s)"
        values = (task,duedate,desc,False)
        try:
            cursor.execute(query, values)
            db.commit()
            return True
        except Exception as e:
            print(e)
            return e

    @staticmethod
    def deleteTodo(id):
        query="DELETE FROM todos WHERE id=%s"
        values=(id,)
        try:
            cursor.execute(query, values)
            db.commit()
            return True
        except Exception as e:
            print(e)
            return e

    @staticmethod
    def updateStatus(id,status):
        query="UPDATE todos SET status=%s WHERE id=%s"
        values=(status,id)
        try:
            cursor.execute(query, values)
            db.commit()
            return True
        except Exception as e:
            print(e)
            return e

    @staticmethod
    def getTodos():
        query="SELECT * FROM todos"
        try:
            cursor.execute(query)
            cols=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            dictData=[dict(zip(cols,r)) for r in data]
            return dictData
        except Exception as e:
            print(e)
            return e