# mono-pro
## Requirements
- nodejs v12 or later
- docker v20.10.7 or later
- docker-compose v1.29.2 or later


## Installation
1. clone the repository `git clone git@github.com:nwashangai/mono-pro.git`
2. `cd mono-pro`
3. copy the content of `.env.example` into a new `.env` and modify the content to your variables
4. run `docker-compose up --build`
5. to lunch interactive shell terminal for the app you can run `docker run -it app bash` or source the `./commands` file in your default shell terminal like bash or zsh to access it from any directory

<i>Note:</i> This is currently only verified on Linux machine