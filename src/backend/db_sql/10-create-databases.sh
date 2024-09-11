#!/usr/bin/env bash
set -e

export SCRIPT_PATH=/docker-entrypoint-initdb.d/
export PGPASSWORD=password
psql -f "$SCRIPT_PATH/sql/db-create.sql"
psql -f "$SCRIPT_PATH/sql/db/dump_auth.sql"
psql -f "$SCRIPT_PATH/sql/db/dump_libraries.sql"
psql -f "$SCRIPT_PATH/sql/db/dump_ratings.sql"
psql -f "$SCRIPT_PATH/sql/db/dump_reservations.sql"
psql -f "$SCRIPT_PATH/sql/db/dump_statistics.sql"
