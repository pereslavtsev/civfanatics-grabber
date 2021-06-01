# CivFanatics Grabber

![CircleCI](https://img.shields.io/circleci/build/github/pereslavtsev/civfanatics-grabber/master)
![Coveralls](https://img.shields.io/coveralls/github/pereslavtsev/civfanatics-grabber)

Simple resource parser for [CivFanatics Forums](https://forums.civfanatics.com/).

```typescript
import api from 'civfanatics-grabber';

const resource = await api.downloads.getResource(12345);
```
