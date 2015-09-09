# winston-null
Null Logger transport for winston, it basically swallow all your logs so nothing is logged, good for test environment.

## Usage

~~~
var winston = require('winston');
var NullTransport = require('winston-null');
winston.add(NullTransport);

// after this all of your log will be lost
~~~

## Development

~~~
git clone https://github.com/rbudiharso/winston-null.git
cd winston-null
npm install
npm test
~~~
