// Init PORT
process.env.PORT = process.env.PORT || 3000

// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// MongoDB uri
process.env.URLDB = process.env.NODE_ENV == 'development' ? 'mongodb://localhost:27017/motomax' : process.env.MONGODB

// JWT Expiration date
process.env.JWT_EXDATE = 60 * 60 * 24 * 30

// APP secret Key
process.env.APP_SECRET_KEY = process.env.APP_SECRET_KEY || 'app-secret-key'