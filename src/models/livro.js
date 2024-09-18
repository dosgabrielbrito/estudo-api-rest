import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

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
      enum: {
        values: ['Companhia das Letras', 'Abril Livros'],
        message: 'A editora {VALUE} não é um valor permitido.',
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: 'O número de páginas deve estar entre 10 e 5000.',
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, "'autor' é um campo obrigatório"],
      autopopulate: true,
    },
  },
  {
    versionKey: false,
  }
);

livroSchema.plugin(autopopulate);

const livros = mongoose.model('livros', livroSchema);

export default livros;
