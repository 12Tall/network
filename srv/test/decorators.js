function test(guid) {
    console.log("注册方法", guid)
    return (target, name, descriptor) => {
        console.log(target, name, descriptor)
        let origin = target[name];
        // origin();
        console.log(123)
        descriptor.value = function () {
            console.log('guid');
            origin();
        }
        Object.defineProperty(target, name, descriptor)
    }
}

class Clz {
    constructor() {
        this.name = "123";
    }
    @test('fun')
    static m1() {
        console.log('origin')
    }
}

module.exports = { Clz }