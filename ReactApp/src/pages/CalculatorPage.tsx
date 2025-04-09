
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(display);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(String(result));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const firstValue = parseFloat(firstOperand || '0');
    const secondValue = parseFloat(display);

    if (operator === '+') return firstValue + secondValue;
    if (operator === '-') return firstValue - secondValue;
    if (operator === '*') return firstValue * secondValue;
    if (operator === '/') return firstValue / secondValue;

    return secondValue;
  };

  const calculate = () => {
    if (!firstOperand || !operator) return;

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Calculadora</CardTitle>
          <CardDescription>Operações aritméticas básicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-right text-3xl font-mono bg-gray-100 rounded-md mb-4 h-16 flex items-center justify-end overflow-hidden">
            {display}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="text-lg"
              onClick={() => clearDisplay()}
            >
              C
            </Button>
            <Button
              variant="outline"
              className="text-lg"
              onClick={() => setDisplay(display.slice(0, -1) || '0')}
            >
              ←
            </Button>
            <Button
              variant="outline"
              className="text-lg text-primary"
              onClick={() => handleOperator('%')}
            >
              %
            </Button>
            <Button
              variant="outline"
              className="text-lg text-primary"
              onClick={() => handleOperator('/')}
            >
              ÷
            </Button>
            
            {[7, 8, 9].map(num => (
              <Button
                key={num}
                variant="outline"
                className="text-lg"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="outline"
              className="text-lg text-primary"
              onClick={() => handleOperator('*')}
            >
              ×
            </Button>
            
            {[4, 5, 6].map(num => (
              <Button
                key={num}
                variant="outline"
                className="text-lg"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="outline"
              className="text-lg text-primary"
              onClick={() => handleOperator('-')}
            >
              −
            </Button>
            
            {[1, 2, 3].map(num => (
              <Button
                key={num}
                variant="outline"
                className="text-lg"
                onClick={() => inputDigit(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="outline"
              className="text-lg text-primary"
              onClick={() => handleOperator('+')}
            >
              +
            </Button>
            
            <Button
              variant="outline"
              className="text-lg"
              onClick={() => inputDigit('0')}
            >
              0
            </Button>
            <Button
              variant="outline"
              className="text-lg"
              onClick={() => inputDecimal()}
            >
              .
            </Button>
            <Button
              className="text-lg col-span-2 bg-primary hover:bg-primary/90"
              onClick={() => calculate()}
            >
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorPage;
