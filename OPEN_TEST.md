# 🧪 Open Simple Test

## Step 1: Pastikan Server Running

```bash
# Check if server is running
lsof -i :3002
```

Jika tidak ada output, start server:
```bash
cd "/Users/idcuq/Documents/AION on Polygon/aion-prediction-market-master"
python3 -m http.server 3002
```

## Step 2: Open in Browser

**Copy dan paste URL ini ke browser:**

```
http://localhost:3002/test-simple.html
```

## Step 3: What You Should See

### ✅ SUCCESS:
- Green box with "Test Passed!"
- BTC Price showing (e.g., $95,234.56)
- "Source: Pyth Network"

### ❌ FAILED:
- Red box with error message
- Check browser console (F12)

## Quick Commands

### macOS:
```bash
open http://localhost:3002/test-simple.html
```

### Manual:
1. Open browser
2. Go to: `localhost:3002/test-simple.html`
3. Wait 2-5 seconds
4. See result!

---

**Current Status**: Server on port 3002 ✅
**Test Page**: test-simple.html ✅
**Ready**: YES 🚀
