#!/bin/bash

# Параметры подключения к базе данных
DB_USER="test"
DB_PASSWORD="12345"
DB_HOST="127.0.0.1"  # Или IP-адрес вашего сервера PostgreSQL
DB_NAME="test_db"
DB_PORT="5432"       # Порт, на котором запущен сервер PostgreSQL


# Путь к файлу резервной копии
BACKUP_FILE="/root/pandora-crm-back/backup/backup_$(date +'%Y-%m-%d-%H-%M-%S').dump"


# Проверяем существует ли файл с резервной копией
if [ -f "$BACKUP_FILE" ]; then
    read -p "gzip: $BACKUP_FILE already exists; do you wish to overwrite (y or n)? " yn
    case $yn in
        [Yy]* ) ;;
        * ) exit;;
    esac
fi

# Создаем директорию для резервной копии, если она не существует
mkdir -p "$(dirname "$BACKUP_FILE")"

# Создаем резервную копию базы данных
PGPASSFILE=~/.pgpass pg_dump -Fc -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME -f $BACKUP_FILE

# Проверяем успешность создания резервной копии
if [ $? -eq 0 ]; then
    echo "Резервная копия базы данных успешно создана в файле: $BACKUP_FILE"
    
    # Опционально: Сжимаем дамп
    gzip $BACKUP_FILE
    
    # Отправляем дамп по почте
    mail -s "Database Backup" yengliksalamatova@gmail.com < $BACKUP_FILE.gz
    
    # Проверяем успешность отправки
    if [ $? -eq 0 ]; then
        echo "Резервная копия базы данных успешно отправлена по электронной почте."
        
        # # Опционально: Удаляем источник дампа
        # rm $BACKUP_FILE.gz
    else
        echo "Ошибка при отправке резервной копии базы данных по электронной почте."
    fi
else
    echo "Ошибка при создании резервной копии базы данных."
fi
