# Big Five 五大性格特質心理測驗

一個基於五大人格特質理論（Big Five Personality Traits）的線上心理測驗應用，提供專業的性格分析與視覺化結果呈現。

## 🌐 線上 Demo

[https://tsfmakko.github.io/BigFive](https://tsfmakko.github.io/BigFive)

## ✨ 功能特色

- 📝 **完整的測驗流程**：包含開始頁面、測驗頁面與結果頁面
- 🎨 **精美的 UI 設計**：使用 Tailwind CSS 打造現代化介面
- 📊 **五大性格特質分析**：
  - 外向性 (Extroversion)
  - 神經質 (Neuroticism)
  - 經驗開放性 (Openness)
  - 親和性 (Agreeableness)
  - 盡責性 (Conscientiousness)
- 📱 **響應式設計 (RWD)**：支援桌面、平板、手機等多種裝置
- 🎯 **自訂單選按鈕**：48×48px 圓形單選按鈕，提供優質互動體驗
- 🖼️ **視覺化結果呈現**：為每個特質提供專屬的 Hero 圖片與詳細說明
- 🚀 **快速載入**：使用 Vite 構建，提供極速的開發與打包體驗

## 🛠️ 技術棧

- **前端框架**：React 19.2.0
- **路由管理**：React Router DOM 7.11.0
- **樣式方案**：Tailwind CSS 4.1.18
- **構建工具**：Vite 7.2.4
- **圖示系統**：Google Material Icons
- **字體**：Noto Sans CJK TC, PT Sans
- **部署平台**：GitHub Pages

## 📦 安裝與運行

### 前置需求

- Node.js 18.0 或更高版本
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone https://github.com/tsfmakko/BigFive.git
   cd BigFive
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **在瀏覽器中開啟**
   ```
   http://localhost:5173
   ```

## 🚀 部署

本專案使用 GitHub Pages 進行部署：

```bash
npm run deploy
```

此命令會自動執行：
1. `npm run build` - 構建生產版本
2. `gh-pages -d dist` - 部署到 GitHub Pages

## 📁 專案結構

```
BigFive/
├── public/
│   └── imgs/              # 測驗結果圖片資源
│       ├── 開始測驗.avif
│       ├── 外向性.avif
│       ├── 情緒不穩定性.avif
│       ├── 經驗開放性.avif
│       ├── 親和性.avif
│       └── 盡責性.avif
├── src/
│   ├── pages/
│   │   ├── StartTestPage.jsx    # 測驗開始頁面
│   │   ├── TestPage.jsx          # 測驗進行頁面
│   │   ├── ResultPage.jsx        # 測驗結果容器
│   │   └── result/
│   │       ├── Neuroticism.jsx   # 動態結果顯示組件
│   │       ├── Extroversion.jsx
│   │       ├── Openness.jsx
│   │       ├── Agreeableness.jsx
│   │       └── Conscientiousness.jsx
│   ├── hooks/             # 自定義 Hooks
│   ├── assets/            # 靜態資源
│   ├── App.jsx            # 主應用組件
│   ├── main.jsx           # 應用入口
│   └── index.css          # 全域樣式
├── index.html
├── vite.config.js         # Vite 設定
├── tailwind.config.js     # Tailwind 設定
└── package.json
```

## 🎨 設計特色

### 色彩系統
- **主色**：`#4F61FF` (紫色)
- **禁用色**：`#C8CDD7` (灰色)
- **文字色**：`#000000` (黑色)

### 自訂元件
- **單選按鈕**：48×48px 外圈，24×24px 內圈，6px 邊框
- **導航按鈕**：Material Icons 箭頭圖示，支援響應式尺寸
- **Hero 區塊**：全寬圖片背景搭配漸層遮罩

### 響應式斷點
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 📄 授權

MIT License

## 👨‍💻 開發者

由 [@tsfmakko](https://github.com/tsfmakko) 開發與維護

---

⭐ 如果這個專案對你有幫助，歡迎給個 Star！
