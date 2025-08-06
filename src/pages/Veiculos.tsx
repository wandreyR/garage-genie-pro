import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Car, 
  Calendar,
  User,
  Palette,
  Hash
} from "lucide-react";
import { Link } from "react-router-dom";

const Veiculos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído pela integração com Supabase
  const veiculos = [
    {
      id: 1,
      marca: "Honda",
      modelo: "Civic",
      ano: 2020,
      placa: "ABC-1234",
      cor: "Preto",
      cliente: "João Silva Santos",
      clienteId: 1,
      ultimoServico: "15/07/2024",
      proximaRevisao: "15/01/2025"
    },
    {
      id: 2,
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2019,
      placa: "DEF-5678",
      cor: "Branco",
      cliente: "Maria Oliveira Costa",
      clienteId: 2,
      ultimoServico: "20/07/2024",
      proximaRevisao: "20/01/2025"
    },
    {
      id: 3,
      marca: "Volkswagen",
      modelo: "Golf",
      ano: 2021,
      placa: "GHI-9012",
      cor: "Azul",
      cliente: "Pedro Lima",
      clienteId: 4,
      ultimoServico: "18/07/2024",
      proximaRevisao: "18/01/2025"
    },
    {
      id: 4,
      marca: "Ford",
      modelo: "Ka",
      ano: 2018,
      placa: "JKL-3456",
      cor: "Vermelho",
      cliente: "Ana Santos",
      clienteId: 5,
      ultimoServico: "10/07/2024",
      proximaRevisao: "10/01/2025"
    },
    {
      id: 5,
      marca: "Chevrolet",
      modelo: "Onix",
      ano: 2022,
      placa: "MNO-7890",
      cor: "Prata",
      cliente: "Carlos Silva",
      clienteId: 6,
      ultimoServico: "25/07/2024",
      proximaRevisao: "25/01/2025"
    }
  ];

  const filteredVeiculos = veiculos.filter(veiculo =>
    veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const marcas = [...new Set(veiculos.map(v => v.marca))];
  const getCorBadge = (cor: string) => {
    const cores: { [key: string]: string } = {
      "Preto": "bg-gray-800 text-white",
      "Branco": "bg-gray-100 text-gray-800 border",
      "Azul": "bg-blue-500 text-white",
      "Vermelho": "bg-red-500 text-white",
      "Prata": "bg-gray-400 text-white"
    };
    return cores[cor] || "bg-gray-500 text-white";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Veículos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os veículos cadastrados
          </p>
        </div>
        <Link to="/veiculos/novo">
          <Button className="bg-gradient-secondary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Veículo
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por marca, modelo, placa ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-blue/10 rounded-lg">
                <Car className="h-6 w-6 text-mechanic-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{veiculos.length}</p>
                <p className="text-sm text-muted-foreground">Total Veículos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-orange/10 rounded-lg">
                <Hash className="h-6 w-6 text-mechanic-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold">{marcas.length}</p>
                <p className="text-sm text-muted-foreground">Marcas Diferentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-success/10 rounded-lg">
                <Calendar className="h-6 w-6 text-mechanic-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{veiculos.filter(v => v.ano >= 2020).length}</p>
                <p className="text-sm text-muted-foreground">Veículos 2020+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-warning/10 rounded-lg">
                <Calendar className="h-6 w-6 text-mechanic-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Revisões Próximas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles List */}
      <div className="grid gap-4">
        {filteredVeiculos.map((veiculo) => (
          <Card key={veiculo.id} className="shadow-medium border-0 hover:shadow-strong transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {veiculo.marca} {veiculo.modelo}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="secondary">{veiculo.ano}</Badge>
                        <Badge className={getCorBadge(veiculo.cor)}>
                          {veiculo.cor}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">{veiculo.placa}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{veiculo.cliente}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-muted-foreground">
                        <span className="text-xs">Último serviço:</span>
                        <div className="font-medium">{veiculo.ultimoServico}</div>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-xs">Próxima revisão:</span>
                        <div className="font-medium text-mechanic-warning">{veiculo.proximaRevisao}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/veiculos/${veiculo.id}/editar`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVeiculos.length === 0 && (
        <Card className="shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum veículo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar seus filtros de busca" : "Comece adicionando o primeiro veículo"}
            </p>
            <Link to="/veiculos/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Veículo
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Veiculos;