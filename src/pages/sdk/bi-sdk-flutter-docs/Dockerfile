# --- flutter docs ---

# Note: `dart doc` is broken on 2.10.0, so we're using an older version
FROM cirrusci/flutter:2.8.1 AS flutterdoc

WORKDIR /flutter-doc

COPY prebuild/bi-sdk-flutter .
# flutter 2.8.1 doesn't include `dart doc` yet, so we have to install `dartdoc` and use that
RUN dart pub global activate dartdoc
RUN dartdoc .

# --- nginx ---

FROM nginxinc/nginx-unprivileged:stable

# Copy Flutter SDK docs over
COPY --from=flutterdoc /flutter-doc/doc/api/ /usr/share/nginx/html/sdk/flutter/embedded-sdk/
