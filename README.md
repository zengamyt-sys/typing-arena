# タイピングアリーナ (Typing Arena)

初心者から上級者まで遊べるオンラインタイピング練習・対戦Webサービス

## 🎮 機能概要

- **タイピング練習**: 8種類の問題タイプ、5段階の難易度
- **レベルシステム**: EXP獲得→レベルアップで成長を実感
- **リアルタイム対戦**: 最大8人での友達対戦、ランクマッチ
- **ランキング**: 複数のランキング形式（総合、WPM、勝利数など）
- **称号・実績**: ゲーム内での達成感
- **デイリーミッション**: 毎日新しいチャレンジ
- **管理画面**: ユーザー管理、問題管理、統計ダッシュボード

## 🛠️ 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14 (React 18)
- **スタイリング**: Tailwind CSS
- **リアルタイム通信**: Socket.IO
- **状態管理**: Zustand
- **フォーム管理**: React Hook Form
- **グラフ**: Chart.js / Recharts
- **UI コンポーネント**: Shadcn/ui

### バック���ンド
- **ランタイム**: Node.js
- **フレームワーク**: Express.js
- **認証**: JWT + bcrypt
- **リアルタイム通信**: Socket.IO
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **バリデーション**: Zod
- **ロギング**: Winston

### インフラ
- **ホスティング**: Docker化対応
- **データベース**: PostgreSQL
- **キャッシュ**: Redis（オプション）

## 📁 プロジェクト構成

```
typing-arena/
├── frontend/                 # Next.js フロントエンド
│   ├── app/
│   │   ├── page.tsx        # ホームページ
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── practice/
│   │   ├── room/
│   │   ├── match/
│   │   ├── ranking/
│   │   ├── profile/
│   │   ├── achievements/
│   │   ├── titles/
│   │   ├── missions/
│   │   ├── settings/
│   │   ├── admin/
│   │   └── api/             # API routes
│   ├── components/          # React components
│   ├── lib/                 # ユーティリティ
│   ├── hooks/               # Custom hooks
│   ├── stores/              # Zustand stores
│   ├── public/              # 静的ファイル
│   └── package.json
├── backend/                 # Express.js バックエンド
│   ├── src/
│   │   ├── server.ts        # メインサーバー
│   │   ├── routes/          # APIルート
│   │   ├── controllers/     # コントローラー
│   │   ├── services/        # ビジネスロジック
│   │   ├── middleware/      # ミドルウェア
│   │   ├── utils/           # ユーティリティ
│   │   ├── types/           # TypeScript型定義
│   │   ├── db/              # データベース設定
│   │   └── socket/          # Socket.IO ハンドラー
│   ├── prisma/
│   │   ├── schema.prisma    # Prisma スキーマ
│   │   └── migrations/      # DB マイグレーション
│   ├── .env.example
│   └── package.json
├── docker-compose.yml       # Docker構成
└── .gitignore
```

## 🚀 セットアップ方法

### 前提条件
- Node.js 18+
- PostgreSQL 14+
- npm または yarn

### 1. リポジトリのクローン

```bash
git clone https://github.com/zengamyt-sys/typing-arena.git
cd typing-arena
```

### 2. 環境変数設定

#### バックエンド (.env)
```bash
cp backend/.env.example backend/.env
```

```env
# サーバー設定
NODE_ENV=development
PORT=3001
BACKEND_URL=http://localhost:3001

# データベース
DATABASE_URL="postgresql://user:password@localhost:5432/typing_arena"

# JWT 認証
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

# パスワードリセット
RESET_TOKEN_EXPIRE=1h
RESET_TOKEN_SECRET=your_reset_token_secret_here

# メール設定（パスワードリセット機能用）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# 本番環境用CORS設定
FRONTEND_URL=http://localhost:3000

# ファイルアップロード
MAX_UPLOAD_SIZE=5242880
UPLOAD_DIR=./uploads

# ロギング
LOG_LEVEL=debug
```

#### フロントエンド (.env.local)
```bash
cp frontend/.env.example frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### 3. データベースセットアップ

```bash
cd backend

# 依存パッケージをインストール
npm install

# Prismaマイグレーションを実行
npx prisma migrate dev --name init

# Prisma Studio でデータベースを確認（オプション）
npx prisma studio
```

### 4. 管理者アカウント設定

バックエンド起動後、以下のAPIで管理者を作成します：

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@typing-arena.com",
    "password": "AdminPassword123!",
    "username": "admin"
  }'
```

その後、データベースで直接管理者権限を付与：

```bash
npx prisma db execute --stdin << 'EOF'
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@typing-arena.com';
EOF
```

### 5. ローカル起動

**ターミナル1: バックエンド起動**
```bash
cd backend
npm run dev
# http://localhost:3001
```

**ターミナル2: フロントエンド起動**
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

## 🗄️ データベーススキーマ

主要なテーブル:

- **users**: ユーザー基本情報
- **profiles**: ユーザープロフィール（レベル、EXP、WPMなど）
- **typing_problems**: タイピング問題
- **games**: ゲームセッション
- **game_results**: ゲーム結果
- **rooms**: 対戦ルーム
- **room_players**: ルーム内のプレイヤー
- **achievements**: 実績定義
- **user_achievements**: ユーザーが獲得した実績
- **titles**: 称号定義
- **user_titles**: ユーザーが獲得した称号
- **missions**: デイリーミッション定義
- **user_missions**: ユーザーのミッション進捗
- **rankings**: ランキング記録
- **events**: イベント定義
- **bans**: BANユーザー記録
- **moderations**: ユーザーミュート記録

詳細は `backend/prisma/schema.prisma` を参照してください。

## 🔐 セキュリティ対策

- ✅ パスワードはbcryptでハッシュ化
- ✅ JWTトークンベースの認証
- ✅ 管理者権限チェック（サーバーサイド）
- ✅ 入力値のバリデーション（Zod）
- ✅ SQL インジェクション対策（Prisma ORM）
- ✅ XSS対策（Content Security Policy）
- ✅ CORS設定
- ✅ レート制限
- ✅ EXP・スコア改ざん対策（サーバーサイド検証）
- ✅ BANユーザーのアクセス制限

## 📊 開発進捗

- [x] プロジェクト初期設定
- [ ] データベーススキーマ実装
- [ ] バックエンド基本機能（認証、ユーザー管理）
- [ ] フロントエンド基本UI
- [ ] タイピング練習機能
- [ ] レベル・EXPシステム
- [ ] リアルタイム対戦機能
- [ ] ランキング機能
- [ ] 称号・実績・ミッション
- [ ] 管理画面
- [ ] テスト・デプロイ準備

## 📚 API ドキュメント

API仕様は開発過程で `backend/docs/API.md` に記載します。

## 🤝 開発ルール

- TypeScriptを使用（型安全性）
- コンポーネント単位での開発
- エラーハンドリングは必須
- コミットメッセージは日本語で明確に

## 📝 ライセンス

MIT

---

開発開始日: 2026-09-13
