# Voimanosto

This is a fullstack application for tracking powerlifting workouts. It was built as part of the course _Full Stack -websovelluskehitys harjoitustyö_ at the University of Helsinki.

The project was built using the MERN stack. The frontend utilizes the power of React and Typescript combo, while the backend is a Node application using Express and is written in Javascript. The backend API is RESTful.
MongoDB Atlas is used as the database provider and Cloudinary is used for image storage.

The project is deployed to Heroku at [https://voimanosto.herokuapp.com](http://voimanosto.herokuapp.com).

Please note that the Heroku deployment is intended for demonstration purposes only and the database will be cleared periodically. If you intend to use the app regularly, you will need to set up your own instance of the app (consult the user manual for instructions). 

Hour log is [here](https://github.com/yusifsalam/voimanosto/blob/master/docs/hours.md).

User manual is found [here](https://github.com/yusifsalam/voimanosto/blob/master/docs/user_manual.md).

### Features:

- track training volume
- track personal records (PRs)
- track competition progress
- track development over time
- see how you compare to other powerlifters

### Environment variables:

| Name                  |             Purpose             |
| --------------------- | :-----------------------------: |
| MONGODB_URI           | Mongo Atlas development cluster |
| MONGODB_PROD          | Mongo Atlas production cluster  |
| PORT                  |      port for the backend       |
| SECRET                |   secret key for jsonwebtoken   |
| CLOUDINARY_API_KEY    |       cloudinary api key        |
| CLOUDINARY_CLOUD_NAME |      cloudinary cloud name      |
| CLOUDINARY_API_SECRET |    cloudinary api secret key    |
