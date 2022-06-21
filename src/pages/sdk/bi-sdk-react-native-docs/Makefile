# Default to dev repo.  Can override this via environment variables
# e.g. 'ECR_REPO_NAME=beyondidentity/bi-sdk-react-native-docs make build'.
ECR_REPO_NAME ?= beyondidentity-dev/bi-sdk-react-native-docs
FULL_IMAGE_NAME = $(ECR_REPO_BASE)/$(ECR_REPO_NAME):$(IMAGE_TAG)

define EXAMPLE_USAGE
ECR_REPO_BASE=613861386958.dkr.ecr.us-west-2.amazonaws.com
IMAGE_TAG=12345
make <build / push / run>
endef

export EXAMPLE_USAGE

BI_SDK_REACT_NATIVE_DOCS_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
SDKS_DIR := $(abspath $(BI_SDK_REACT_NATIVE_DOCS_DIR)/../../../clients/external_sdks)

guard-env-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Must set environment variable: $*. Example:\n$${EXAMPLE_USAGE}"; \
		exit 1; \
	fi

# Run eval $(./zeroenv.sh env), before running make build for local devel
build: prepare docker

prepare:
	go run ${SDKS_DIR}/bi-sdk-react-native/ci/generate-packagejsons/main.go <${SDKS_DIR}/bi-sdk-react-native/ci/generate-packagejsons/package.json.sdk.template >${SDKS_DIR}/bi-sdk-react-native/package.json
	go run ${SDKS_DIR}/bi-sdk-react-native/ci/generate-packagejsons/main.go <${SDKS_DIR}/bi-sdk-react-native/ci/generate-packagejsons/package.json.example.template >${SDKS_DIR}/bi-sdk-react-native/example/package.json
	go run ${SDKS_DIR}/bi-sdk-react-native/ci/generate-config/main.go <${SDKS_DIR}/bi-sdk-react-native/ci/generate-config/Config.tsx.template >${SDKS_DIR}/bi-sdk-react-native/example/src/Config.tsx
	rm -rf prebuild/*
	cp -R ${SDKS_DIR}/bi-sdk-react-native prebuild/bi-sdk-react-native

build-no-cache:
	docker build \
		--no-cache \
		--tag $(FULL_IMAGE_NAME) \
		--file Dockerfile .

docker: guard-env-ECR_REPO_BASE guard-env-IMAGE_TAG prepare
	docker build \
		--tag $(FULL_IMAGE_NAME) \
		--file Dockerfile .

push: guard-env-ECR_REPO_BASE guard-env-IMAGE_TAG
	docker push $(FULL_IMAGE_NAME)

run: guard-env-ECR_REPO_BASE guard-env-IMAGE_TAG
	docker run -p 4567:80 $(FULL_IMAGE_NAME)

build-run: build run
