
from flask import Flask ,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask import render_template,escape,url_for
from sqlalchemy.orm import backref

app=Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:TitoPitbull@localhost/menu'
#                                          usuario:clave@localhost/nombreBaseDeDAtos
#                                          usuario:clave@localhost/nombreBaseDeDAtos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

class recetario(db.Model):  # defino la tabla
    __name__="recetario"
    CodPlato=db.Column(db.String(5), primary_key=True)
    Plato=db.Column(db.String(55))
    Descripcion=db.Column(db.String(200))
    Instrucciones=db.Column(db.String(2000))
    ingredientes=db.relationship("ingredientes",backref="recetario")

    def __init__(self,CodPlato,Plato,Descripcion,Instrucciones):
        self.CodPlato=CodPlato
        self.Plato=Plato
        self.Descripcion=Descripcion
        self.Instrucciones=Instrucciones

class ingredientes(db.Model):
    __name__="ingredientes"
    IdIngredientes=db.Column(db.Integer, primary_key=True)   
    IdPlato=db.Column(db.String(5),db.ForeignKey("recetario.CodPlato"))
    Ingrediente=db.Column(db.String(55))
    Cantidad=db.Column(db.String(50))

    def __init__(self,IdPlato,Ingrediente,Cantidad):
        self.IdPlato=IdPlato
        self.Ingrediente=Ingrediente
        self.Cantidad=Cantidad
        
db.create_all()  # crea las tablas 
class RecetarioSchema(ma.Schema):
    class Meta:
        fields=('CodPlato','Plato','Descripcion','Instrucciones')
 
receta_schema=RecetarioSchema()            # para crear un producto
recetario_schema=RecetarioSchema(many=True)  # multiples registros-Creo las rutas o endpoints

class IngredientesSchema(ma.Schema):
    class Meta:
        fields=('IdIngredientes','IdPlato','Ingrediente','Cantidad')
 
ingrediente_schema=IngredientesSchema()            # para crear un producto
ingredientes_schema=IngredientesSchema(many=True)  # multiples registros-Creo las rutas o endpoints 

@app.route('/recetario',methods=['GET'])
def get_Recetas():
    all_recetas=recetario.query.all()
    result=recetario_schema.dump(all_recetas)
    return jsonify(result)
#ingredientes
@app.route('/ingredientes',methods=['GET'])
def get_ingredientes():
    all_ingredientes=ingredientes.query.all()
    result=ingredientes_schema.dump(all_ingredientes)
    return jsonify(result)

 # producto en singular, cuando la consulta es por ID
@app.route('/receta/<CodPlato>', methods=['GET'])
def get_receta(CodPlato):
    receta=recetario.query.get(CodPlato)
    return receta_schema.jsonify(receta)
#ingredientes
@app.route('/ingrediente/<IdIngredientes>', methods=['GET'])
def get_ingrediente(IdIngredientes):
    ingrediente=ingredientes.query.get(IdIngredientes)
    return ingrediente_schema.jsonify(ingrediente)

@app.route('/recetario', methods=['POST']) # crea ruta o endpoint
def create_receta():
    print(request.json)  # request.json contiene el json que envio el cliente
    CodPlato=request.json['CodPlato']
    Plato=request.json['Plato']
    Descripcion=request.json['Descripcion']
    Instrucciones=request.json['Instrucciones']
    new_receta=recetario(CodPlato,Plato,Descripcion,Instrucciones)
    db.session.add(new_receta)
    db.session.commit()
    return receta_schema.jsonify(new_receta)

#ingrediente
@app.route('/ingredientes', methods=['POST']) # crea ruta o endpoint
def create_ingrediente():
    print(request.json)  # request.json contiene el json que envio el cliente
    IdPlato=request.json['IdPlato']
    Ingrediente=request.json['Ingrediente']
    Cantidad=request.json['Cantidad']
    new_ingrediente=ingredientes(IdPlato,Ingrediente,Cantidad)
    db.session.add(new_ingrediente)
    db.session.commit()
    return ingrediente_schema.jsonify(new_ingrediente)

# producto en singular, cuando la consulta es por ID
@app.route('/receta/<CodPlato>' ,methods=['PUT'])
def update_receta(CodPlato):
    receta=recetario.query.get(CodPlato)#<---ID ESTABA COMO STRING ENTRE COMILLAS
    CodPlato=request.json['CodPlato']
    Plato=request.json['Plato']
    Descripcion=request.json['Descripcion']
    Instrucciones=request.json['Instrucciones']
    receta.CodPlato=CodPlato
    receta.Plato=Plato
    receta.Descripcion=Descripcion
    receta.Instrucciones=Instrucciones
    db.session.commit()#<---FALTABAN LOS PARENTESIS EN EL COMIT
    print(receta)
    return receta_schema.jsonify(receta)
#ingredientes
# producto en singular, cuando la consulta es por ID
@app.route('/ingrediente/<IdIngredientes>' ,methods=['PUT'])
def update_ingrediente(IdIngredientes):
    ingrediente=ingredientes.query.get(IdIngredientes)#<---ID ESTABA COMO STRING ENTRE COMILLAS
    IdPlato=request.json['IdPlato']
    Ingrediente=request.json['Ingrediente']
    Cantidad=request.json['Cantidad']
    ingrediente.IdPlato=IdPlato
    ingrediente.Ingrediente=Ingrediente
    ingrediente.Cantidad=Cantidad
    db.session.commit()#<---FALTABAN LOS PARENTESIS EN EL COMIT
    return ingrediente_schema.jsonify(ingrediente)

# producto en singular, cuando la consulta es por ID
@app.route('/receta/<CodPlato>',methods=['DELETE'])
def delete_receta(CodPlato):
    receta=recetario.query.get(CodPlato)
    db.session.delete(receta)
    db.session.commit()
    return receta_schema.jsonify(receta)
#ingrediente
@app.route('/ingrediente/<IdIngredientes>',methods=['DELETE'])
def delete_ingrediente(IdIngredientes):
    ingrediente=ingredientes.query.get(IdIngredientes)
    db.session.delete(ingrediente)
    db.session.commit()
    return ingrediente_schema.jsonify(ingrediente)
 
# programa principal
if __name__=='__main__':  
    app.run(debug=True, port=5000)  
    
