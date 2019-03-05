import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import replace from 'rollup-plugin-replace';
import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: !isProd,
      compact: isProd,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: !isProd,
      compact: isProd,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    isProd && minify(),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    commonjs(),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
