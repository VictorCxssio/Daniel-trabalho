import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./money.css";
const Regras = z.object({
  descricao: z.string(),
  valor: z.number().gt(0, "O valor deve ser maior que zero"),
});

type FormData = z.infer<typeof Regras>;

interface ILancamento {
  id: string;
  descricao: string;
  valor: number;
}

const Chave_do_storag2 = "moneyflow";

export function MoneyFlow() {
  const [lancamentos, setLancamentos] = useState<ILancamento[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(Regras),
    defaultValues: { descricao: "", valor: 0 },
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem(Chave_do_storag2);
    if (dadosSalvos) setLancamentos(JSON.parse(dadosSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem(Chave_do_storag2, JSON.stringify(lancamentos));
  }, [lancamentos]);

function adicionar(dados: FormData) {
  const novo: ILancamento = {
    id: Math.random().toString(36).substring(2, 9),
    descricao: dados.descricao.trim(),
    valor: dados.valor,
  };

  setLancamentos((estadoAnterior) => [...estadoAnterior, novo]);
  reset({ descricao: "", valor: 0 });
}

function remover(id: string) {
  setLancamentos((old) => old.filter((item) => item.id !== id));
}

// cálculo simples do saldo total
let saldoTotal = 0;

for (let i = 0; i < lancamentos.length; i++) {
  saldoTotal += lancamentos[i].valor;
}

  return (
    <div id="card" className="max-w-2xl p-6" >
      <h1 className="text-2xl mb-2">MoneyFlow</h1>

      <p className="mb-4 font-semibold">
        Saldo Total: R$ {saldoTotal.toFixed(2)}
      </p>

      <form onSubmit={handleSubmit(adicionar)} className="flex gap-3 items-start">
        <div className="flex-1">
          <input
            className="border rounded p-2 w-full"
            placeholder="Descrição da despesa"
            {...register("descricao")}
          />
        </div>

        <div className="w-40">
          <input
            className="border rounded p-2 w-full"
            type="number"
            step="0.01"
            placeholder="Valor"
            {...register("valor", { valueAsNumber: true })}
          />
          {errors.valor && (
            <p className="text-red-600 text-xs mt-1">{errors.valor.message}</p>
          )}
        </div>

        <button type="submit" className="border rounded px-4 py-2">
          Adicionar
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {lancamentos.map((item) => (
          <li key={item.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p>{item.descricao}</p>
              <p className="text-xs text-gray-600">R$ {item.valor.toFixed(2)}</p>
            </div>

            <button
              type="button"
              className="border rounded px-3 py-1"
              onClick={() => remover(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}