Practis App [practice + redis]
A codethrough with webdevsimpified

How it works
Make an httpie request and recieve data from a server. Subsequent requests return data from redis, reducing server weight and improving user experience.

How the data is stored:
Data persists on cache for half an hour before expiring.

How the data is accessed:
API endpoints /photos?albumId and photos/:id

Performance Benchmarks
Initial calls to the /photos endpoint can be slow and require 200-300ms for a response. Implementing redis caching reduced subsequent calls to sub 90ms.   

How to run it locally?
1. npm i
2. npm start to start express server
3. httpie requests to the api
  - http :8080/photos
  - http :8080/photos albumId==(1-100)
  - http :8080/photos/(1-5000)

Prerequisites
node, httpie or postman

Local installation
npm i


Ty for the experience. Redis looks to be super powerful and I cant wait to check out more of the stack. 

Deployment
To make deploys work, you need to create free account on Redis Cloud

Google Cloud Run
Insert Run on Google button

Heroku
Insert Deploy on Heroku button

Netlify
Insert Deploy on Netlify button

Vercel
Insert Deploy on Vercel button

More Information about Redis Stack
Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the Redis Discord or on Twitter.

Getting Started
Sign up for a free Redis Cloud account using this link and use the Redis Stack database in the cloud.
Based on the language/framework you want to use, you will find the following client libraries:
Redis OM .NET (C#)
Watch this getting started video
Follow this getting started guide
Redis OM Node (JS)
Watch this getting started video
Follow this getting started guide
Redis OM Python
Watch this getting started video
Follow this getting started guide
Redis OM Spring (Java)
Watch this getting started video
Follow this getting started guide
The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

Developer Hub - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
Redis Stack getting started page - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
Redis Rediscover - Provides use-cases for Redis as well as real-world examples and educational material
RedisInsight - Desktop GUI tool - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
Youtube Videos
Official Redis Youtube channel
Redis Stack videos - Help you get started modeling data, using Redis OM, and exploring Redis Stack
Redis Stack Real-Time Stock App from Ahmad Bazzi
Build a Fullstack Next.js app with Fireship.io
Microservices with Redis Course by Scalable Scripts on freeCodeCamp