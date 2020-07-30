import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = ['react', 'react-dom', 'mitt', 'uuid'];

const getBabelOptions = () => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  extensions,
  include: ['src/**/*'],
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [['babel-plugin-dev-expression']],
});

export default [
  {
    input: './src/index.tsx',
    output: {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },
    external,
    plugins: [
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
    ],
  },
  {
    input: './src/index.tsx',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    external,
    plugins: [
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
    ],
  },
];

// {
//   input: 'src/index.tsx',
//   output: [
//     {
//       file: 'dist/reactOnSticky',
//       format: 'esm',
//       exports: 'named',
//       sourcemap: true,
//       strict: false,
//     }
//   ],
//   plugins: [typescript()],
//   external: ,
// }
