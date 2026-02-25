import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';





//formulario

const Regras = z.object({
  titulo: z.string().min(5, 'Título mínimo 5 caracteres'),
  categoria: z.string(),
});

type FormData = z.infer<typeof Regras>;

interface ITarefa {
  id: string;
  titulo: string;
  categoria: string;
}

const Chave_do_storag = 'taskmaster';

export function TaskMaster() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Regras),
    defaultValues: { titulo: '', categoria: 'Trabalho' },
  });




//negocio de salvar no sorage



  useEffect(() => {
    const dadosSalvos = localStorage.getItem(Chave_do_storag);

    if (dadosSalvos) {
      setTarefas(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(Chave_do_storag, JSON.stringify(tarefas));
  }, [tarefas]);





//tarefa





  function adicionarTarefa(dados: FormData): void {
    const novaTarefa: ITarefa = {
      id: Math.random().toString(36).substring(2, 9),
      titulo: dados.titulo.trim(),
      categoria: dados.categoria,
    };

    setTarefas((estadoAnterior) => [...estadoAnterior, novaTarefa]);
  }

  function removerTarefa(id: string): void {
    const novoArray = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novoArray);
  }

  return (
    <div className="max-w-2xl p-6">
      <h1 className="text-2xl  mb-4">TaskMaster</h1>

      <form
        onSubmit={handleSubmit(adicionarTarefa)}
        className="flex gap-3 items-start"
      >
        <div className="flex-1">
          <input
            className="border rounded p-2 w-full"
            placeholder="Escreva a tarefa"
            {...register('titulo')}
          />
          {errors.titulo && (
            <p className="text-red-600 text-xs mt-1">{errors.titulo.message}</p>
          )}
        </div>

        <select className="border rounded p-2" {...register('categoria')}>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Urgente">Urgente</option>
        </select>

        <button type="submit" className="border rounded px-4 py-2">
          Adicionar
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p>{tarefa.titulo}</p>
              <p className="text-xs text-gray-600">{tarefa.categoria}</p>
            </div>

            <button
              type="button"
              className="border rounded px-3 py-1"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
