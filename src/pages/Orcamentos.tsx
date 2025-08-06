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
  FileText, 
  Calendar,
  DollarSign,
  Clock,
  User,
  Car,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const Orcamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Mock data - será substituído pela integração com Supabase
  const orcamentos = [
    {
      id: 1,
      numero: "ORC-001",
      cliente: "João Silva Santos",
      veiculo: "Honda Civic 2020",
      placa: "ABC-1234",
      servicos: ["Troca de óleo", "Filtro de ar"],
      valorTotal: 280.00,
      status: "Em andamento",
      dataServico: "15/07/2024",
      dataCriacao: "14/07/2024"
    },
    {
      id: 2,
      numero: "ORC-002",
      cliente: "Maria Oliveira Costa",
      veiculo: "Toyota Corolla 2019",
      placa: "DEF-5678",
      servicos: ["Alinhamento", "Balanceamento"],
      valorTotal: 150.00,
      status: "Finalizado",
      dataServico: "20/07/2024",
      dataCriacao: "19/07/2024"
    },
    {
      id: 3,
      numero: "ORC-003",
      cliente: "Pedro Lima",
      veiculo: "VW Golf 2021",
      placa: "GHI-9012",
      servicos: ["Revisão completa", "Troca de pastilhas"],
      valorTotal: 890.00,
      status: "Aguardando aprovação",
      dataServico: "25/07/2024",
      dataCriacao: "22/07/2024"
    },
    {
      id: 4,
      numero: "ORC-004",
      cliente: "Ana Santos",
      veiculo: "Ford Ka 2018",
      placa: "JKL-3456",
      servicos: ["Troca de pneus"],
      valorTotal: 480.00,
      status: "Em andamento",
      dataServico: "23/07/2024",
      dataCriacao: "23/07/2024"
    },
    {
      id: 5,
      numero: "ORC-005",
      cliente: "Carlos Silva",
      veiculo: "Chevrolet Onix 2022",
      placa: "MNO-7890",
      servicos: ["Manutenção preventiva"],
      valorTotal: 320.00,
      status: "Aguardando aprovação",
      dataServico: "26/07/2024",
      dataCriacao: "25/07/2024"
    }
  ];

  const statusOptions = [
    { value: "todos", label: "Todos os Status" },
    { value: "Aguardando aprovação", label: "Aguardando Aprovação" },
    { value: "Em andamento", label: "Em Andamento" },
    { value: "Finalizado", label: "Finalizado" }
  ];

  const filteredOrcamentos = orcamentos.filter(orcamento => {
    const matchesSearch = 
      orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orcamento.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orcamento.placa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || orcamento.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-mechanic-blue text-white";
      case "Finalizado":
        return "bg-mechanic-success text-white";
      case "Aguardando aprovação":
        return "bg-mechanic-warning text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTotalByStatus = (status: string) => {
    return orcamentos.filter(o => o.status === status).length;
  };

  const getTotalValue = () => {
    return orcamentos.reduce((total, orcamento) => total + orcamento.valorTotal, 0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os orçamentos e serviços
          </p>
        </div>
        <Link to="/orcamentos/novo">
          <Button className="bg-mechanic-success hover:opacity-90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Novo Orçamento
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por número, cliente, veículo ou placa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              {statusOptions.map(option => (
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
                <Clock className="h-6 w-6 text-mechanic-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByStatus("Aguardando aprovação")}</p>
                <p className="text-sm text-muted-foreground">Aguardando</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-blue/10 rounded-lg">
                <FileText className="h-6 w-6 text-mechanic-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByStatus("Em andamento")}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-success/10 rounded-lg">
                <FileText className="h-6 w-6 text-mechanic-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalByStatus("Finalizado")}</p>
                <p className="text-sm text-muted-foreground">Finalizados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mechanic-success/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-mechanic-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {getTotalValue().toLocaleString('pt-BR')}</p>
                <p className="text-sm text-muted-foreground">Valor Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budgets List */}
      <div className="grid gap-4">
        {filteredOrcamentos.map((orcamento) => (
          <Card key={orcamento.id} className="shadow-medium border-0 hover:shadow-strong transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{orcamento.numero}</h3>
                      <Badge className={getStatusColor(orcamento.status)}>
                        {orcamento.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{orcamento.cliente}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Car className="h-4 w-4" />
                        <span>{orcamento.veiculo} - {orcamento.placa}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Serviços: {orcamento.servicos.join(", ")}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-muted-foreground">
                        <span className="text-xs">Data do serviço:</span>
                        <div className="font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {orcamento.dataServico}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-xs">Valor total:</span>
                        <div className="font-bold text-lg text-mechanic-success">
                          R$ {orcamento.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/orcamentos/${orcamento.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/orcamentos/${orcamento.id}/editar`}>
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

      {filteredOrcamentos.length === 0 && (
        <Card className="shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum orçamento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "todos" ? "Tente ajustar seus filtros de busca" : "Comece criando o primeiro orçamento"}
            </p>
            <Link to="/orcamentos/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Orçamento
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orcamentos;