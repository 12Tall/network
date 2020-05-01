function test(){
    console.log('require directory');
}

// @test
class test2{
    constructor(){
        this.hello = function(){
            console.log('require directory 2')
        }
    }
}

// 如何自动注册路由，装饰器还是要用的，但是使用的时机要考虑好