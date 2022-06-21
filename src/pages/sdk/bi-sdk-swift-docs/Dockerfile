# --- swift docs ---

FROM swiftdoc/swift-doc:latest AS swiftdoc

WORKDIR /swift-doc

# Build Swift Embedded SDK Docs
COPY prebuild/bi-sdk-swift/Sources/Embedded .
RUN mkdir /embedded-sdk-out && swift-doc generate . --module-name Embedded --output /embedded-sdk-out/ --format html --base-url /sdk/swift/embedded-sdk/

# --- nginx ---

FROM nginx:stable

# Copy Swift Embedded SDK docs over
COPY --from=swiftdoc /embedded-sdk-out/ /usr/share/nginx/html/sdk/swift/embedded-sdk/
RUN find /usr/share/nginx/html/sdk/swift/embedded-sdk -type d -exec chmod 755 {} +
RUN find /usr/share/nginx/html/sdk/swift/embedded-sdk -type f -exec chmod 644 {} +
