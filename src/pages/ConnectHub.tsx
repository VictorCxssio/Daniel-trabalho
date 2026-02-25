import { useState, useEffect } from "react";
import { z } from "zod";

const validacaoContato = z.object({
  nome: z.string().trim().min(1, "Nome obrigatório"),
  email: z.string().trim().email("E-mail inválido"),
  telefone: z.string().trim().regex(/^\d+$/, "Telefone deve conter apenas números"),
});

function ConnectHub() {
  const [nome, atualizarNome] = useState("");
  const [email, atualizarEmail] = useState("");
  const [telefone, atualizarTelefone] = useState("");
  const [lista, atualizarLista] = useState<string[]>([]);

  // 🔹 carregar contatos ao abrir
  useEffect(() => {
    const contatosSalvos = localStorage.getItem("contatos");
    if (contatosSalvos) {
      atualizarLista(JSON.parse(contatosSalvos));
    }
  }, []);

  // 🔹 salvar contatos sempre que lista mudar
  useEffect(() => {
    localStorage.setItem("contatos", JSON.stringify(lista));
  }, [lista]);

  function enviar() {
    const resultado = validacaoContato.safeParse({
      nome,
      email,
      telefone,
    });

    if (!resultado.success) {
      alert(resultado.error.issues[0].message);
      return;
    }

    const salvarContato = `${nome} | ${email} | ${telefone}`;
    atualizarLista([...lista, salvarContato]);

    atualizarNome("");
    atualizarEmail("");
    atualizarTelefone("");
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute left-[10%] top-[10vh] h-[80vh] w-[30%] rounded-lg border-2 border-[#c2c2c9] bg-[rgba(222,223,226,0.932)] shadow-[0_2px_8px_rgba(0,0,0,0.596)] flex flex-col items-center justify-center gap-[14px]">
        <h1 className="font-[500] [text-shadow:1px_2px_3px_rgba(0,0,0,0.411)] font-serif">
          Cadastro de novos contatos:
        </h1>

        <label className="relative right-[25%] top-[10px]" htmlFor="nome">
          Nome Completo: *
        </label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => atualizarNome(e.target.value)}
          className="h-[5vh] w-[70%] rounded-lg p-2 shadow-[0_2px_8px_rgba(0,0,0,0.596)] outline-none focus:scale-[1.015] focus:transition-all focus:duration-300"
          type="text"
          placeholder="Digite seu nome"
        />

        <label className="relative right-[25%] top-[10px]" htmlFor="email">
          E-mail: *
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => atualizarEmail(e.target.value)}
          className="h-[5vh] w-[70%] rounded-lg p-2 shadow-[0_2px_8px_rgba(0,0,0,0.596)] outline-none focus:scale-[1.015] focus:transition-all focus:duration-300"
          type="text"
          placeholder="Digite seu e-mail"
        />

        <label className="relative right-[25%] top-[10px]" htmlFor="telefone">
          Telefone: *
        </label>
        <input
          id="telefone"
          value={telefone}
          onChange={(e) => atualizarTelefone(e.target.value)}
          className="h-[5vh] w-[70%] rounded-lg p-2 shadow-[0_2px_8px_rgba(0,0,0,0.596)] outline-none focus:scale-[1.015] focus:transition-all focus:duration-300"
          type="text"
          placeholder="Digite seu telefone (só números)"
        />

        <button
          onClick={enviar}
          className="relative left-[130px] top-[20px] h-[4.5vh] w-[150px] rounded-lg border-0 bg-blue-600 text-white shadow-[0_2px_8px_rgba(0,0,0,0.596)] transition-all duration-300 hover:scale-105 hover:bg-[rgba(18,126,250,0.849)]"
        >
          Enviar
        </button>
      </div>

      <div className="absolute left-[41%] top-[10vh] h-[80vh] w-[50%] rounded-lg border-2 border-[#c2c2c9] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.596)] flex flex-col items-center justify-center gap-[40px]">
        <h1 className="font-[500] [text-shadow:1px_2px_3px_rgba(0,0,0,0.411)] font-serif">
          Contatos:
        </h1>

        <div className="w-full px-6 overflow-auto h-[70vh]">
          {lista.map((contato, i) => (
            <p key={i} className="mb-2">
              {i + 1}º Contato: {contato}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConnectHub;