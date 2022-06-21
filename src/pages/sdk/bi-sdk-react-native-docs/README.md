# Public Developer Documentation

This service holds the `.html.md` files, layout and resource files, and
Dockerfile that build and become Beyond identity's public developer documentation.

## Running Locally

To run locally you should first, at the repo's root, run `eval $(.zeroenv.sh env)`.
Then move into this directory and run `make docker && make run`.
The homepage should then be available at `localhost:4567`.
