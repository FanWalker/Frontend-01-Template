第四周，重学JavaScript|结构化

事件循环，js引擎之外的东西，严格来说事件循环是浏览器或者是node的内容

通过Object C说明事件循环是在JavaScript引擎之外的

微任务：保存在JavaScript的执行队列，在js引擎内部

为什么下面Object C代码中code会返回一个function

	#import <Foundation/Foundation.h>
	#import <JavaScriptCore/JavaScriptCore.h>

	int main(int argc, const char * argv[]) {
		@autoreleasepool {
			JSContext* context = [[JSContext alloc] init];
			JSValue* result;
			NSString* code = @"new Promise(resolve => resolve()).then(() => this.a = 3),function() {return this.a};"
			result = [context evaluateScript:code];
			NSLog(@"%@", [result toString]);
			result = [result callWithArguments:@[]];
			NSLog(@"%@", [result toString]);
		}
		return 0;
	}


因为逗号表达式中，会返回逗号后面的表达式，上面代码中每次执行evaluateScript和callWithArguments都会产生一个宏任务。
问题一：按理说每个promis会产生一个微任务，而function会按顺序执行，结果应该会比promise早一点。
解答：是Object C每调用一次evaluateScript和callWithArguments都会产生一个宏任务，宏任务中的微任务被执行，所以在function被执行时，promise在evaluateScript中已被执行完

宏任务Task1：[context evaluateScript:code]

- new Promise(resolve => resolve()).then(() => this.a = 3)
- this.a = 3 ——> resolve被执行产生的微任务

宏任务Task2：[result callWithArguments:@[]]

- return this.a = 3;


promise是JavaScript提供结构化的一种机制，一个额外的resolve会产生一个微任务，一个宏任务可以是一个代码片段，一个函数调用

当前宏任务中的微任务执行完之后才会执行下一个宏任务