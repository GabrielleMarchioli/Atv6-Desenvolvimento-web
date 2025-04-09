
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ListTodo, 
  MousePointerClick, 
  Hash, 
  Calculator as CalculatorIcon, 
  MapPin 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    name: 'Lista de Tarefas',
    path: '/todo',
    icon: <ListTodo className="h-5 w-5 mr-2" />
  },
  {
    name: 'Contador de Cliques',
    path: '/counter',
    icon: <MousePointerClick className="h-5 w-5 mr-2" />
  },
  {
    name: 'Jogo da Velha',
    path: '/tictactoe',
    icon: <Hash className="h-5 w-5 mr-2" />
  },
  {
    name: 'Calculadora',
    path: '/calculator',
    icon: <CalculatorIcon className="h-5 w-5 mr-2" />
  },
  {
    name: 'Buscador de CEP',
    path: '/zipcode',
    icon: <MapPin className="h-5 w-5 mr-2" />
  }
];

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-4 md:px-6 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-hero-pattern">
            Atividade 06
          </h1>
        </Link>
        
        <nav className="flex flex-wrap gap-2 items-center justify-center">
          {navItems.map((item) => (
            <Button
              key={item.path}
              asChild
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={cn(
                "transition-all",
                location.pathname === item.path && "bg-primary text-primary-foreground"
              )}
            >
              <Link to={item.path} className="flex items-center">
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
