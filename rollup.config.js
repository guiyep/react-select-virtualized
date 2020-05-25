import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import gzipPlugin from 'rollup-plugin-gzip';
import cleaner from 'rollup-plugin-cleaner';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import importAlias from 'rollup-plugin-import-alias';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    },
    //  {
    //   file: pkg.module,
    //   format: 'es',
    //   sourcemap: !isProd,
    //   compact: true,
    //   exports: 'named',
    // },
  ],
  plugins: [
    external(),
    postcss({
      minimize: isProd,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    commonjs(),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    json(),
    !isProd && gzipPlugin(),
    importAlias({
      Paths: {
        '@rsv-lib': './src/lib',
        '@rsv-hooks': './src/hooks',
        '@rsv-components': './src/components',
      },
      Extensions: ['js'],
    }),
    isProd &&
      cleaner({
        targets: ['./dist/'],
      }),
    isProd &&
      terser({
        toplevel: true,
      }),
  ],
};
