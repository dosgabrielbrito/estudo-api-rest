import livro from '../models/Livro.js';

class LivroController {

    //Método GET para listar livros da livraria:
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na requisição.` });
        }
    };

    //Método GET para lista livro da livraria por Id:
    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na requisição do livro.` });
        }
    };

    //Método POST para crirar livro na livraria:
    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Criado com sucesso!", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha ao cadastrar livro.` });
        }
    };

    //Método PUT para atualizar livro da livraria:
    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Livro atualizado com sucesso!' });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na atualização do livro.` });
        }
    };

    //Método DELETE para excluir livro da livraria:
    static async excluirLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro deletado com sucesso!' });
        } catch (erro) {
            res.status(500).json({ massage: `${erro.massage} - Falha na exxclusão do livro.` });
        }
    };

};

export default LivroController;