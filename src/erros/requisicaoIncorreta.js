import ErroBase from "./erroBase.js";

//Tratamento de Erro de Requisição:
class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos.") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;
