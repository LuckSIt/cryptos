# Развёртывание на Timeweb (рядом с другим Docker-приложением)

## Пошаговая загрузка и запуск на сервере

### Шаг 1. Подключиться к серверу по SSH

В терминале (PowerShell, Git Bash или любой SSH-клиент):

```bash
ssh пользователь@IP_ВАШЕГО_СЕРВЕРА
```

(Логин и IP вы берёте в панели Timeweb. Пароль или ключ — как настроено.)

---

### Шаг 2. Загрузить проект на сервер

**Вариант А — через Git (если репозиторий уже на GitHub/GitLab):**

```bash
cd ~
git clone https://github.com/ВАШ_ЛОГИН/cryptos.git
cd cryptos
```

**Вариант Б — через SCP с вашего компьютера (из папки, где лежит проект):**

На **вашем ПК** в терминале:

```bash
scp -r C:\Users\Vladimir\WebstormProjects\cryptos пользователь@IP_СЕРВЕРА:~/cryptos
```

Потом на сервере:

```bash
cd ~/cryptos
```

**Вариант В — архивом:**  
Упакуйте папку `cryptos` в zip, залейте через файловый менеджер Timeweb в домашнюю папку, на сервере распакуйте: `unzip cryptos.zip && cd cryptos`.

---

### Шаг 3. Убедиться, что на сервере есть Docker и Docker Compose

На сервере выполните:

```bash
docker --version
docker compose version
```

Если команд нет — установите Docker по [официальной инструкции](https://docs.docker.com/engine/install/) (для Ubuntu: `curl -fsSL https://get.docker.com | sh`, затем `sudo usermod -aG docker $USER` и перелогиньтесь).

---

### Шаг 4. Собрать образ

В папке проекта на сервере:

```bash
cd ~/cryptos
docker compose -p cryptos build
```

Дождитесь окончания сборки (первый раз может занять несколько минут).

---

### Шаг 5. Запустить контейнер

```bash
docker compose -p cryptos up -d
```

Проверьте, что контейнер запущен:

```bash
docker compose -p cryptos ps
```

Должен быть контейнер `cryptos-web` в статусе `running`.

---

### Шаг 6. Открыть сайт в браузере

Перейдите по адресу:

**http://IP_ВАШЕГО_СЕРВЕРА:3001**

(Порт 3001 указан в `docker-compose.yml`, чтобы не конфликтовать с другим приложением на 80.)

---

### Шаг 7. Обновление после изменений в коде

После правок в проекте снова залейте файлы на сервер (git pull, или scp, или новый архив), затем на сервере:

```bash
cd ~/cryptos
docker compose -p cryptos build
docker compose -p cryptos up -d
```

---

### Остановка приложения

```bash
cd ~/cryptos
docker compose -p cryptos down
```

---

## Как не конфликтовать с другим приложением

1. **Отдельный проект Compose**  
   У этого приложения имя проекта `cryptos`. Контейнеры и сети будут с префиксом `cryptos-`, и они не пересекутся с другим фулстеком.

2. **Другой порт**  
   Приложение слушает порт **3001** (внутри контейнера — 80). Ваш фулстек может продолжать использовать 80/443.

## Сборка и запуск на сервере

```bash
cd /path/to/cryptos
docker compose -p cryptos build
docker compose -p cryptos up -d
```

Проверка: `http://ВАШ_СЕРВЕР:3001`

## Остановка

```bash
docker compose -p cryptos down
```

## Вариант: оба сайта по 80/443 (разные домены)

Если нужно, чтобы этот сайт был по своему домену на 80/443:

1. Оставьте текущий фулстек как есть (например, на 80).
2. На хосте поднимите nginx (или другой reverse proxy) и настройте виртуальные хосты:
   - `fullstack.example.com` → `localhost:80` (ваш текущий контейнер)
   - `cryptos.example.com` → `localhost:3001` (контейнер cryptos-web)
3. Либо перенесите оба за один nginx на хосте и проксируйте по доменам в нужные порты контейнеров.

## Переменные окружения

Сборка статики не требует env. Если появятся переменные для runtime (например, `REACT_APP_*` при сборке), добавьте их в `docker-compose.yml` в секцию `services.web.environment` или в `.env` рядом с compose.

---

## Краткая шпаргалка (на сервере)

```bash
cd ~/cryptos
docker compose -p cryptos build
docker compose -p cryptos up -d
# Сайт: http://IP_СЕРВЕРА:3001

# Остановить:
docker compose -p cryptos down
```
