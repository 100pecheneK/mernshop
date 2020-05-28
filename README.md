# News 

- @route   GET /api/news
- @desc    Просмотр 10 последних новостей
- @access  Public

---

- @route   GET /api/news/list/:page
- @desc    Просмотр 10 последних новостей на page
- @access  Public

---

- @route   GET /api/news/detail/:id
- @desc    Просмотр новости
- @access  Public

---

- @route   PUT /api/admin/news
- @desc    Добавление новости
- @access  Private

---

- @route   DELETE /api/admin/news/:id
- @desc    Добавление новости
- @access  Private

# Feedback

- @route   PUT /api/feedback
- @desc    Добавление обратной связи
- @access  Public

---

- @route   GET /api/admin/feedback/list/:page
- @desc    Просмотр 10 последних обратных связей на page
- @access  Private

---

- @route   GET /api/admin/feedback/detail/:id
- @desc    Просмотр обратной связи
- @access  Private

# Users

- @route   POST /api/admin/users
- @desc    Создание админа или работника
- @access  Private Admin

---

- @route   GET /api/admin/users/list/:page
- @desc    Список работников и админов по 10 на page
- @access  Private Admin

---

- @route   GET /api/admin/users/detail/:id
- @desc    Просмотр сотрудника или админа
- @access  Private Admin

---

- @route   DELETE /api/admin/users/detail/:id
- @desc    Удаление сотрудника или админа
- @access  Private Admin

# Goods

- @route   GET /api/goods/
- @desc    Просмотр 10 товаров
- @access  Public

---

- @route   GET /api/goods/list/:category/:page
- @desc    Просмотр 10 товаров из category на page
- @access  Public

---

- @route   GET /api/goods/detail/:id
- @desc    Просмотр товара
- @access  Public

---

- @route   GET /api/admin/goods/category
- @desc    Просмотр категорий
- @access  Private

---

- @route   GET /api/admin/goods/list/:category/:page
- @desc    Просмотр 10 товаров на page
- @access  Private

---

- @route   GET /api/admin/goods/detail/:id
- @desc    Просмотр товара
- @access  Private

---

- @route   POST /api/admin/goods/category
- @desc    Создание категории
- @access  Private

---

- @route   POST /api/admin/goods
- @desc    Создание товара
- @access  Private

---

- @route   POST /api/admin/goods/detail/:id
- @desc    Обновление товара
- @access  Private

---

- @route   DELETE /api/admin/goods/detail/:id
- @desc    Удаление товара
- @access  Private

---

- @route   DELETE /api/admin/goods/category
- @desc    Удаление категории
- @access  Private

# Todo ???

- @route   GET /api/admin/todo
- @desc    Просмотр todo залогиненого юзера
- @access  Private

---

- @route   PUT /api/admin/todo
- @desc    Создание todo залогиненого юзера
- @access  Private

---

- @route   DELETE /api/admin/todo/:id
- @desc    Удаление todo залогиненого юзера
- @access  Private