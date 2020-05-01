function test(){
    console.log('require directory');
}

// @test
class test2{
    constructor(){
    }

    // 实例方法可以使用装饰器！
    @test
    hello(){
        console.log('require directory 2')
    }
}
