import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Upload, 
  Trash2, 
  Camera, 
  Calendar,
  User,
  Car,
  Eye,
  Download,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

const Galeria = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");

  // Mock data - será substituído pela integração com Supabase
  const fotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
      cliente: "João Silva Santos",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      tipo: "Antes",
      descricao: "Estado inicial do veículo - entrada na oficina",
      dataUpload: "15/07/2024",
      servico: "Troca de óleo e filtro",
      expiracaoEm: "15/01/2025"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1494976688153-a734e3b4ba30?w=400&h=300&fit=crop",
      cliente: "João Silva Santos",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      tipo: "Depois",
      descricao: "Veículo após manutenção concluída",
      dataUpload: "15/07/2024",
      servico: "Troca de óleo e filtro",
      expiracaoEm: "15/01/2025"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop",
      cliente: "Maria Oliveira Costa",
      veiculo: "Toyota Corolla 2019",
      placa: "DEF-5678",
      tipo: "Antes",
      descricao: "Pneus desgastados - necessário substituição",
      dataUpload: "20/07/2024",
      servico: "Alinhamento e balanceamento",
      expiracaoEm: "20/01/2025"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1502877828265-2b6cd04f4919?w=400&h=300&fit=crop",
      cliente: "Maria Oliveira Costa",
      veiculo: "Toyota Corolla 2019",
      placa: "DEF-5678",
      tipo: "Depois",
      descricao: "Pneus novos instalados e alinhamento realizado",
      dataUpload: "20/07/2024",
      servico: "Alinhamento e balanceamento",
      expiracaoEm: "20/01/2025"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      cliente: "Pedro Lima",
      veiculo: "VW Golf 2021",
      placa: "GHI-9012",
      tipo: "Durante",
      descricao: "Motor aberto para revisão completa",
      dataUpload: "18/07/2024",
      servico: "Revisão completa",
      expiracaoEm: "18/01/2025"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop",
      cliente: "Ana Santos",
      veiculo: "Ford Ka 2018",
      placa: "JKL-3456",
      tipo: "Antes",
      descricao: "Avaliação inicial dos freios",
      dataUpload: "10/07/2024",
      servico: "Manutenção de freios",
      expiracaoEm: "10/01/2025"
    }
  ];

  const tipoOptions = [
    { value: "todos", label: "Todos os Tipos" },
    { value: "Antes", label: "Antes" },
    { value: "Durante", label: "Durante" },
    { value: "Depois", label: "Depois" }
  ];

  const filteredFotos = fotos.filter(foto => {
    const matchesSearch = 
      foto.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foto.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foto.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foto.servico.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = tipoFilter === "todos" || foto.tipo === tipoFilter;
    
    return matchesSearch && matchesTipo;
  });

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "Antes":
        return "bg-mechanic-warning text-white";
      case "Durante":
        return "bg-mechanic-blue text-white";
      case "Depois":
        return "bg-mechanic-success text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTotalByTipo = (tipo: string) => {
    return fotos.filter(f => f.tipo === tipo).length;
  };

  const getDiasParaExpiracao = (dataExpiracao: string) => {
    const hoje = new Date();
    const expiracao = new Date(dataExpiracao.split('/').reverse().join('-'));
    const diffTime = expiracao.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
          <p className="text-muted-foreground">
            Fotos dos veículos antes, durante e depois dos serviços
          </p>
        </div>
        <Button className="bg-mechanic-warning hover:opacity-90 text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload de Fotos
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por cliente, veículo, placa ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              {tipoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-warning/10 rounded-lg">
                <Camera className="h-6 w-6 text-mechanic-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByTipo("Antes")}</p>
                <p className="text-sm text-muted-foreground">Fotos "Antes"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-blue/10 rounded-lg">
                <Camera className="h-6 w-6 text-mechanic-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByTipo("Durante")}</p>
                <p className="text-sm text-muted-foreground">Fotos "Durante"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-success/10 rounded-lg">
                <Camera className="h-6 w-6 text-mechanic-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByTipo("Depois")}</p>
                <p className="text-sm text-muted-foreground">Fotos "Depois"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {fotos.filter(f => getDiasParaExpiracao(f.expiracaoEm) <= 30).length}
                </p>
                <p className="text-sm text-muted-foreground">Expirando em 30 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFotos.map((foto) => {
          const diasParaExpiracao = getDiasParaExpiracao(foto.expiracaoEm);
          return (
            <Card key={foto.id} className="shadow-medium border-0 hover:shadow-strong transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={foto.url} 
                  alt={foto.descricao}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getTipoBadgeColor(foto.tipo)}>
                    {foto.tipo}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">{foto.cliente}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Car className="h-3 w-3" />
                      <span>{foto.veiculo} - {foto.placa}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <strong>Serviço:</strong> {foto.servico}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {foto.descricao}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{foto.dataUpload}</span>
                    </div>
                    <div className={`text-xs ${diasParaExpiracao <= 30 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {diasParaExpiracao > 0 
                        ? `${diasParaExpiracao} dias para expirar`
                        : 'Expirada'
                      }
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" className="flex-1 mr-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredFotos.length === 0 && (
        <Card className="shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma foto encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || tipoFilter !== "todos" 
                ? "Tente ajustar seus filtros de busca" 
                : "Comece fazendo upload das primeiras fotos"
              }
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload de Fotos
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Galeria;