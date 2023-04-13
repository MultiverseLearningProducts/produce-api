# Produce API

Just a little Express server we can Dockerize. We won't be dealing with multiple containers in this workshop, so the produce items are stored in a simple SQLite database for now.

To build the image from the `Dockerfile`:

```
docker build --tag produce-api .
```

This tags the image with the `produce-api` tag. The `.` means that the `Dockerfile` can be found in the current working directory, so if you're having issues, make sure you're in the right directory.

To run a container from the image:

```
docker run --detach --publish 3000:3000 produce-api
```

The `--detach` flag means the container will run in the background and won't take over your current terminal window. The `--publish` flag means we're publishing port 3000 from the container and mapping it to port 3000 on the host.

To stop the container, run `docker ps` (`ps` is short for "process") and grab the container ID, then run `docker stop [CONTAINER_ID]`. To remove it, run `docker rm [CONTAINER_ID]`. To do this all in one step, you can run `docker rm -f [CONTAINER_ID]`.

Each container has its own filesystem. To persist data across containers, first create a volume:

```
docker volume create produce-db
```

Docker manages the location of the volume on the host; all you need to know is the name of the volume. However, if you want to inspect it:

```
docker volume inspect produce-db
```

Each time you spin up a new container, you need to make sure to connect it to the volume:

```
docker run --detach --publish 3000:3000 --mount type=volume,src=produce-db,target=/etc/produce produce-api
```

The `--mount` flag tells Docker we're using a volume called `produce-db`, and that it should populate the `/etc/produce` directory in the container with the contents of the volume.
