import { LoginForm } from "@/modules/auth/LoginForm";

const features = [
  "Gestão de unidades e desempenho",
  "Controle de royalties por franquia",
  "Relatórios financeiros centralizados",
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[42%] min-w-[420px] flex-col justify-between overflow-hidden bg-indigo-950 p-14 lg:flex">
        <svg
          className="pointer-events-none absolute -right-40 -top-32 opacity-60"
          width="520"
          height="520"
          viewBox="0 0 520 520"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="260" cy="260" r="259" stroke="#312E81" strokeWidth="1" />
          <circle cx="260" cy="260" r="190" stroke="#312E81" strokeWidth="1" />
          <circle cx="260" cy="260" r="120" stroke="#3730A3" strokeWidth="1" />
        </svg>

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span className="text-[19px] font-extrabold tracking-tight text-white">FranchiseOS</span>
          </div>

          <h1 className="mt-12 max-w-[380px] text-[34px] font-extrabold leading-tight text-white">
            Gestão centralizada para toda a sua rede de franquias
          </h1>
          <p className="mt-4 max-w-[360px] text-[15px] leading-relaxed text-indigo-200">
            Acompanhe unidades, royalties e desempenho em um só painel, pensado para franqueadores.
          </p>
        </div>

        <div className="relative flex flex-col gap-2.5">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2.5 rounded-full bg-white/[0.08] px-3.5 py-2.5 text-[13px] font-medium text-indigo-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      </div>
      
      <div
        className="flex flex-1 items-center justify-center p-12"
        style={{
          backgroundImage: "radial-gradient(#E7E9ED 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "-11px -11px",
        }}
      >
        
        <LoginForm/>  
          
      </div>
    </div>
  );
}