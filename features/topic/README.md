# Topic

## Current Responsibilities

- Topic domain model (`Topic`, `NewTopic`) backed by the `topics` database table.
- Topic retrieval via `getTopics()`, returning all topics sorted alphabetically.
- Presentational Topic UI: `TopicChip` (single topic display, active/inactive, optional selection) and `TopicList` (horizontal collection of topics).

## Future Responsibilities

- Pin ↔ Topic relationship (many-to-many join table).
- Topic-based feeds (pins filtered by topic).
- Topic search.
- Related Pins informed by shared topics.
- Recommendations based on topic affinity.
- Personalization based on user interests.
- Trending topics.