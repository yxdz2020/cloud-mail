import { Hono } from 'hono';
const app = new Hono();

import result from '../model/result';
import { cors } from 'hono/cors';

app.use('*', cors());

app.onError((err, c) => {
	if (err.name === 'BizError') {
		console.log(err.message);
	}else {
		console.error(err);
	}

	if (err.message === `Cannot read properties of undefined (reading 'get')`) {
		return c.text('初始化失败:KV数据库未绑定或变量名错误 Initialization failed: KV database not bound or invalid variable name');
	}

	if (err.message === `Cannot read properties of undefined (reading 'put')`) {
		return c.text('初始化失败:KV数据库未绑定或变量名错误 Initialization failed: KV database not bound or invalid variable name');
	}

	if (err.message === `Cannot read properties of undefined (reading 'prepare')`) {
		return c.text('初始化失败:D1数据库未绑定或变量名错误 Initialization failed: D1 database not bound or invalid variable name');
	}

	return c.json(result.fail(err.message, err.code));
});

export default app;


