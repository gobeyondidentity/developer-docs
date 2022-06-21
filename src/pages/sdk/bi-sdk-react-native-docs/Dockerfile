# --- react native docs ---
FROM node:14.17.6 AS react-native-doc

WORKDIR /react-native-doc

COPY prebuild/bi-sdk-react-native .
RUN npm install -g typescript typedoc
RUN yarn bootstrap
RUN npx typedoc src/index.tsx

# --- nginx ---

FROM nginxinc/nginx-unprivileged:stable

# Copy React Native SDK docs over
COPY --from=react-native-doc /react-native-doc/docs/ /usr/share/nginx/html/sdk/react-native/embedded-sdk/
