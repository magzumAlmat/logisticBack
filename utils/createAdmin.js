const bcrypt = require("bcrypt");
const User = require("../models/User");

(async () => {
  try {
    const existingAdmin = await User.findOne({ where: { full_name: "admin" } });

    if (!existingAdmin) {
      // Хешируем пароль
      const hashedPassword = await bcrypt.hash("admin_pandora", 10);

      // Создаем администраторский аккаунт
      await User.create({
        full_name: "admin",
        email: "admin@pandora",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created successfully.");
    } else {
      console.log("Admin account already exists.");
    }
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
})();
