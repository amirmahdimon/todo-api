#!/bin/bash

# ✅ توکن را از پاسخ لاگین بگیر و در این متغیر قرار بده
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6..."  # اینو بعد از لاگین تغییر بده

# =====================
# 🔐 1. ثبت‌نام کاربر
# =====================
echo "📤 Registering user..."
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "123456"}'
echo -e "\n"

# =====================
# 🔐 2. ورود کاربر (Login)
# =====================
echo "🔐 Logging in..."
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "123456"}'
echo -e "\n\n📌 توکن JWT بالا رو کپی کن و در متغیر TOKEN جایگزین کن."

# =====================
# ✅ 3. ساخت تسک
# =====================
echo "📝 Creating a task..."
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "تمرین ریاضی"}'
echo -e "\n"

# =====================
# 📄 4. دریافت لیست تسک‌ها
# =====================
echo "📋 Fetching tasks list..."
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

# =====================
# ✏️ 5. ویرایش تسک
# =====================
echo "✏️ Updating a task..."
TASK_ID="<TASK_ID>"  # آیدی واقعی تسک را اینجا بگذار
curl -X PUT http://localhost:5000/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "تمرین فیزیک"}'
echo -e "\n"

# =====================
# ✅ 6. کامل کردن تسک
# =====================
echo "✅ Marking task as complete..."
curl -X PATCH http://localhost:5000/api/tasks/$TASK_ID/complete \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

# =====================
# ❌ 7. حذف تسک
# =====================
echo "❌ Deleting task..."
curl -X DELETE http://localhost:5000/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"
