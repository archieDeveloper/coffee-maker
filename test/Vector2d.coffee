chai = require 'chai'
do chai.should
assert = chai.assert

Vector2d = require '../source/core/class/Vector2d'

describe '#Vector2d', ->

  describe '#constructor', ->
    vector2d = new Vector2d
    it 'Иницилизация вектора без параметров', ->
      assert.instanceOf vector2d, Vector2d, 'Не является экземпляром класса Vector2d'
    it 'Имеет свойства X и Y', ->
      assert.property vector2d, 'x', 'Нет свойства X'
      assert.property vector2d, 'y', 'Нет свойства Y'
    it 'Свойсвта X и Y равны 0', ->
      assert.propertyVal vector2d, 'x', 0, 'Свойство X не равно 0'
      assert.propertyVal vector2d, 'y', 0, 'Свойство Y не равно 0'

  describe '#constructor 2, 8', ->
    vector2d = new Vector2d 2, 8
    it 'Иницилизация вектора с параментрами 2 и 8', ->
      assert.instanceOf vector2d, Vector2d, 'Не является экземпляром класса Vector2d'
    it 'Имеет свойства X и Y', ->
      assert.property vector2d, 'x', 'Нет свойства X'
      assert.property vector2d, 'y', 'Нет свойства Y'
    it 'Свойсвта X и Y равны 2 и 8', ->
      assert.propertyVal vector2d, 'x', 2, 'Свойство X не равно 2'
      assert.propertyVal vector2d, 'y', 8, 'Свойство Y не равно 8'

  describe '#clone', ->
    vector2d = undefined
    beforeEach ->
      vector2d = new Vector2d 2, 8
    it 'Возвращается копия объекта, который вызывал метод clone', ->
      newVector2d = do vector2d.clone
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.notStrictEqual newVector2d, vector2d, 'Является тем же самым объектом'
    it 'Клонирование вектора', ->
      newVector2d = do vector2d.clone
      assert.strictEqual newVector2d.x, vector2d.x, 'Не правильный результат клонирования в свойстве X'
      assert.strictEqual newVector2d.y, vector2d.y, 'Не правильный результат клонирования в свойстве Y'
      assert.strictEqual vector2d.x, 2, 'Клонирование не должно изменять у оригинального объекта свойство X'
      assert.strictEqual vector2d.y, 8, 'Клонирование не должно изменять у оригинального объекта свойство Y'

  describe '#add', ->
    firstVector2d = new Vector2d
    secondVector2d = new Vector2d
    beforeEach ->
      firstVector2d = new Vector2d 2, 8
      secondVector2d = new Vector2d 5, 6
    it 'Возвращается объект который вызывал метод add', ->
      newVector2d = firstVector2d.add secondVector2d
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, firstVector2d, 'Не является тем же самым объектом'
    it 'Сложение векторов', ->
      cloneSecondVector2d = do secondVector2d.clone
      firstVector2d.add secondVector2d
      assert.strictEqual firstVector2d.x, 2+5, 'Не правильный результат сложения в свойстве X'
      assert.strictEqual firstVector2d.y, 8+6, 'Не правильный результат сложения в свойстве Y'
      assert.strictEqual cloneSecondVector2d.x, secondVector2d.x, 'Сложение не должно изменять свойство X у входящего вектора'
      assert.strictEqual cloneSecondVector2d.y, secondVector2d.y, 'Сложение не должно изменять свойство Y у входящего вектора'

  describe '#sub', ->
    firstVector2d = new Vector2d
    secondVector2d = new Vector2d
    beforeEach ->
      firstVector2d = new Vector2d 2, 8
      secondVector2d = new Vector2d 5, 6
    it 'Возвращается объект который вызывал метод sub', ->
      newVector2d = firstVector2d.sub secondVector2d
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, firstVector2d, 'Не является тем же самым объектом'
    it 'Вычитание векторов', ->
      cloneSecondVector2d = do secondVector2d.clone
      firstVector2d.sub secondVector2d
      assert.strictEqual firstVector2d.x, 2-5, 'Не правильный результат вычитание в свойстве X'
      assert.strictEqual firstVector2d.y, 8-6, 'Не правильный результат вычитания в свойстве Y'
      assert.strictEqual cloneSecondVector2d.x, secondVector2d.x, 'Вычитание не должно изменять свойство X у входящего вектора'
      assert.strictEqual cloneSecondVector2d.y, secondVector2d.y, 'Вычитание не должно изменять свойство Y у входящего вектора'

  describe '#mul', ->
    vector2d = new Vector2d 2, 8
    scalar = 3
    beforeEach ->
      vector2d = new Vector2d 2, 8
      scalar = 3
    it 'Возвращается объект который вызывал метод mul', ->
      newVector2d = vector2d.mul scalar
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, vector2d, 'Не является тем же самым объектом'
    it 'Умножение на скаляр', ->
      vector2d.mul scalar
      assert.strictEqual vector2d.x, 2*3, 'Не правильный результат умножения в свойстве X'
      assert.strictEqual vector2d.y, 8*3, 'Не правильный результат умножения в свойстве Y'

  describe '#div', ->
    vector2d = new Vector2d 2, 8
    scalar = 3
    beforeEach ->
      vector2d = new Vector2d 2, 8
      scalar = 3
    it 'Возвращается объект который вызывал метод div', ->
      newVector2d = vector2d.div scalar
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, vector2d, 'Не является тем же самым объектом'
    it 'Деление на скаляр', ->
      vector2d.div scalar
      assert.strictEqual vector2d.x, 2/3, 'Не правильный результат деления в свойстве X'
      assert.strictEqual vector2d.y, 8/3, 'Не правильный результат деления в свойстве Y'

  describe '#mulScalar', ->
    firstVector2d = new Vector2d 2, 8
    secondVector2d = new Vector2d 5, 6
    beforeEach ->
      firstVector2d = new Vector2d 2, 8
      secondVector2d = new Vector2d 5, 6
    it 'Возвращается объект который вызывал метод div', ->
      newVector2d = firstVector2d.mulScalar secondVector2d
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, firstVector2d, 'Не является тем же самым объектом'
    it 'Скалярное умножение векторов', ->
      cloneSecondVector2d = do secondVector2d.clone
      firstVector2d.mulScalar secondVector2d
      assert.strictEqual firstVector2d.x, 2*5, 'Не правильный результат умножения в свойстве X'
      assert.strictEqual firstVector2d.y, 8*6, 'Не правильный результат умножения в свойстве Y'
      assert.strictEqual cloneSecondVector2d.x, secondVector2d.x, 'Умножение векторов не должно изменять свойство X у входящего вектора'
      assert.strictEqual cloneSecondVector2d.y, secondVector2d.y, 'Умножение векторов не должно изменять свойство Y у входящего вектора'

  describe '#length', ->
    vector2d = new Vector2d 2, 8
    it 'Вычисление длинны вектора', ->
      cloneVector2d = do vector2d.clone
      vector2dLength = do vector2d.length
      assert.isNumber vector2dLength, 'Не является числом'
      assert.strictEqual vector2dLength, Math.sqrt(2 * 2 + 8 * 8), 'Не правильный результат вычисления длинны'
      assert.strictEqual cloneVector2d.x, vector2d.x, 'Вычисление длинны не должно изменять свойство X у вектора'
      assert.strictEqual cloneVector2d.y, vector2d.y, 'Вычисление длинны не должно изменять свойство Y у вектора'

  describe '#normalize', ->
    x = undefined
    y = undefined
    vector2d = undefined
    beforeEach ->
      x = 0
      y = 234
      vector2d = new Vector2d x, y
    it 'Возвращается объект который вызывал метод normalize', ->
      newVector2d = do vector2d.normalize
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, vector2d, 'Не является тем же самым объектом'
    it 'Нормализация вектора', ->
      do vector2d.normalize
      vector2dLenght = Math.sqrt(x * x + y * y)
      assert.strictEqual vector2d.x, x/vector2dLenght, 'Не правильный результат нормализации в свойстве X'
      assert.strictEqual vector2d.y, y/vector2dLenght, 'Не правильный результат нормализации в свойстве Y'
      assert.operator vector2d.x, '<=', 1, 'Вектор после нормализации не может быть больше 1 - свойство X'
      assert.operator vector2d.y, '<=', 1, 'Вектор после нормализации не может быть больше 1 - свойство Y'
      assert.operator vector2d.x, '>=', -1, 'Вектор после нормализации не может быть меньше -1 - свойство X'
      assert.operator vector2d.y, '>=', -1, 'Вектор после нормализации не может быть больше -1 - свойство Y'
    it 'Нормализация нулевого вектора', ->
      vector2d = new Vector2d
      do vector2d.normalize
      assert isNaN(vector2d.x), 'Не правильный результат нормализации в свойстве X'
      assert isNaN(vector2d.y), 'Не правильный результат нормализации в свойстве Y'

  describe '#projection', ->
    firstVector2d = undefined
    secondVector2d = undefined
    beforeEach ->
      firstVector2d = new Vector2d 2, 4
      secondVector2d = new Vector2d 5, 8
    it 'Возвращается объект который вызывал метод projection', ->
      newVector2d = firstVector2d.projection secondVector2d
      assert.instanceOf newVector2d, Vector2d, 'Не является экземпляром класса Vector2d'
      assert.strictEqual newVector2d, firstVector2d, 'Не является тем же самым объектом'
    it 'Проецирует вектор', ->
      cloneSecondVector2d = do secondVector2d.clone
      firstVector2d.projection secondVector2d
      a = (2 * 5)+(4 * 8)
      b = (5*5)+(8*8)
      c = a / b
      assert.strictEqual firstVector2d.x, c * secondVector2d.x, 'Не правильный результат нормализации в свойстве X'
      assert.strictEqual firstVector2d.y, c * secondVector2d.y, 'Не правильный результат нормализации в свойстве Y'
      assert.strictEqual cloneSecondVector2d.x, secondVector2d.x, 'Вычисление проекции не должно изменять свойство X у входящего вектора'
      assert.strictEqual cloneSecondVector2d.y, secondVector2d.y, 'Вычисление проекции не должно изменять свойство Y у входящего вектора'