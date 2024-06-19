import NaoEncontrado from "../erros/naoEncontrado.js";

//Middleware de Manipulação de 404:
function manipulador404(req, res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}

export default manipulador404;
