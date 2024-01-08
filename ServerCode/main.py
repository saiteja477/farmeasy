from flask import Flask;
from flask_restful import Api,Resource,reqparse,abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///amazon.db'
db = SQLAlchemy(app)
SQLALCHEMY_TRACK_MODIFICATIONS = False

class VideoModel(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(100),nullable=False)
	title = db.Column(db.String,nullable=False)
	price = db.Column(db.Float,nullable=False)
	image = db.Column(db.String,nullable=False)
	rating = db.Column(db.Integer,nullable=False)

	def __repr__(self):
		return f"Video(username = {username},title = {title},price = {price},image={image},rating={rating})"

class CartProduct(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(100),primary_key=True)
	title = db.Column(db.String,nullable=False)
	price = db.Column(db.Float,nullable=False)
	image = db.Column(db.String,nullable=False)
	rating = db.Column(db.Integer,nullable=False)
	quantity = db.Column(db.Integer,nullable=False)

	def __repr__(self):
		return f"Cart(username = {username},title = {title},price = {price},image={image},rating={rating},quantity={quantity})"			

app.app_context().push()
db.create_all()

cart_put_args = reqparse.RequestParser()
cart_put_args.add_argument("id", type=int, help="ID is Mandatory", required=True)
cart_put_args.add_argument("username", type=str, help="UserName is Mandatory")
cart_put_args.add_argument("title", type=str, help="Title is mandatory", required=True)
cart_put_args.add_argument("price", type=float, help="Price is madatory")
cart_put_args.add_argument("image", type=str, help="Provide Image")
cart_put_args.add_argument("rating", type=int, help="Provide Rating", required=True)
cart_put_args.add_argument("quantity",type=int,help="Provode Quantity")

cart_update_args = reqparse.RequestParser()
cart_update_args.add_argument("id", type=int, help="ID is Mandatory")
cart_update_args.add_argument("username", type=str, help="UserName is Mandatory")
cart_update_args.add_argument("title", type=str, help="Title is mandatory")
cart_update_args.add_argument("price", type=float, help="Price is madatory")
cart_update_args.add_argument("image", type=str, help="Provide Image")
cart_update_args.add_argument("rating", type=int, help="Provide Rating")
cart_update_args.add_argument("quantity",type=int,help="Provode Quantity")


video_put_args = reqparse.RequestParser()
video_put_args.add_argument("id", type=int, help="ID is Mandatory", required=True)
video_put_args.add_argument("username", type=str, help="UserName is Mandatory")
video_put_args.add_argument("title", type=str, help="Title is mandatory", required=True)
video_put_args.add_argument("price", type=float, help="Price is madatory")
video_put_args.add_argument("image", type=str, help="Provide Image")
video_put_args.add_argument("rating", type=int, help="Provide Rating", required=True)
#video_put_args.add_argument("quantity",type=int,help="Provide Quantity",required=True)

video_update_args = reqparse.RequestParser()
video_update_args.add_argument("id", type=int, help=" is Mandatory")
video_update_args.add_argument("username", type=str, help="UserName is Mandatory")
video_update_args.add_argument("title", type=str, help="Title of the product")
video_update_args.add_argument("price", type=float, help="Price of the product")
video_update_args.add_argument("image", type=str, help="Image product")
video_update_args.add_argument("rating", type=int, help="Product Rating")
#video_update_args.add_argument("quantity",type=int,help="Quantity")


resource_fields ={
	'id':fields.Integer,
	'username':fields.String,
	'title':fields.String,
	'price':fields.Integer,
	'image':fields.String,
	'rating':fields.Integer,
}

cart_resource_fields ={
	'id':fields.Integer,
	'username':fields.String,
	'title':fields.String,
	'price':fields.Integer,
	'image':fields.String,
	'rating':fields.Integer,
	'quantity':fields.Integer
}

class Cart(Resource):

	@marshal_with(cart_resource_fields)
	def get(self):
		result = CartProduct.query.all()
		if not result:
			abort(404,message="Could not find video with that id..")
		return result

	@marshal_with(cart_resource_fields)	
	def post(self):
		args = cart_put_args.parse_args()
		#result = VideoModel.query.filter_by(id=video_id).first()
		#if result:
		#	abort(400,message="Video id is already taken...")
		cart = CartProduct(id=args['id'],username = args['username'],title = args['title'],price = args['price'],image=args['image'],rating=args['rating'],quantity=args['quantity'])
		db.session.add(cart)
		db.session.commit()
		return cart, 201


api.add_resource(Cart, "/cart")


class CartDelete(Resource):

	@marshal_with(cart_resource_fields)
	def patch(self,video_id,user_id):
		args = cart_update_args.parse_args()
		result = CartProduct.query.filter((CartProduct.id==video_id)&(CartProduct.username==user_id)).first()

		if args['title']:
			result.title = args['title']
		if  args['price']:
			result.price = args['price']
		if  args['image']:
			result.image = args['image']
		if  args['rating']:
			result.rating = args['rating']
		if args['quantity']:
			result.quantity = args['quantity']

		db.session.add(result)
		db.session.commit()

		return result			

	@marshal_with(cart_resource_fields)	
	def delete(self,video_id,user_id):
		result = CartProduct.query.filter((CartProduct.id==video_id)&(CartProduct.username==user_id)).first()
		print("Username"+CartProduct.id,video_id)
		if not result:
			abort('404',message="Video not present to delete...")
		db.session.delete(result)
		db.session.commit()
		return '',204
	
api.add_resource(CartDelete,"/cart/<int:video_id>/<string:user_id>")	



class Video(Resource):

	@marshal_with(resource_fields)
	def get(self):
		result = VideoModel.query.all()
		if not result:
			abort(404,message="Could not find video with that id..")
		return result

	@marshal_with(resource_fields)	
	def post(self):
		args = video_put_args.parse_args()
		#result = VideoModel.query.filter_by(id=video_id).first()
		#if result:
		#	abort(400,message="Video id is already taken...")
		video = VideoModel(id=args['id'],username = args['username'],title = args['title'],price = args['price'],image=args['image'],rating=args['rating'])
		db.session.add(video)
		db.session.commit()
		return video, 201
	

api.add_resource(Video, "/video")	


class AccessUsingId(Resource):

	@marshal_with(resource_fields)
	def patch(self,video_id):
		args = video_update_args.parse_args()
		result = VideoModel.query.filter_by(id=video_id).first()
		if not result:
			abort(404,message="Video doesn't exist,cannot update..")
		if args['username']:
			result.username = args['username']	
		if args['title']:
			result.title = args['title']
		if  args['price']:
			result.price = args['price']
		if  args['image']:
			result.image = args['image']
		if  args['rating']:
			result.rating = args['rating']

		db.session.add(result)
		db.session.commit()

		return result
		
	@marshal_with(resource_fields)	
	def delete(self,video_id):
		result = VideoModel.query.filter_by(id=video_id).first()
		if not result:
			abort('404',message="Video not present to delete...")
		db.session.delete(result)
		db.session.commit()
		return '',204

api.add_resource(AccessUsingId,"/video/<int:video_id>")


if __name__=="__main__":
	app.run(debug=True)
