import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import path from 'path';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';

/**@type {import('rollup').RollupOptions} */
export default {
  input: path.join('src', 'index.ts'),
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'FsScroll',
    sourcemap: true
  },
  plugins: [
    serve({
      port: 3001,
      contentBase: 'dist'
    }),
    commonjs(),
    postcss({
      plugins: [autoprefixer],
      sourceMap: 'inline'
    }),
    typescript(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    url(),
    html({
      template: () => fs.readFileSync('./index.html')
    })
  ]
};
