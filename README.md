# ResumeGenie & ID Creator

Client-side ATS-friendly CV builder, student ID card generator, and skill badge tracker with bilingual English and Bengali support, 100% private local storage.

---

## 🚀 GitHub-এ Host / Deploy করার নিয়ম (GitHub Pages Setup Guide)

এই প্রোজেক্টটি **GitHub Pages**-এ হোস্ট করার জন্য সম্পূর্ণ প্রস্তুত করা হয়েছে (`base: './'`, SPA 404 fallback, এবং Automated GitHub Actions Workflow যুক্ত করা আছে)।

### ধাপ ১: গিট রিপোজিটরি তৈরি ও কোড পুশ করুন (Push to GitHub)

আপনার কম্পিউটারে টার্মিনালে নিচের কমান্ডগুলো চালান:

```bash
# গিট ইনিশিয়ালাইজ করুন (যদি করা না থাকে)
git init

# সব ফাইল অ্যাড করুন
git add .

# কমিট করুন
git commit -m "feat: initial commit ready for GitHub Pages hosting"

# ব্রাঞ্চের নাম main করুন
git branch -M main

# আপনার GitHub রিপোজিটরির লিঙ্ক যুক্ত করুন (আপনার ইউজারনেম ও রেপোর নাম দিন)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# গিটহাবে পুশ করুন
git push -u origin main
```

---

### ধাপ ২: GitHub Pages চালু করুন (Enable GitHub Pages in Settings)

১. গিটহাবে আপনার রিপোজিটরি পেজে যান।
২. উপরে **Settings** ট্যাবে ক্লিক করুন।
৩. বাঁ পাশের মেনু থেকে **Pages** সিলেক্ট করুন।
৪. **Build and deployment** সেকশনের নিচে **Source** ড্রপডাউনে:
   - **GitHub Actions** সিলেক্ট করুন।

> ⚡ **হয়ে গেল!** আপনার `.github/workflows/deploy.yml` স্বয়ংক্রিয়ভাবে কোড বিল্ড করে GitHub Pages-এ লাইভ করে দেবে। কয়েক মুহূর্ত পর আপনি `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/` লিঙ্কে আপনার ওয়েবসাইট দেখতে পাবেন।

---

## 🛠️ লোকাল ডেভেলপমেন্ট (Local Development)

GitHub Pages-এর **Source** অবশ্যই **GitHub Actions** রাখতে হবে, যাতে production
build-এর `dist` artifact deploy হয়।

```bash
# ডিপেন্ডেন্সি ইন্সটল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# প্রোডাকশন বিল্ড তৈরি করুন
npm run build
```
