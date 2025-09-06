import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 🟢 صفحه اصلی
app.get("/", (req, res) => {
  res.send("بک‌اند ویش سبز در حال اجرا ✅");
});

// 🟢 ثبت‌نام کاربر جدید
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطا در ساخت کاربر" });
  }
});

// 🟢 ساخت آگهی
app.post("/post", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطا در ساخت آگهی" });
  }
});

// 🟢 گرفتن همه آگهی‌ها
app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
});

// 🟢 سرور روی پورت 3000 یا Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
