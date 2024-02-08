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

# Edit package.json to remove scripts/devDependencies
echo $(cat ./dist/package.json | jq 'del(.scripts)') > ./dist/package.json
echo $(cat ./dist/package.json | jq 'del(.devDependencies)') > ./dist/package.json
echo $(cat ./dist/package.json | jq '.+={types:"index.d.ts"}') > ./dist/package.json

cd ./dist

npm publish

cd ..

rm -rf ./dist/
