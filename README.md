# CivFanatics Grabber

![NPM](https://img.shields.io/npm/l/civfanatics-grabber)
![npm](https://img.shields.io/npm/v/civfanatics-grabber)
![CircleCI](https://img.shields.io/circleci/build/github/pereslavtsev/civfanatics-grabber/master)
![Coveralls](https://img.shields.io/coveralls/github/pereslavtsev/civfanatics-grabber)
![Codacy branch grade](https://img.shields.io/codacy/grade/ab07b3eddb5d4e058cf37cbb4ead919c/master)

Simple resource parser for [CivFanatics Forums](https://forums.civfanatics.com/).

## Install
```shell
npm i civfanatics-grabber
```
or using yarn:
```shell
yarn add civfanatics-grabber
```
## Usage

```typescript
import api from 'civfanatics-grabber';

const resource = await api.downloads.getResource(12345);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
