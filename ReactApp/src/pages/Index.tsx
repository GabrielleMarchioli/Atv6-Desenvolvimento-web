
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListTodo, MousePointerClick, Hash, Calculator as CalculatorIcon, MapPin } from 'lucide-react';

const features = [
  {
    icon: <ListTodo className="h-10 w-10 text-theme-blue" />,
    title: 'Lista de Tarefas',
    description: 'Mantenha controle das suas tarefas com uma lista simples e intuitiva.',
    path: '/todo'
  },
  {
    icon: <MousePointerClick className="h-10 w-10 text-theme-blue" />,
    title: 'Contador de Cliques',
    description: 'Um contador simples que incrementa cada vez que você clica em um botão.',
    path: '/counter'
  },
  {
    icon: <Hash className="h-10 w-10 text-theme-purple" />,
    title: 'Jogo da Velha',
    description: 'Jogue o clássico jogo da velha contra um amigo.',
    path: '/tictactoe'
  },
  {
    icon: <CalculatorIcon className="h-10 w-10 text-theme-purple" />,
    title: 'Calculadora',
    description: 'Realize operações aritméticas básicas com esta calculadora simples.',
    path: '/calculator'
  },
  {
    icon: <MapPin className="h-10 w-10 text-theme-pink" />,
    title: 'Buscador de CEP',
    description: 'Encontre informações sobre qualquer CEP brasileiro.',
    path: '/zipcode'
  }
];

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-hero-pattern">
        Atividade 06 - Desenvolvimento web
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          As mini aplicações abaixo são construídas com React, clique e descubra as possibilidades!
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={feature.path}>Experimente agora</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Index;
