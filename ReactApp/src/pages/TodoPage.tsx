
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Trash2, PlusCircle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') {
      toast.error('Tarefa não pode estar vazia');
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    toast.success('Tarefa adicionada com sucesso');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Tarefa removida');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Lista de Tarefas</CardTitle>
          <CardDescription>Mantenha controle das suas tarefas e fique organizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Adicionar nova tarefa..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={addTodo}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Sua lista de tarefas está vazia. Adicione uma nova tarefa para começar!
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label 
                      htmlFor={`todo-${todo.id}`}
                      className={`${todo.completed ? 'line-through text-gray-400' : ''}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoPage;
