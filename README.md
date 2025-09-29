# Bookshop Frontend (React + Vite)


## คำอธิบาย
แอปตัวอย่างนี้เป็น Front-end สำหรับจัดการร้านหนังสือ โดยติดต่อกับ REST API (backend) เพื่อทำ CRUD บน `items` (ตาม class diagram ที่ให้มา)


## การติดตั้ง
1. วางไฟล์ตามโครงสร้าง
2. ตั้งค่า BASE URL ถ้าจำเป็นใน `src/services/api.js` หรือกำหนด environment variable: `VITE_API_BASE_URL` เช่น
- Windows (PowerShell): $env:VITE_API_BASE_URL = "https://your-api"
- Linux/macOS: export VITE_API_BASE_URL="https://your-api"
3. รัน:
```bash
npm install
npm run dev
```


## หมายเหตุ
- API ที่ใช้อ้างอิงสามารถดูรายละเอียดได้ที่: https://bookshop-api-er7t.onrender.com/api-docs
- โครงสร้างข้อมูลหลักจะสอดคล้องกับคลาส `Item` และ subclass (Book, Journal, Comic). หาก backend ต้องการฟิลด์เฉพาะ (เช่น `edition`, `issn`, `series`) สามารถขยายฟอร์มโดยเพิ่ม input ตามต้องการ


// End of project files