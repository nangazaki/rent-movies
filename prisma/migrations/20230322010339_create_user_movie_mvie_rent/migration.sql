-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL
);
INSERT INTO "new_movies" ("duration", "id", "release_date", "title") SELECT "duration", "id", "release_date", "title" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE UNIQUE INDEX "movies_title_key" ON "movies"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
