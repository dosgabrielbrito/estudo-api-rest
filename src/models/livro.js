import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "'titulo' é um campo obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "'editora' é um campo obrigatório"],
    },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "'autor' é um campo obrigatório"],
    },
  },
  {
    versionKey: false,
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;
