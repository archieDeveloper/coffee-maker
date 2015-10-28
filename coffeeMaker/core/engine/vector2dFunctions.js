(function() {

    //создание вектора
    var vector2dCreate = function(x,y){
        return new CMVector2d(x,y);
    };

    //сложение векторов
    var vector2dAdd = function(a,b){
        var cx = a.x + b.x,
            cy = a.y + b.y;
        return new CMVector2d(cx,cy);
    };

    //вычитание векторов
    var vector2dSub = function(a,b){
        var cx = a.x - b.x,
            cy = a.y - b.y;
        return new CMVector2d(cx,cy);
    };

    //умножение вектора на скаляр
    var vector2dMul = function(a,scalar){
        var cx = a.x * scalar,
            cy = a.y * scalar;
        return new CMVector2d(cx,cy);
    };

    //деление вектора на скаляр
    var vector2dDiv = function(a,scalar){
        var cx = a.x / scalar,
            cy = a.y / scalar;
        return new CMVector2d(cx,cy);
    };

    //умножение векторов
    var vector2dMulScalar = function(a,b){
        var cx = a.x * b.x,
            cy = a.y * b.y;
        return cx+cy;
    };

    //длина вектора
    var vector2dLength = function(a){
        return Math.sqrt(a.x*a.x+a.y*a.y);
    };

    //нормализация вектора
    var vector2dNormalize = function(a){
        var len = vector2dLength(a),
            bx = a.x / len,
            by = a.y / len;
        return new CMVector2d(bx,by);
    };

    //проецирование вектора
    var vector2dProjection = function(a,b){
        var c = vector2dNormalize(b),
            scl = vector2dMulScalar(a,b);
        return vector2dMul(c,scl);
    };

    //поворот вектора
    var vector2dRotate = function(a){
        return Math.atan2(a.y,a.x)*180/Math.PI;
    };

    window.vector2dCreate = vector2dCreate;
    window.vector2dAdd = vector2dAdd;
    window.vector2dSub = vector2dSub;
    window.vector2dMul = vector2dMul;
    window.vector2dDiv = vector2dDiv;
    window.vector2dMulScalar = vector2dMulScalar;
    window.vector2dLength = vector2dLength;
    window.vector2dNormalize = vector2dNormalize;
    window.vector2dProjection = vector2dProjection;
    window.vector2dRotate = vector2dRotate;

})();