#!/usr/bin/env bash
set -e

export SCRIPT_PATH=/docker-entrypoint-initdb.d/
export PGPASSWORD=password
psql -U postgres -f "$SCRIPT_PATH/sql/db-create.sql"
psql -U postgres -f "$SCRIPT_PATH/sql/db/dump_auth.sql"
psql -U postgres -f "$SCRIPT_PATH/sql/db/dump_libraries.sql"
psql -U postgres -f "$SCRIPT_PATH/sql/db/dump_ratings.sql"
psql -U postgres -f "$SCRIPT_PATH/sql/db/dump_reservations.sql"
psql -U postgres -f "$SCRIPT_PATH/sql/db/dump_statistics.sql"
