import { autor } from '../models/Autor.js';

class AutorController {

    //Método GET para listar autores da livraria:
    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na requisição.` });
        }
    };

    //Método GET para listar autor da livraria por Id:
    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na requisição do autor.` });
        }
    };

    //Método POST para criar autor na livraria:
    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso!", autor: novoAutor });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha ao cadastrar autor.` });
        }
    };

    //Método PUT para atualizar autor da livraria:
    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Autor atualizado com sucesso!' });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na atualização do autor.` });
        }
    };

    //Método DELETE para excluir autor da livraria:
    static async excluirAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor deletado com sucesso!' });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na exclusão do autor.` });
        }
    };

};

export default AutorController;