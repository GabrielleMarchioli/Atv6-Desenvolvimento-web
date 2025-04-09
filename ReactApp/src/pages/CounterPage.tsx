
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointerClick, RotateCcw } from 'lucide-react';

const CounterPage = () => {
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount > highScore) {
      setHighScore(newCount);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Contador de Cliques</CardTitle>
          <CardDescription>Quão rápido você consegue clicar?</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="text-7xl font-bold text-primary">{count}</div>
          <Button 
            size="lg" 
            className="w-40 h-40 rounded-full transition-all active:scale-95"
            onClick={incrementCount}
          >
            <MousePointerClick className="h-10 w-10" />
          </Button>
          <div className="text-sm text-gray-500">Recorde: {highScore}</div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={resetCount}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CounterPage;
