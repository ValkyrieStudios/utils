rm -rf ./dist
mkdir ./dist

# Main build
npx tsc -p ./tsconfig.build.json

# Main - Declaration file
npx tsc -p ./tsconfig.types.json

# Single Declaration file
npx tsc -p ./tsconfig.types_all.json

# Copy files over
cp package.json README.md LICENSE.md .npmignore ./dist

cd ./dist

npm publish

cd ..

rm -rf ./dist/
