# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

このテンプレートはReactをViteで動作させるための最小限のセットアップを提供し、HMR（ホットモジュールリプレースメント）といくつかのESLintルールを含んでいます。

Currently, two official plugins are available:

現在、2つの公式プラグインが利用可能です:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
  
Babelを使用して高速リフレッシュを実現します。

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  
SWCを使用して高速リフレッシュを実現します。

## Expanding the ESLint configuration
ESLint設定の拡張

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

本番アプリケーションを開発する場合、型認識のリントルールを有効にするために設定を更新することをお勧めします：

- Configure the top-level `parserOptions` property like this:
  
トップレベルのparserOptionsプロパティを次のように設定します。

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`

置き換えます。
  
- Optionally add `...tseslint.configs.stylisticTypeChecked`

必要に応じて追加します。

- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

インストールし、設定を更新します。

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# MendanSheet
