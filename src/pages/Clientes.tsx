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
  Phone, 
  Mail, 
  MapPin,
  User,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído pela integração com Supabase
  const clientes = [
    {
      id: 1,
      nome: "João Silva Santos",
      documento: "123.456.789-00",
      tipo: "PF",
      telefone: "(11) 99999-9999",
      email: "joao.silva@email.com",
      endereco: "Rua das Flores, 123 - Centro",
      veiculosCount: 2,
      ultimoServico: "15/07/2024"
    },
    {
      id: 2,
      nome: "Maria Oliveira Costa",
      documento: "987.654.321-00",
      tipo: "PF",
      telefone: "(11) 88888-8888",
      email: "maria.costa@email.com",
      endereco: "Av. Paulista, 456 - Bela Vista",
      veiculosCount: 1,
      ultimoServico: "20/07/2024"
    },
    {
      id: 3,
      nome: "Transportes ABC Ltda",
      documento: "12.345.678/0001-90",
      tipo: "PJ",
      telefone: "(11) 7777-7777",
      email: "contato@transportesabc.com",
      endereco: "Rua Industrial, 789 - Vila Leopoldina",
      veiculosCount: 15,
      ultimoServico: "22/07/2024"
    },
    {
      id: 4,
      nome: "Pedro Lima",
      documento: "456.789.123-00",
      tipo: "PF",
      telefone: "(11) 66666-6666",
      email: "pedro.lima@email.com",
      endereco: "Rua do Comércio, 321 - Centro",
      veiculosCount: 1,
      ultimoServico: "18/07/2024"
    }
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os clientes da oficina
          </p>
        </div>
        <Link to="/clientes/novo">
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome, CPF/CNPJ ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-blue/10 rounded-lg">
                <User className="h-6 w-6 text-mechanic-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{clientes.filter(c => c.tipo === 'PF').length}</p>
                <p className="text-sm text-muted-foreground">Pessoas Físicas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-orange/10 rounded-lg">
                <Building2 className="h-6 w-6 text-mechanic-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold">{clientes.filter(c => c.tipo === 'PJ').length}</p>
                <p className="text-sm text-muted-foreground">Pessoas Jurídicas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-success/10 rounded-lg">
                <User className="h-6 w-6 text-mechanic-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{clientes.length}</p>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="shadow-medium border-0 hover:shadow-strong transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                      <Badge variant={cliente.tipo === 'PF' ? 'default' : 'secondary'}>
                        {cliente.tipo}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{cliente.documento}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{cliente.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{cliente.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{cliente.endereco}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start lg:items-end space-y-1">
                    <div className="text-sm">
                      <span className="font-semibold text-mechanic-blue">{cliente.veiculosCount}</span>
                      <span className="text-muted-foreground ml-1">veículo(s)</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Último serviço: {cliente.ultimoServico}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/clientes/${cliente.id}/editar`}>
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

      {filteredClientes.length === 0 && (
        <Card className="shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar seus filtros de busca" : "Comece adicionando seu primeiro cliente"}
            </p>
            <Link to="/clientes/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cliente
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Clientes;