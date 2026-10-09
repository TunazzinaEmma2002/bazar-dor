# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় নিত্যপণ্যের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের বাজার দর, দামের ওঠানামা এবং বিভিন্ন বাজারের তুলনামূলক দাম দেখার একটি ওয়েব অ্যাপ্লিকেশন।

🔗 **Live:** LIVE_LINK_EKHANE
📦 **GitHub:** https://github.com/TunazzinaEmma2002/bazar-dor

## ✨ প্রধান ফিচার

1. **লাইভ প্রাইস টিকার:** নেভবারের নিচে অসীমভাবে স্ক্রল করা পণ্যের নাম, দাম ও ▲/▼ পরিবর্তন।
2. **আজকের দামের পরিবর্তন:** "দাম বেড়েছে" ও "দাম কমেছে" তালিকায় সবচেয়ে বেশি পরিবর্তনের ৬টি করে পণ্য।
3. **ক্যাটাগরি পেজ ও সর্টিং:** ৮টি ক্যাটাগরি, দাম অনুযায়ী কম-থেকে-বেশি ও বেশি-থেকে-কম সাজানো (সংখ্যা ধরে সর্ট, বাংলা অঙ্কে দেখানো)।
4. **পণ্যের বিস্তারিত পেজ:** ১২টি বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দামের টেবিল, গতকাল/গত সপ্তাহ/গত মাসের তুলনা (শুধু লগইন করা ব্যবহারকারীর জন্য)।
5. **অথেনটিকেশন:** BetterAuth দিয়ে ইমেইল-পাসওয়ার্ড, Google ও GitHub লগইন; প্রোটেক্টেড রুট ও টোস্ট নোটিফিকেশন।
6. **প্রোফাইল আপডেট:** আমার প্রোফাইল পেজ থেকে নাম পরিবর্তন।
7. **সম্পূর্ণ রেসপনসিভ:** মোবাইল, ট্যাবলেট ও ডেস্কটপে কাজ করে; স্কেলিটন লোডিং ও কাস্টম ৪০৪ পেজ আছে।

## 🛠️ ব্যবহৃত প্রযুক্তি

| প্রযুক্তি | কাজ |
|---|---|
| Next.js (App Router) | UI ও রাউটিং |
| TypeScript | টাইপ সেফটি |
| Tailwind CSS + DaisyUI | স্টাইলিং ও রেসপনসিভ ডিজাইন |
| BetterAuth | অথেনটিকেশন |
| MongoDB Atlas | ইউজার ও সেশন ডেটাবেস |
| react-hot-toast | নোটিফিকেশন |
| Vercel | ডিপ্লয়মেন্ট |

## 🚀 লোকালি চালানোর নিয়ম

```bash
git clone https://github.com/TunazzinaEmma2002/bazar-dor.git
cd bazar-dor
npm install
```

প্রজেক্টের রুটে `.env.local` ফাইল বানিয়ে নিচের ভ্যারিয়েবলগুলো দিন:

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

```bash
npm run dev
```

এরপর [http://localhost:3000](http://localhost:3000) খুলুন।

## 🌐 API

ডেটা আসে BazarDor API থেকে: `/products`, `/products?category=chal`, `/categories`।

## 📁 ফোল্ডার কাঠামো

```
src/
├── app/          # পেজ ও রুট (home, category, product, signin, signup, profile)
├── components/   # Navbar, PriceTicker, ProductCard, Hero ইত্যাদি
├── lib/          # api, auth, mongodb, format ইউটিলিটি
└── types/        # TypeScript টাইপ
```