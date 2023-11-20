# What this app does
- This app restricts the usage of the API to prevent users from abusing the system based on user token and usee IP with help of redis.
- Rate limit is configurable from the environment (token limit and ip limit).
- Very basic auth is applied to focus more on functionality of the app.


# How to run the APP
- If Docker is already installed, you can start both Redis and the API service simultaneously by running the following command:
```
docker-compose -f docker-compose.yml up -d
```

- You can find a postman collection at src/docs. Once you import the collection to the postman app. You can use 
 the app right away.
