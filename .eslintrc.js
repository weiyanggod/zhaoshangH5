module.exports = {
    // 指定脚本的运行环境， env 关键字指定你想启用的环境，并设置它们为 true
    env: {
        browser: true,
        es6: true,
        node: true
    },
    // 扩展配置文件（设置当前ESLint默认继承的规则（或者你也可以使用标准规则：standard））
    // 一个配置文件一旦扩展，就可以继承另一个配置文件的所有特征（包括规则、插件和语言选项）、并修改所有选项
    extends: [
        'eslint:recommended', // 使用ESLint推荐的规则
        'plugin:vue/essential',
    ],
    globals: {
        //  脚本在执行期间访问的额外的全局变量
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    // 解析器选项。sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    // 使用的插件，插件名称省略了eslint-plugin-
    plugins: ['vue', 'prettier'],
    // 启用的规则及其各自的错误级别(在这里配置规则)
    rules: {
        // 每一项都是一个eslint规则，off-0,warn-1,error-2等为当前规则值
        'no-console': 'warn',
        'no-debugger': 'off',
        'no-redeclare': 0,
        'no-useless-escape': 0,
        'no-mixed-spaces-and-tabs': 0,
        'valid-v-for': 0,
        'no-unused-vars': 0
    }
}
