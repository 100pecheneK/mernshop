# Магазин на стеке MERN - Mongo Express React Nodejs

Магазин с админкой.

Для запуска необходим сервер монго. (mongodb://localhost:27017)

Контент магазина настраивается из админки.


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

# MERN SHOP

## API

### AUTH

#### Get auth user
> GET /api/admin/auth
- Auth

#### Authenticate user & get token
> POST /api/admin/auth
- Auth

### USERS

#### Создание админа или работника
> POST /api/admin/users
- Admin

#### Список работников и админов по perPage||10 на page||1
> GET /api/admin/users/list/:page/:perPage
- Admin

#### Просмотр сотрудника или админа по id
> GET /api/admin/users/:id
- Admin

#### Удаление сотрудника или админа по id
> DELETE /api/admin/users/:id
- Admin

### Goods

#### Просмотр товаров
> GET /api/admin/goods
- Auth

#### Просмотр товара по id
> GET /api/admin/goods/:id
- Auth

#### Создание товаров
> POST /api/admin/goods
- Auth

#### Изменение товара по id
> PATCH /api/admin/goods/:id
- Auth

#### Удаление товара по id
> DELETE /api/admin/goods/id
- Auth


### Category

#### Просмотр категорий
> GET /api/admin/categories
- Auth

#### Создание категории
> POST /api/admin/goods
- Auth

#### Просмотр категории по id
> GET /api/admin/categories/id
- Auth

#### Изменение категории по id
> PATCH /api/admin/categories/id
- Auth

#### Удаление категории по id
> DELETE /api/admin/categories/id
- Auth

### News


### Feedback
