(function () {

    var control = {
        create: function () {
            this.gridX = 32;
            this.gridY = 32;

            this.arrBox = [];
            this.code = '';
        },
        step: function() {
            //whatKey();

            if (isKeyPressed(39)) {
                room.view[0].x += 5;
            }

            if (isKeyPressed(37)) {
                room.view[0].x -= 5;
            }

            if (isKeyPressed(38)) {
                room.view[0].y -= 5;
            }

            if (isKeyPressed(40)) {
                room.view[0].y += 5;
            }

            if (isKeyPressed(16) && isMousePressed(1)) {
                this.boxX = (Math.ceil((mouseX+room.view[0].x)/this.gridX)*this.gridX)-(this.gridX/2);
                this.boxY = (Math.ceil((mouseY+room.view[0].y)/this.gridY)*this.gridY)-(this.gridY/2);
                this.newBox = instanceCreate('box', this.boxX, this.boxY);

                this.fCreat = true;
                if (o.box != null) {
                    boxL = o.box.id.length;
                    for (var i = 0; i < boxL; i++) {
                        if (o.box.id[i] != null && this.newBox != null) {
                            if ((o.box.id[i].x === this.newBox.x) && (o.box.id[i].y === this.newBox.y)) {
                                if (o.box.id[i] !== this.newBox) {
                                    instanceDestroy(this.newBox);
                                    this.fCreat = false;
                                }
                            }
                        }
                    }
                    if (this.fCreat === true) {
                        this.arrBox.push(this.newBox);
                    }
                }
                this.newBox = null;
            } else {
                if (isMouseDown(1) && !isMousePressed(3)) {
                    this.boxX = (Math.ceil((mouseX+room.view[0].x)/this.gridX)*this.gridX)-(this.gridX/2);
                    this.boxY = (Math.ceil((mouseY+room.view[0].y)/this.gridY)*this.gridY)-(this.gridY/2);
                    this.newBox = instanceCreate('box', this.boxX, this.boxY);
                }
                if (isMouseUp(1)) {
                    this.fCreat = true;
                    if (o.box != null) {
                        for (var i = 0; i < o.box.id.length; i++) {
                            if (o.box.id[i] != null && this.newBox != null) {
                                if ((o.box.id[i].x === this.newBox.x) && (o.box.id[i].y === this.newBox.y)) {
                                    if (o.box.id[i] !== this.newBox) {
                                        instanceDestroy(this.newBox);
                                        this.fCreat = false;
                                    }
                                }
                            }
                        }
                        if (this.fCreat === true) {
                            this.arrBox.push(this.newBox);
                        }
                    }
                    this.newBox = null;
                }
                if (!isMousePressed(1) && isMousePressed(3)) {
                    this.delBox = collisionPoint('box', (mouseX+room.view[0].x), (mouseY+room.view[0].y));
                    if (this.delBox != null) {
                        instanceDestroy(this.delBox);
                        for (var i = 0; i < this.arrBox.length; i++) {
                            if (this.arrBox[i] === this.delBox) {
                                delete this.arrBox[i];
                            }
                        }
                    }
                }
            }

            if (this.newBox != null) {
                this.boxX = (Math.ceil((mouseX+room.view[0].x)/this.gridX)*this.gridX)-(this.gridX/2);
                this.boxY = (Math.ceil((mouseY+room.view[0].y)/this.gridY)*this.gridY)-(this.gridY/2);
                this.newBox.x = this.boxX;
                this.newBox.y = this.boxY;
            }

            if (isKeyDown(81)) {
                this.code = 'objects: [\n';
                for (var i = 0; i < this.arrBox.length; i++) {
                    if (this.arrBox[i] != null) {
                        this.code = this.code+'\t[\'box\', '+this.arrBox[i].x+','+this.arrBox[i].y+']'+(i === this.arrBox.length-1 ? '\n' : ',\n');
                    }
                }
                this.code = this.code + ']';
                console.log(this.code);
            }
        },
        draw: function() {
            //setMyCursor(s.cursor);
        },
        destroy: function() {
        }
    }

    if (window.objects == null) {
        window.objects = {};
    }

    window.objects.control = control;

})();