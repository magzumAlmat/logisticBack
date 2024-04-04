#!/bin/bash

# Параметры подключения к базе данных
DB_USER="test"
DB_PASSWORD="12345"
DB_HOST="localhost"  # Или IP-адрес вашего сервера PostgreSQL
DB_NAME="test_db"
DB_PORT="5432"       # Порт, на котором запущен сервер PostgreSQL

# Запрос у пользователя имени файла резервной копии
read -p "Введите имя файла резервной копии (без расширения): " FILE_NAME

# Запрос у пользователя формата файла резервной копии
read -p "Введите формат файла резервной копии (dump или dump.gz): " FILE_FORMAT

# Формирование пути к файлу резервной копии
BACKUP_FILE="/root/pandora-crm-back/backup/${FILE_NAME}.${FILE_FORMAT}"

# Проверяем существует ли файл с резервной копией
if [ -f "$BACKUP_FILE" ]; then
    # Если файл сжат, то распаковываем его
    if [ "$FILE_FORMAT" == "dump.gz" ]; then
        gunzip -c $BACKUP_FILE > "${BACKUP_FILE%.gz}"
        RESTORE_FILE="${BACKUP_FILE%.gz}"
    else
        RESTORE_FILE=$BACKUP_FILE
    fi
    
    # Восстанавливаем базу данных из резервной копии
    PGPASSFILE=~/.pgpass pg_restore --clean -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME $RESTORE_FILE

    # Проверяем успешность восстановления
    if [ $? -eq 0 ]; then
        echo "База данных успешно восстановлена из резервной копии."
    else
        echo "Ошибка при восстановлении базы данных из резервной копии."
    fi
    
    # Если файл был распакован, удаляем его
    if [ "$FILE_FORMAT" == "dump.gz" ]; then
        rm "${BACKUP_FILE%.gz}"
    fi
else
    echo "Файл резервной копии не найден: $BACKUP_FILE"
fi
