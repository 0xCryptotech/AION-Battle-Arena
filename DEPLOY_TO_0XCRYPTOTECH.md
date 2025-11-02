# 🚀 Deploy ke 0xCryptotech Account

## 📋 Langkah-langkah Deploy

### 1. Logout dari Akun Saat Ini
```bash
vercel logout
```

### 2. Login ke Akun 0xCryptotech
```bash
vercel login
```
- Masukkan email yang terkait dengan akun `0xcryptotechs-projects`
- Verifikasi via email

### 3. Deploy ke Production
```bash
cd "/Users/idcuq/Documents/AION on Polygon/aion-prediction-market-master"
vercel --prod --yes
```

### 4. Set Domain (Opsional)
Setelah deploy berhasil, set domain via dashboard:
- https://vercel.com/0xcryptotechs-projects
- Pilih project `aion-battle-arena`
- Settings → Domains → Add `aion-battle-arena.vercel.app`

## 🔄 Atau Deploy Manual via Dashboard

1. **Buka Vercel Dashboard**
   - https://vercel.com/0xcryptotechs-projects

2. **Import Project**
   - Klik "Add New..." → "Project"
   - Import dari GitHub atau upload folder

3. **Configure Project**
   - Project Name: `aion-battle-arena`
   - Framework Preset: Other
   - Build Command: (kosongkan)
   - Output Directory: `.`
   - Install Command: (kosongkan)

4. **Deploy**
   - Klik "Deploy"
   - Tunggu hingga selesai

## 📦 Atau Upload ZIP via Dashboard

1. Buat ZIP file (exclude node_modules, .git):
```bash
cd "/Users/idcuq/Documents/AION on Polygon/aion-prediction-market-master"
zip -r aion-battle-arena.zip . -x "node_modules/*" ".git/*" "*.md" "backend/*" "aion-contracts/*"
```

2. Upload di: https://vercel.com/new
3. Pilih "Upload" tab
4. Drag & drop `aion-battle-arena.zip`
5. Deploy

## 🎯 Target URL
https://aion-battle-arena.vercel.app

---

**Current Account**: idcuq-santosos-projects  
**Target Account**: 0xcryptotechs-projects
