# 🚀 Развёртывание MOO Landing Page

## Как развернуть сайт на Vercel

### ✅ Статус: Сайт готов к развёртыванию

Сайт уже скомпилирован и работает локально на `http://localhost:3000`

### Вариант 1: Развёртывание через GitHub (Рекомендуется)

#### Шаг 1: Инициализируйте Git (если ещё не сделано)
```bash
cd /Users/product/Desktop/moo-landing
git init
git add .
git commit -m "Initial: MOO landing page"
```

#### Шаг 2: Создайте репозиторий на GitHub
1. Перейдите на [github.com/new](https://github.com/new)
2. Создайте новый репозиторий `moo-landing`
3. Скопируйте команду для push

#### Шаг 3: Загрузите код на GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/moo-landing.git
git branch -M main
git push -u origin main
```

#### Шаг 4: Развертите на Vercel
1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Нажмите "Import Git Repository"
3. Выберите `moo-landing` из своих репозиториев
4. Нажмите "Deploy"

**Готово! 🎉 Ваш сайт будет доступен в течение 1-2 минут**

### Вариант 2: Развёртывание через Vercel CLI

```bash
# Установите Vercel CLI (глобально)
npm install -g vercel

# Войдите в свой аккаунт Vercel
vercel login

# Развёртывание
cd /Users/product/Desktop/moo-landing
vercel
```

Следуйте подсказкам и выберите `Deploy to production`.

### Вариант 3: Развёртывание через Vercel Dashboard

1. Перейдите на [vercel.com/dashboard](https://vercel.com/dashboard)
2. Нажмите "Add New..." → "Project"
3. Выберите "Import Git Repository"
4. Авторизуйте GitHub
5. Выберите `moo-landing` репозиторий
6. Нажмите "Import"
7. Нажмите "Deploy"

## 📍 Где будет ваш сайт?

После развёртывания сайт будет доступен по адресу:

```
https://moo-landing.vercel.app
```

Или если вы добавите свой домен:

```
https://ваш-домен.com
```

## 🎯 Добавить собственный домен

1. В Vercel Dashboard → Settings → Domains
2. Добавьте свой домен
3. Обновите DNS записи (инструкции будут в Vercel)
4. Домен будет активен через 5 минут

## ✨ Что включено в этот проект

- ✅ Next.js 16 с Turbopack
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion (анимации)
- ✅ Оптимизированные изображения
- ✅ Responsive дизайн
- ✅ Готово к production

## 🔄 Как обновлять сайт

После развёртывания на Vercel просто делайте commit и push на GitHub:

```bash
git add .
git commit -m "Ваше изменение"
git push origin main
```

Vercel автоматически пересоберёт и обновит сайт! 🎉

## 📞 Поддержка

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: [github.com/vercel/next.js/issues](https://github.com/vercel/next.js/issues)
