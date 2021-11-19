## My considerations

Hey guys! 🤓
Here are just some comments regarding my implementation.

### An important issue

I realized that there is no specification about the ```*Grand Prize```. So, initially, I assumed using the multiplier in the maximun prize ($1,000,000). I hope i'm right.

### Technical comments

. I decided to use Redis to cache the external results from the public URL, to avoid uneeded request. I'm using Docker Compose to create the Redis container for the tests. After installing Docker and Docker Compose, You can run:

  ```docker-compose -f docker-compose.yaml up```

. I'm using environment variables in the .env file.
. I decided to put all the rules in a JSON file in the ```config``` folder.
. I used a little bit Joi schema validations on the request payload (I can put more of course).

I think I'm done for now. I hope you like it.

Fabio Leite