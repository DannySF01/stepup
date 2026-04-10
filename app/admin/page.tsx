import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
          <Activity size={14} />
          <span>Visão Geral</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Olá, Admin 👋
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Isto é o que está a acontecer na StepUp hoje.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vendas Totais"
          value="€12,450.00"
          trend="+12.5%"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Encomendas"
          value="154"
          trend="+8%"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          title="Novos Clientes"
          value="48"
          trend="+22%"
          icon={<Users size={20} />}
        />
        <StatCard
          title="Stock Baixo"
          value="12"
          trend="Alerta"
          icon={<Package size={20} />}
          isAlert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 shadow-sm p-8 flex flex-col justify-between min-h-85">
          <div className="flex items-center justify-between">
            <h3 className="font-bold tracking-tight text-lg">
              Performance de Vendas
            </h3>
            <select className="bg-muted/50 border-none text-xs font-bold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/40 rounded-xl mt-6">
            <span className="text-muted-foreground/40 text-sm font-medium">
              Espaço para Gráfico de Linha
            </span>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-8">
          <h3 className="font-bold tracking-tight text-lg mb-6">
            Atividade Recente
          </h3>
          <div className="space-y-6">
            <ActivityItem
              user="João Silva"
              action="comprou Air Jordan 1"
              time="Há 2 min"
            />
            <ActivityItem
              user="Maria Santos"
              action="criou uma nova conta"
              time="Há 15 min"
            />
            <ActivityItem
              user="Carlos Dias"
              action="cancelou a encomenda #123"
              time="Há 1h"
            />
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">
            Ver todo o histórico →
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isAlert = false }: any) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2.5 rounded-xl ${isAlert ? "bg-red-500/10 text-red-600" : "bg-primary/10 text-primary"}`}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] font-black px-2 py-1 rounded-lg ${isAlert ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
        >
          {trend}
        </span>
      </div>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
        {title}
      </p>
      <h2 className="text-2xl font-bold tracking-tighter tabular-nums">
        {value}
      </h2>
    </div>
  );
}

function ActivityItem({ user, action, time }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
        <Users size={14} className="text-muted-foreground" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium leading-tight">
          <span className="font-bold">{user}</span>{" "}
          <span className="text-muted-foreground">{action}</span>
        </p>
        <span className="text-[10px] text-muted-foreground/60 font-bold mt-1 uppercase">
          {time}
        </span>
      </div>
    </div>
  );
}
