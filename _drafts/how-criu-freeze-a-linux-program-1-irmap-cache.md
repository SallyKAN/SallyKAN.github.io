---
title: How CRIU Freeze A linux program (1) -  irmap cache
---

# Set up
FIrst get the source code from [here](https://github.com/checkpoint-restore/criu)
here's a docker-build target in Makefile which builds CRIU in Ubuntu Docker container. Just run make `docker-build` , since we don't want to start a new docker process every single time we play with CRIU,  so add one more line at the end of the Dockerfile which located at `scripts/build` :
`ENTRYPOINT ["tail", "-f", "/dev/null"]`
This would make docker keeps running. 

Then we start the criu container :
`docker run --privileged --cap-add=all -d -t criu-x86_64`

**NOTE**: criu needs the root privilege to run inside the container.
# Dumping
Let's first start from a simple demo from the official website:

```
$ cat > test.sh <<-EOF
#!/bin/sh
while :; do
    sleep 1
    date
done
EOF
$ chmod +x test.sh
$ setsid ./test.sh  < /dev/null &> test.log &
```

By doing 
```
ps -C test.sh
```

You get the pid of the running process
```
criu dump -t $pid -vvv -o dump.log && echo OK
OK
```

we can see that dump images:

![dump](img/criu-dump.png)
