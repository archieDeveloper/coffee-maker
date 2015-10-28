class Vector2d
    constructor: (@x, @y)->

    add: (b)->
        cx = @x + b.x
        cy = @y + b.y
        new @(cx,cy);

module.exports = Vector2d