# Innovation Hub

موقع نادي الابتكار وريادة الأعمال، مع نسخة سطح مكتب لنظام Windows.

## خريطة المشروع

- `artifacts/innovation-club/` — موقع React/Vite الرئيسي.
- `artifacts/mockup-sandbox/` — مساحة تجارب للنماذج والواجهات.
- `artifacts/api-server/` — خادم API باستخدام Express.
- `desktop/innovation-club/` — غلاف Electron لتطبيق Windows.
- `lib/api-client-react/` — عميل API المخصص لـReact.
- `lib/api-spec/` — ملف OpenAPI وتوليد تعريفات API.
- `lib/api-zod/` — مخططات Zod وتعريفات الأنواع.
- `lib/db/` — مخطط قاعدة البيانات وإعدادات Drizzle.
- `scripts/` — سكربتات مساعدة للمشروع.
- `attached_assets/` — الصور والملفات المستخدمة في الواجهة.
- `screenshots/` — لقطات مرجعية للتصميم.

## التشغيل المحلي

من جذر المشروع:

```bash
pnpm install
pnpm --filter @workspace/innovation-club dev
```

يفتح الموقع عادة على `http://localhost:5173`.

## التحقق والبناء

```bash
pnpm typecheck
pnpm --filter @workspace/innovation-club build
```

## تطبيق Windows

```bash
pnpm --filter @workspace/innovation-club-desktop dev
pnpm --filter @workspace/innovation-club-desktop dist:win
```

تتم مشاركة واجهة الموقع بين نسخة المتصفح وتطبيق Windows، لذلك تعديلات الواجهة الأساسية تكون داخل `artifacts/innovation-club/src/`.
