// rollup.config.mjs
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import terser from '@rollup/plugin-terser'

// 文件置顶
const banner = `/* open-validate v1.0.0 */`;

export default [
    // js打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/open-validate.bundle.js',
                format: 'iife',
                name: 'validate',
                sourcemap: true,
                sourcemapFile: './dist/open-validate.bundle.js.map',
                banner
            },
            {
                file: './dist/open-validate.esm.js',
                format: 'es',
                name: 'validate',
                sourcemap: true,
                sourcemapFile: './dist/open-validate.es.js.map',
                banner
            }
        ],
         plugins: [
            babel({ // 解析es6 -》 es5
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env'],
                exclude: "node_modules/**" // 排除文件的操作 glob  
            }),
            alias({
                entries: [
                    {find:'@',replacement:'./src'}
                ]
            }),
            terser(),
            serve({ // 开启本地服务
                open: true,
                openPage: '/index.html', // 打开的页面
                port: 3333,
                contentBase: ''
            }),
            livereload('dist'),
        ]
    },
    // js打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/open-validate.bundle.min.js',
                format: 'iife',
                name: 'validate',
                sourcemap: true,
                sourcemapFile: './dist/open-validate.bundle.min.js.map',
                banner
            },
            {
                file: './dist/open-validate.esm.min.js',
                format: 'es',
                name: 'validate',
                sourcemap: true,
                sourcemapFile: './dist/open-validate.es.min.js.map',
                banner
            }
        ],
         plugins: [
            babel({ // 解析es6 -》 es5
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env'],
                exclude: "node_modules/**" // 排除文件的操作 glob  
            }),
            alias({
                entries: [
                    {find:'@',replacement:'./src'}
                ]
            }),
            terser()
        ]
    }
]