import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MapPin, Search } from 'lucide-react';

interface ZipInfo {
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  country: string;
}

const ZipCodePage = () => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [zipInfo, setZipInfo] = useState<ZipInfo | null>(null);

  const formatZipCode = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 5) {
      return `${digits.substring(0, 5)}-${digits.substring(5, 8)}`;
    }
    return digits;
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedZipCode = formatZipCode(e.target.value);
    setZipCode(formattedZipCode);
  };

  const handleSearch = async () => {
    const digitsOnly = zipCode.replace(/\D/g, '');
    
    if (!digitsOnly || digitsOnly.length !== 8) {
      toast.error('Por favor, digite um CEP válido com 8 dígitos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${digitsOnly}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado');
        setZipInfo(null);
      } else {
        const result: ZipInfo = {
          zipCode: formatZipCode(digitsOnly),
          state: data.uf,
          city: data.localidade,
          neighborhood: data.bairro || 'Não informado',
          street: data.logradouro || 'Não informado',
          country: 'Brasil'
        };
        setZipInfo(result);
      }
    } catch (error) {
      toast.error('Erro ao buscar o CEP. Tente novamente.');
      setZipInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buscador de CEP</CardTitle>
          <CardDescription>Encontre informações sobre qualquer CEP brasileiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Digite o CEP..."
              value={zipCode}
              onChange={handleZipCodeChange}
              onKeyDown={handleKeyDown}
              maxLength={9}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Buscando...' : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {zipInfo && (
            <div className="border rounded-md p-4">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">{zipInfo.city}, {zipInfo.state}</h3>
                  <p className="text-sm text-gray-500">CEP: {zipInfo.zipCode}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Rua:</div>
                  <div className="text-sm">{zipInfo.street}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Bairro:</div>
                  <div className="text-sm">{zipInfo.neighborhood}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Cidade:</div>
                  <div className="text-sm">{zipInfo.city}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Estado:</div>
                  <div className="text-sm">{zipInfo.state}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">País:</div>
                  <div className="text-sm">{zipInfo.country}</div>
                </div>
              </div>
            </div>
          )}

          {!zipInfo && !loading && (
            <div className="text-center py-8 text-gray-500">
              Digite um CEP para ver informações
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZipCodePage;