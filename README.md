# SRM-ui SRM组内组件封装

使用Typescript, ~~React Hooks~~，基于material-ui，对基础组件以及业务组件进行进一步封装

## How to use

### dev

1. 在此项目下运行
```bash
yarn link
```
2. 在需要使用组件的测试项目下运行
```bash
yarn link srm-ui
```
3. 测试项目可使用以下方式引用组件
```javascript
import {Pager} from 'srm-ui';
```

### npm (not available now)

```bash
npm install srm-ui
```

## Userful Scripts

### 增加组件自动化命令
会根据组件类型和组件名称创建文档以及源代码目录/文件，并更新README文档
```bash
npm run add ['basic'|'sprite'] [componentName]
```
'basic'代表基础组件
'sprite'代表业务组件
例1: 增加Button基础组件
```bash
npm run add basic Button
```
例2: 增加TaskList业务组件
```bash
npm run add sprite TaskList
```
## 基础组件

1. 分页器 Pager [Pager.md](./docs/Pager.md)
2. 表格 Table [Table.md](./docs/Table.md)


## 业务组件

