import RequisicaoIncorreta from "./requisicaoIncorreta.js";

//Tratamento de Erro de Valiação de Dados:
class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;
