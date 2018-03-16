import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js',
  output: {
    file: './es/index.js',
    format: 'es',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    }),
  ],
};
