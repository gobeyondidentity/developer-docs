# --- android docs ---

# Note: This is not the same as the image we use for our Android builds.
FROM alvrme/alpine-android:android-31-jdk11 AS androiddoc

WORKDIR /android-doc

COPY prebuild/bi-sdk-android .

RUN ./gradlew :embedded:dokkaHtml

# --- nginx ---

FROM nginxinc/nginx-unprivileged:stable

COPY default.conf /etc/nginx/conf.d/default.conf

# Copy Android Embedded SDK docs over
COPY --from=androiddoc /android-doc/embedded/build/dokka/html/ /usr/share/nginx/html/sdk/android/embedded-sdk/
