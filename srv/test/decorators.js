function test(v) {
    return ()=>{
        console.log(v);
    }
}

@test("class")
class Clz {
    constructor() {
        this.name = "123";
    }
    @test('fun')
    ttt(){}
}