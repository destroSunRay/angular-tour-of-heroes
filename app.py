from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

heroes = [
    {"id": 12, "name": "Dr. Nice"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr. IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}]


@app.get("/heroes")
def get_heroes():
    name = request.args.get('name', None)
    if not name:
        return jsonify(heroes)
    return jsonify([hero for hero in heroes if name in hero['name'].lower()])


@app.get("/hero/<id>")
def get_hero(id):
    for hero in heroes:
        if hero['id'] == int(id):
            return jsonify(hero)


@app.put("/hero/<int:id>")
def update_hero(id: int):
    for (i, hero) in enumerate(heroes):
        if hero['id'] == id:
            hero = request.json
            heroes[i] = hero
            break
    return jsonify(request.json)


def gen_id():
    return max([hero['id'] for hero in heroes])+1 if len(heroes) > 0 else 11


@app.post("/hero")
def add_hero():
    hero = request.json
    hero['id'] = gen_id()
    heroes.append(hero)
    print(heroes)
    return jsonify(hero), 201


@app.delete("/hero/<int:id>")
def delete_hero(id: int):
    hero = {}
    for i in range(len(heroes)):
        print(i, heroes[i])
        if heroes[i]['id'] == id:
            hero = heroes[i]
            del heroes[i]
            break
    return hero, 202


if __name__ == '__main__':
    app.run(debug=True)
