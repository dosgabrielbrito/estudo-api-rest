import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultados = await livros.findById(id);

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idEncontrado = await livros.findById(id);

      if (idEncontrado !== null) {
        await livros.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).send({
          message: "Livro atualizado com sucesso.",
        });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idEncontrado = await livros.findById(id);

      if (idEncontrado !== null) {
        await livros.findByIdAndDelete(id);
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

//Função para processamento de buscas na url:
async function processBusca(paramentros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = paramentros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas) busca.paginas = { ...busca.paginas, $gte: minPaginas };
  if (maxPaginas) busca.paginas = { ...busca.paginas, $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
