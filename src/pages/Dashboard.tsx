import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Car, 
  FileText, 
  Camera, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Clock,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import heroOficina from "@/assets/hero-oficina.jpg";

const Dashboard = () => {
  const stats = [
    {
      title: "Clientes Ativos",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-mechanic-blue"
    },
    {
      title: "Veículos Cadastrados", 
      value: "389",
      change: "+8%",
      icon: Car,
      color: "text-mechanic-orange"
    },
    {
      title: "Orçamentos Pendentes",
      value: "23",
      change: "+5%",
      icon: FileText,
      color: "text-mechanic-warning"
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.240",
      change: "+18%",
      icon: DollarSign,
      color: "text-mechanic-success"
    }
  ];

  const recentServices = [
    {
      id: 1,
      cliente: "João Silva",
      veiculo: "Honda Civic 2020",
      servico: "Troca de óleo e filtro",
      status: "Em andamento",
      valor: "R$ 280,00",
      data: "Hoje, 14:30"
    },
    {
      id: 2,
      cliente: "Maria Santos",
      veiculo: "Toyota Corolla 2019",
      servico: "Alinhamento e balanceamento",
      status: "Finalizado",
      valor: "R$ 150,00",
      data: "Ontem, 16:45"
    },
    {
      id: 3,
      cliente: "Pedro Costa",
      veiculo: "VW Golf 2021",
      servico: "Revisão completa",
      status: "Aguardando aprovação",
      valor: "R$ 890,00",
      data: "Hoje, 09:15"
    }
  ];

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

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-strong">
        <img 
          src={heroOficina} 
          alt="Oficina AutoService Pro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">
              Bem-vindo ao AutoService Pro
            </h1>
            <p className="text-xl opacity-90 mb-4">
              Sistema completo de gestão para sua oficina mecânica
            </p>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-2" />
              Novo Orçamento
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-medium border-0 hover:shadow-strong transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-mechanic-success">
                  {stat.change} do mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to="/clientes/novo">
          <Card className="bg-gradient-primary text-white hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center space-x-4">
              <Users className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Novo Cliente</h3>
                <p className="text-sm opacity-90">Cadastrar cliente</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/veiculos/novo">
          <Card className="bg-gradient-secondary text-white hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center space-x-4">
              <Car className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Novo Veículo</h3>
                <p className="text-sm opacity-90">Cadastrar veículo</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/orcamentos/novo">
          <Card className="bg-mechanic-success text-white hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center space-x-4">
              <FileText className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Novo Orçamento</h3>
                <p className="text-sm opacity-90">Criar orçamento</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/galeria">
          <Card className="bg-mechanic-warning text-white hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center space-x-4">
              <Camera className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Galeria</h3>
                <p className="text-sm opacity-90">Ver fotos</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Services */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Serviços Recentes</CardTitle>
              <CardDescription>
                Últimos orçamentos e serviços realizados
              </CardDescription>
            </div>
            <Link to="/orcamentos">
              <Button variant="outline" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card hover:shadow-soft transition-shadow duration-200">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">{service.cliente}</h4>
                      <p className="text-sm text-muted-foreground">{service.veiculo}</p>
                      <p className="text-sm">{service.servico}</p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-mechanic-success">{service.valor}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.data}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;