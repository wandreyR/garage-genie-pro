import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Car, 
  Users, 
  FileText, 
  Camera, 
  Menu, 
  Wrench,
  LogOut
} from "lucide-react";
import logoOficina from "@/assets/logo-oficina.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Wrench },
    { name: "Clientes", href: "/clientes", icon: Users },
    { name: "Veículos", href: "/veiculos", icon: Car },
    { name: "Orçamentos", href: "/orcamentos", icon: FileText },
    { name: "Galeria", href: "/galeria", icon: Camera },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-background border-b shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={logoOficina} 
                alt="Oficina Logo" 
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AutoService Pro
                </h1>
                <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-primary text-white shadow-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
            <Button variant="outline" size="sm" className="ml-4">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-8">
                    <img 
                      src={logoOficina} 
                      alt="Oficina Logo" 
                      className="h-8 w-auto"
                    />
                    <div>
                      <h2 className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                        AutoService Pro
                      </h2>
                      <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
                    </div>
                  </div>
                  
                  <nav className="flex-1">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium mb-2 transition-all duration-200 ${
                            isActive(item.href)
                              ? "bg-gradient-primary text-white shadow-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                  
                  <Button variant="outline" className="w-full mt-4">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;