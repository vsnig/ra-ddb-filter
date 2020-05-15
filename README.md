# ra-ddb-filter

DynamoDB filtering for react-admin getList requests

Usage:
```javascript
  const { makeFilterVals } = require('ra-ddb-filter')
  ...
  const filterVals = makeFilterVals(filter) // filter that react admin sends via its dataProvider ( {"ids":[["..."],["..."]]} )

  const params = {
  TableName: tableName,
  FilterExpression: `... ${filterVals.expression}`,
  ExpressionAttributeNames: { ..., ...filterVals.attrNames },
  ExpressionAttributeValues: { ..., ...filterVals.attrVals },
  }
  const { Items } = await this.docClient.scan(params).promise()
```


