// rollup.config.mjs
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import terser from '@rollup/plugin-terser'

// 文件置顶
const banner = `/* open-validater v1.0.0 */`;

export default [
    // js打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/open-validater.bundle.js',
                format: 'iife',
                name: 'validater',
                sourcemap: true,
                sourcemapFile: './dist/open-validater.bundle.js.map',
                banner
            },
            {
                file: './dist/open-validater.esm.js',
                format: 'es',
                name: 'validater',
                sourcemap: true,
                sourcemapFile: './dist/open-validater.es.js.map',
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
    // js压缩打包
    {
        input: 'src/main.js',
        output:  [
            {
                file: './dist/open-validater.bundle.min.js',
                format: 'iife',
                name: 'validater',
                sourcemap: true,
                sourcemapFile: './dist/open-validater.bundle.min.js.map',
                banner
            },
            {
                file: './dist/open-validater.esm.min.js',
                format: 'es',
                name: 'validater',
                sourcemap: true,
                sourcemapFile: './dist/open-validater.es.min.js.map',
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